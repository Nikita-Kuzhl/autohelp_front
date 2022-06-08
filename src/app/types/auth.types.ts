export interface IReg {
  telephone: string;
  name: string;
  email: string;
  password: string;
}
export interface IAuth {
  telephone: string;
  password: string;
}
export interface IError {
  error: {
    status: number;
    response: {
      data: IMessage | IValidator[];
    };
  };
}
export interface IMessage {
  message: string;
}
export interface IValidator {
  property: string;
  value: string;
}
