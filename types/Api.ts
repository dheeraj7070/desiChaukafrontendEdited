export class Unauthorized extends Error {}
export interface Token {
  accessToken?: string;
  refreshToken?: string;
}

export interface ApiError {
  success: boolean;
  error: {
    code: string;
    message: string;
  };
}

export type RefreshData = { accessToken?: string; refreshToken?: string };

export type ApiInit = RequestInit & {
  params?: Record<string, string>;
};
