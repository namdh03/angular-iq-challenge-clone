import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

import config from '~core/config';
import { LoaderProgressComponent } from '~shared/components/loader-progress/loader-progress.component';
import { LoaderSpinnerComponent } from '~shared/components/loader-spinner/loader-spinner.component';
import { LoaderWobblingComponent } from '~shared/components/loader-wobbling/loader-wobbling.component';
import { LogoComponent } from '~shared/components/logo/logo.component';

import { ChallengeService } from './challenge.service';
import { QuestionComponent } from './components/question/question.component';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    LogoComponent,
    LoaderProgressComponent,
    QuestionComponent,
    LoaderWobblingComponent,
    LoaderSpinnerComponent,
  ],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.css',
})
export class ChallengeComponent {
  readonly config = config;
  private readonly challengeService = inject(ChallengeService);
  timer$ = this.challengeService.timer$;

  challenges = injectQuery(() => ({
    queryKey: ['challenge-questions'],
    queryFn: () => this.challengeService.getChallenges(),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  }));

  mutation = injectMutation(() => ({
    mutationFn: () => this.challengeService.submitChallenge(),
  }));

  onGetAnswerByQID(id: number) {
    return this.challengeService.getAnswerByQuestionId(id);
  }

  onSubmitChallenge() {
    const numOfQuestionNotAnswers =
      (this.challenges.data()?.questions.length || 0) - this.challengeService.answers().length;

    if (numOfQuestionNotAnswers) {
      alert(`Bạn còn ${numOfQuestionNotAnswers} câu hỏi chưa được trả lời`);
    } else {
      const isConfirmSubmit = confirm('Bạn chắc chắn muốn nộp bài chứ?');

      if (isConfirmSubmit) {
        this.mutation.mutate();
      }
    }
  }
}
