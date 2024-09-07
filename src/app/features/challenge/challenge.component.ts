import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';

import config from '~core/config';
import { LoaderProgressComponent } from '~shared/components/loader-progress/loader-progress.component';
import { LoaderWobblingComponent } from '~shared/components/loader-wobbling/loader-wobbling.component';
import { LogoComponent } from '~shared/components/logo/logo.component';

import { ChallengeService } from './challenge.service';
import { QuestionComponent } from './components/question/question.component';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [AsyncPipe, RouterLink, LogoComponent, LoaderProgressComponent, QuestionComponent, LoaderWobblingComponent],
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

  onGetAnswerByQID(id: number) {
    return this.challengeService.getAnswerByQuestionId(id);
  }
}
