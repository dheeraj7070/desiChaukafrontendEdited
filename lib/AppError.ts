import { ApiError } from "@/types/Api";

export class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}
