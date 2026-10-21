import type { FormStatus } from "@/pages/contact/config";

export interface ISubmitRowProps {
  status: FormStatus;
  /** Counts finished sends, so an identical failure is announced again. */
  attempt: number;
}
