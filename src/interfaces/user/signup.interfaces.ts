export interface ISignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface ISignupResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
