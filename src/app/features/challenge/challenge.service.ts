import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, timer } from 'rxjs';

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
  private readonly localStorageService = inject(LocalStorageService);

  readonly answers = signal<{ id: number; answer: number }[]>([]);

  private readonly hostUrl = 'https://api-gateway-iq.hdang09.tech';

  private readonly name = this.localStorageService.getItem('name');
  private readonly studentID = this.localStorageService.getItem('studentID');

  private readonly startTimer$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.answers.set((this.localStorageService.getItem('answers') as { id: number; answer: number }[]) || []);

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

  // getChallenges(): Promise<ChallengeResponse> {
  //   return lastValueFrom(
  //     this.httpClient.get<ChallengeResponse>(`${this.hostUrl}/user/start/${this.name}/${this.studentID}`).pipe(
  //       tap(() => {
  //         this.startTimer$.next(true);
  //       }),
  //     ),
  //   );
  // }

  getChallenges(): Promise<ChallengeResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse: ChallengeResponse = {
          success: true,
          message: 'Lấy dữ liệu thành công!',
          data: {
            questions: [
              {
                id: 43,
                question: [
                  '15 lập trình viên làm việc với tốc độ như nhau hoàn thành 1 trang web trong 3 ngày. Nếu sau 1 ngày đầu có 9 người nghỉ thì mất thêm bao nhiêu ngày để hoàn thành phần công việc còn lại?',
                ],
                multipleChoice: ['2', '4', '5', '6', '8'],
                answer: 3,
                isLong: true,
              },
              {
                id: 17,
                question: ['Khối 3D được ghép từ hình nào sau đây?', '/images/08b51da930814c110361e7d2fecdb252.png'],
                multipleChoice: ['Hình A', 'Hình B', 'Hình C', 'Hình D'],
                answer: 3,
                isLong: false,
              },
              {
                id: 67,
                question: [
                  'Ba số nguyên dương liên tiếp được nâng lên lũy thừa thứ nhất, thứ hai và thứ ba rồi cộng. Tổng thu được là một bình phương hoàn hảo có căn bậc hai bằng tổng của ba số nguyên ban đầu. Giá trị của số nhỏ nhất trong ba số nguyên là bao nhiêu?',
                ],
                multipleChoice: ['1', '2', '3', '4', '5'],
                answer: 3,
                isLong: true,
              },
              {
                id: 45,
                question: ['Đâu là hình tiếp theo?', '/images/5ee37169c3c4de45c26d92e1b1d4a3ac.png'],
                multipleChoice: ['Hình A', 'Hình B', 'Hình C', 'Hình D', 'Hình E'],
                answer: 3,
                isLong: false,
              },
              {
                id: 58,
                question: [
                  'Trong một hội nghị có 100 đại biểu tham dự. Mỗi đại biểu nói được một hoặc hai hoặc ba thứ tiếng: Nga, Anh hoặc Pháp. Biết rằng có 39 đại biểu chỉ nói được tiếng Anh, 35 đại biểu nói được tiếng Pháp, 8 đại biểu nói được cả tiếng Anh và tiếng Nga. Hỏi có bao nhiêu đại biểu chỉ nói được tiếng Nga?',
                ],
                multipleChoice: ['16', '17', '18', '19'],
                answer: 3,
                isLong: true,
              },
              {
                id: 14,
                question: [
                  'Một bài kiểm tra Toán bao gồm 20 câu hỏi trắc nghiệm. Một câu trả lời đúng được 3 điểm và bị trừ 1 điểm cho mỗi câu trả lời sai. Câu hỏi để trống thì không được tăng hay bị trừ điểm. Một bạn đã thử tổng cộng 19 câu hỏi và tổng điểm cho bài kiểm tra là trên 32. Tìm số câu trả lời đúng tối thiểu bạn ấy thu được?',
                ],
                multipleChoice: ['16', '14', '20', '17', '13'],
                answer: 5,
                isLong: true,
              },
              {
                id: 41,
                question: [
                  'Có 21 chai nước ép hoa quả cần được chia đều cho ba người bạn, trong đó có 7 chai đầy, 7 chai chứa một nửa và 7 chai rỗng. Không có bất kỳ dụng cụ đo lường nào, bạn sẽ phải chia cả số chai và số nước ép như thế nào cho đều?',
                ],
                multipleChoice: [
                  'Mỗi người sẽ có 4 chai đầy, 2 chai rỗng và 1 chai chứa một nửa',
                  'Mỗi người sẽ có 2 chai đầy, 4 chai rỗng và 1 chai chứa một nửa',
                  'Mỗi người sẽ có 3 chai đầy, 3 chai rỗng và 1 chai chứa một nửa',
                  'Mỗi người sẽ có 2 chai đầy, 4 chai rỗng và 1 chai chứa một nửa',
                ],
                answer: 3,
                isLong: true,
              },
              {
                id: 80,
                question: [
                  'Ông chủ cửa hàng đá quý bán cho khách một sợi dây chuyền bằng ngọc trai với giá 300 nghìn đồng và nhận từ khách một tờ 500 nghìn. Vì không có tiền lẻ nên ông sang tiệm kế bên đổi và dùng tiền đó để thối lại 200 nghìn cho khách. Hôm sau chủ quán bên phát hiện ra tiền đó là giả và đòi ông đổi lại tiền. Hỏi ông chủ tiệm đá quý đã bị mất bao nhiêu tiền?',
                ],
                multipleChoice: ['500 nghìn', '700 nghìn', '800 nghìn', '1 triệu'],
                answer: 1,
                isLong: true,
              },
              {
                id: 101,
                question: [
                  'Một sợi dây đồng được uốn thành hình vuông có diện tích 81 cm². Nếu cùng một sợi dây được uốn theo hình bán nguyệt bán kính (tính bằng cm) của hình bán nguyệt là (lấy π = 22/7)',
                ],
                multipleChoice: ['126', '14', '10', '7'],
                answer: 4,
                isLong: true,
              },
              {
                id: 99,
                question: [
                  'Giả dụ A chỉ nói dối vào Thứ hai, thứ ba và thứ tư nhưng nói sự thật vào tất cả những ngày còn lại. B nói dối vào thứ năm, thứ sáu và thứ bảy nhưng nói thật vào những ngày còn lại. Một ngày A tuyên bố: "Hôm qua tôi đã nói dối" sau đó B nói với A: "Tôi cũng vậy". Vậy ngày nào trong tuần, A và B đã có cuộc nói chuyện này',
                ],
                multipleChoice: ['Chủ nhật', 'Thứ 2', 'Thứ 4', 'Thứ 5'],
                answer: 4,
                isLong: true,
              },
              {
                id: 33,
                question: ['Hãy tính tổng dãy số sau 1 + 2 + 3 + ... + 99 = ?'],
                multipleChoice: ['5490', '4590', '4950', '5940'],
                answer: 3,
                isLong: false,
              },
              {
                id: 38,
                question: ['Chữ cái nào trong dãy ký tự dưới không cùng loại? J, S, D, I'],
                multipleChoice: ['J', 'S', 'D', 'I'],
                answer: 1,
                isLong: true,
              },
              {
                id: 57,
                question: ['Hình nào là chuyển động của vật?', '/images/0961c9e9c7f7da813446441f6b9c8f6f.png'],
                multipleChoice: ['Hình A', 'Hình B', 'Hình C', 'Hình D'],
                answer: 3,
                isLong: false,
              },
              {
                id: 44,
                question: ['Đâu là hình tiếp theo?', '/images/21161abd2d41ef1b639283ad4d8e68af.png'],
                multipleChoice: ['Hình A', 'Hình B', 'Hình C', 'Hình D', 'Hình E'],
                answer: 2,
                isLong: false,
              },
              {
                id: 56,
                question: ['Hình nào là chuyển động của vật?', '/images/ee78f05ec489c645952ea83f9c6c9daa.png'],
                multipleChoice: ['Hình A', 'Hình B', 'Hình C', 'Hình D'],
                answer: 4,
                isLong: false,
              },
            ],
            timeStart: 1725642877645,
          },
        };

        // Bắt đầu timer
        this.startTimer$.next(true);

        // Trả về dữ liệu mock
        resolve(mockResponse);
      }, 1000);
    });
  }

  choiceAnswer(id: number, answer: number) {
    this.answers.update((currentAnswers) => {
      let updated = false;

      const updatedAnswers = currentAnswers.map((item) => {
        if (item.id === id) {
          updated = true;
          return { ...item, answer };
        }
        return item;
      });

      return updated ? updatedAnswers : [...updatedAnswers, { id, answer }];
    });
  }

  getAnswerByQuestionId(id: number) {
    return this.answers().find((item) => item.id === id);
  }
}
