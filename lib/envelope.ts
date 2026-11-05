import "server-only";
import { fetchApi } from "@/lib/fetchApi";
import { Unauthorized } from "@/types/Api";
import { publicApi2 } from "./publicApi";

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
  status?: number;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: string; message: string };

export async function requestEnvelope<T>(
  path: string,
  init?: Parameters<typeof fetchApi>[1],
): Promise<ApiResult<T>> {
  try {
    const res = await fetchApi(path, init);
    // console.log(res);s
    const body = (await res.json().catch((e) => null)) as ApiEnvelope<T> | null;
    // console.log(body);
    // res.ok mein 201 bhi aata hai (variant create ka HTTP status 201 hai)
    if (!res.ok || !body?.success) {
      console.log(JSON.stringify(body));
      return {
        ok: false,
        code: body?.error?.code ?? "UNKNOWN",
        message: body?.error?.message ?? "Request failed.",
      };
    }

    return { ok: true, data: body.data as T };
  } catch (error) {
    if (error instanceof Unauthorized) {
      return {
        ok: false,
        code: "UNAUTHORIZED",
        message: "Session expired. Sign in again.",
      };
    }
    console.error(error);
    return {
      ok: false,
      code: "NETWORK",
      message: "Could not reach the server.",
    };
  }
}

export async function publicRequestEnvelope<T>(
  path: string,
  init?: Parameters<typeof publicApi2>[1],
): Promise<ApiResult<T>> {
  try {
    const res = await publicApi2(path, init);
    const body = (await res.json().catch((e) => null)) as ApiEnvelope<T> | null;
    // console.log(body);
    // res.ok mein 201 bhi aata hai (variant create ka HTTP status 201 hai)
    if (!res.ok || !body?.success) {
      console.log(JSON.stringify(body));
      return {
        ok: false,
        code: body?.error?.code ?? "UNKNOWN",
        message: body?.error?.message ?? "Request failed.",
      };
    }

    return { ok: true, data: body.data as T };
  } catch (error) {
    if (error instanceof Unauthorized) {
      return {
        ok: false,
        code: "UNAUTHORIZED",
        message: "Session expired. Sign in again.",
      };
    }
    console.error(error);
    return {
      ok: false,
      code: "Something went wrong",
      message: "Could not reach the server.",
    };
  }
}
