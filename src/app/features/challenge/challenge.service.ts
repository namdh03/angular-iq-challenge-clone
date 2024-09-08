import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, lastValueFrom, map, of, switchMap, tap, throwError, timer } from 'rxjs';

import config from '~core/config';
import { LocalStorageService } from '~core/services/local-storage.service';

interface Question {
  id: number;
  question: string[];
  multipleChoice: string[];
  answer: number;
  isLong: boolean;
}

interface ChallengeResponse {
  success: boolean;
  message: string;
  data: {
    questions: Question[];
    timeStart: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  readonly answers = signal<{ id: number; answer: number; index: number }[]>([]);

  private readonly hostUrl = 'https://api-gateway-iq.hdang09.tech';

  private readonly name = this.localStorageService.getItem('name');
  private readonly studentID = this.localStorageService.getItem('studentID');

  private readonly startTimer$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.answers.set(
      (this.localStorageService.getItem('answers') as { id: number; answer: number; index: number }[]) || [],
    );

    effect(() => {
      this.localStorageService.setItem('answers', this.answers());
    });
  }

  timer$ = this.startTimer$.pipe(
    switchMap((start) => {
      if (!start) {
        return of('00:00');
      }

      const storedSeconds = Number(this.localStorageService.getItem('second')) || 0;

      return timer(0, 1000).pipe(
        map((seconds) => {
          const totalSeconds = storedSeconds + seconds;
          this.localStorageService.setItem('second', totalSeconds);

          const minutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, '0');
          const remainingSeconds = (totalSeconds % 60).toString().padStart(2, '0');

          return `${minutes}:${remainingSeconds}`;
        }),
      );
    }),
  );

  getChallenges(): Promise<ChallengeResponse> {
    return lastValueFrom(
      this.httpClient.get<ChallengeResponse>(`${this.hostUrl}/user/start/${this.name}/${this.studentID}`).pipe(
        tap(() => {
          this.startTimer$.next(true);
        }),
        catchError((error) => {
          this.startTimer$.next(false);
          return throwError(() => error);
        }),
      ),
    );
  }

  choiceAnswer(id: number, answer: number, index: number) {
    this.answers.update((currentAnswers) => {
      let updated = false;

      const updatedAnswers = currentAnswers.map((item) => {
        if (item.id === id) {
          updated = true;
          return { ...item, answer };
        }
        return item;
      });

      return updated ? updatedAnswers : [...updatedAnswers, { id, answer, index }];
    });
  }

  getAnswerByQuestionId(id: number) {
    return this.answers().find((item) => item.id === id);
  }

  submitChallenge() {
    return lastValueFrom(
      this.httpClient
        .put(`${this.hostUrl}/user/end`, {
          name: this.localStorageService.getItem('name'),
          studentID: this.localStorageService.getItem('studentID'),
          answer: this.answers()
            .sort((a, b) => a.index - b.index)
            .map((item) => item.answer),
        })
        .pipe(
          tap(() => {
            this.localStorageService.removeItem('answers');
            this.localStorageService.removeItem('second');
            this.router.navigate([config.routes.result]);
          }),
        ),
    );
  }
}
