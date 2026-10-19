export const IS_DEV =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_IS_PRODUCTION !== "true";

// GitHub Pages serves the site under /<repo>; the deploy workflow sets it, empty locally.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  PHONE: /^\+?[0-9]{10,14}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  URL: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  HEX_COLOR: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
  IPV4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  CREDIT_CARD:
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|7[0-9]{15})$/
};

export const MODAL_ANIMATION = {
  DEFAULT_DELAY: 300,
  OPEN_DELAY: 300,
  CLOSE_DELAY: 250
};

export const APP_CONFIG = {
  MAX_FILE_UPLOAD_SIZE: 4 * 1024 * 1024, // 4 MB
  SUCCESS_NOTIFICATION_DURATION: 3000, // 3 seconds
  ERROR_NOTIFICATION_DURATION: 5000, // 5 seconds
  DEBOUNCE_DELAY: 300, // 300 milliseconds
  BASE_URL: IS_DEV
    ? `https://web-staging.${process.env.NEXT_PUBLIC_DOMAIN}`
    : `https://${process.env.NEXT_PUBLIC_DOMAIN}`
};
