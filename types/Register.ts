// API response `data` for POST /email-registration
export type RegisteredUser = {
  id: string;
  email: string;
  passwordHash: string | null;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: string;
  status: string;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RegisterField = "email" | "firstName" | "lastName";

export type RegisterValues = Record<RegisterField, string>;

export type RegisterFieldErrors = Partial<Record<RegisterField, string[]>>;

// Return type of the register server action (undefined = nothing submitted yet)
export type RegisterState =
  | {
      error?: string;
      fieldErrors?: RegisterFieldErrors;
      // sent back so the form can refill inputs (React 19 resets the form after an action)
      values?: RegisterValues;
    }
  | undefined;
