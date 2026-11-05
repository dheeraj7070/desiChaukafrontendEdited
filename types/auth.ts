export interface LoginWithOtp {
  email: string;
}

export interface LoginWithPassword {
  email: string;
  password: string;
}

export type LoginWithOtpApiResponse = {
  success: boolean;
  message: string;
  data: string;
  status: number;
};

export interface User {
  id: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin' | string; // Narrow or expand based on your available roles
}

export interface AuthData {
  user: User;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: AuthData;
  status: number;
}
