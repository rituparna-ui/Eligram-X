export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  status: number;
  token: string;
  tfa?: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}
