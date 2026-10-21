import { CONTACT_FORM, CONTACT_FORM_READY } from "@/shared/config";

import { MAIL_SUBJECT } from "../config";
import type { IContactValues } from "../config";

// True when Web3Forms accepted the message. While the access key is the placeholder (the owner
// has not set it yet) nothing leaves the browser and the form lands in its error state.
export const sendMessage = async (values: IContactValues): Promise<boolean> => {
  if (!CONTACT_FORM_READY) return false;
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
