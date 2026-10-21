import { CONTACT_FORM } from "@/shared/config";

import { MAIL_SUBJECT } from "../config";
import type { IContactValues } from "../config";

// True when Web3Forms accepted the message; a network error or a refusal lands in the error state.
export const sendMessage = async (values: IContactValues): Promise<boolean> => {
  try {
    const response = await fetch(CONTACT_FORM.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: CONTACT_FORM.accessKey,
        subject: MAIL_SUBJECT,
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        botcheck: ""
      })
    });
    const result: { success?: boolean } = await response.json();
    return response.ok && result.success === true;
  } catch {
    return false;
  }
};
