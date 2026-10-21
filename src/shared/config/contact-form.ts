const KEY_PLACEHOLDER = "WEB3FORMS_ACCESS_KEY";

// Web3Forms (D21): the form posts straight from the browser. The access key is public by the
// service's design (it only routes mail to the owner's inbox), so it is a constant here.
export const CONTACT_FORM: { endpoint: string; accessKey: string } = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: KEY_PLACEHOLDER
};

// While the key is the placeholder nothing is sent; the form shows its error state instead.
export const CONTACT_FORM_READY = CONTACT_FORM.accessKey !== KEY_PLACEHOLDER;
