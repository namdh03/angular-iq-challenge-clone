import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';

import config from '~core/config';
import { LoaderWobblingComponent } from '~shared/components/loader-wobbling/loader-wobbling.component';
import { LogoComponent } from '~shared/components/logo/logo.component';
import { convertMillisecondsToRelativeTime } from '~shared/utils/convertMillisecondsToRelativeTime';

import { ResultService } from './result.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [LogoComponent, LoaderWobblingComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  private router = inject(Router);
  private readonly resultService = inject(ResultService);

  constructor() {
    effect(() => {
      if (this.result.isError()) {
        this.router.navigate([config.routes.challenge]);
      }
    });
  }

  result = injectQuery(() => ({
    queryKey: ['challenge-questions'],
    queryFn: () => this.resultService.getStudentResult(),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    retry: false,
  }));

  covertFormatTime() {
    return convertMillisecondsToRelativeTime(this.result.data()?.time || 0);
  }
}
