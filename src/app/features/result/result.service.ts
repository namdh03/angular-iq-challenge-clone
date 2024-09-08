import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { LocalStorageService } from '~core/services/local-storage.service';

interface Result {
  success: boolean;
  message: string;
  data: {
    name: string;
    studentID: string;
    score: number;
    time: number;
    rank: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private readonly httpClient = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly hostUrl = 'https://api-gateway-iq.hdang09.tech';

  getStudentResult() {
    const studentID = this.localStorageService.getItem('studentID');
    return lastValueFrom(this.httpClient.get<Result>(`${this.hostUrl}/user/${studentID}`));
  }
}
