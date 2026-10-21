// Public by design (D21), so gitleaks is told to skip this one line.
const WEB3FORMS_ACCESS_KEY = "4bde10a0-9bc6-43fb-8bdc-7309d9f185d5"; // gitleaks:allow

// Web3Forms (D21): the form posts straight from the browser. The access key is public by the
// service's design (it only routes mail to the owner's inbox), so it is a constant here.
export const CONTACT_FORM: { endpoint: string; accessKey: string } = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: WEB3FORMS_ACCESS_KEY
};
