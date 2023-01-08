export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  message: string;
  status: number;
  token: string;
}
