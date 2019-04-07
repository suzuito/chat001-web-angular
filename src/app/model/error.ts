import { HttpErrorResponse } from '@angular/common/http';

export interface HTTPError {
  readonly code: number;
}

export function errCodeToMsg(code: number): string {
  switch (code) {
    case 400003:
      return 'パスワードが違います';
    case 404001:
      return '存在しない、または、すでに削除されているようです';
    case 400006:
      return '不正なパスワード文字列を設定しようとしています';
  }
  return 'Unknown http error';
}

export function errByHttpError(err: HttpErrorResponse): Error {
  if ('code' in err.error) {
    return new Error(errCodeToMsg(err.error.code));
  }
  return new Error('Unknown error');
}
