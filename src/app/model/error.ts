import { HttpErrorResponse } from '@angular/common/http';

export interface HTTPError {
  readonly code: number;
}

export function errCodeToMsg(code: number): string {
  switch (code) {
    case 400003:
      return 'パスワードが違います';
    case 400006:
      return '不正なパスワード文字列を設定しようとしています';
    case 400009:
      return 'あなたがOwnerである部屋が多すぎです。新しい部屋のOwnerになりたければ、いずれかの部屋のOwner権限を捨ててください。';
    case 400010:
      return '空白は入力できません';
    case 400014:
      return '最大入室人数がオーバーしているため入室できません';
    case 400015:
      return '部屋に入りすぎです。新しい部屋に入室したければ、いずれかの部屋を退室してください。';
    case 403001:
      return 'この操作を行う権限はありません';
    case 404001:
      return '存在しない、または、すでに削除されているようです';
  }
  return 'Unknown http error';
}

export function errByHttpError(err: HttpErrorResponse): Error {
  if ('code' in err.error) {
    return new Error(errCodeToMsg(err.error.code));
  }
  return new Error('Unknown error');
}
