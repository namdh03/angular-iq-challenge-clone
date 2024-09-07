import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { ChallengeService } from '~features/challenge/challenge.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  private readonly challengeService = inject(ChallengeService);

  answers = this.challengeService.answers;

  id = input.required<number>();
  choices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  questionNumber = input.required<number>();
  question = input.required<string[]>();
  multipleChoice = input.required<string[]>();
  isLong = input.required<boolean>();

  onChoiceAnswer(id: number, answer: number) {
    this.challengeService.choiceAnswer(id, answer);
  }

  onGetAnswerByQID() {
    return this.challengeService.getAnswerByQuestionId(this.id());
  }
}
