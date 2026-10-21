import { BASE_PATH } from "@/shared/config";
import { DEFAULT_LOCALE, isLocale } from "@/shared/i18n";
import type { Locale } from "@/shared/i18n";

/** Longest path echoed into the terminal; a longer one is cut. */
const MAX_PATH_LENGTH = 80;

/** Percent-escapes back to text (Cyrillic reads as such); a malformed escape stays as typed. */
const readable = (path: string): string => {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
};

/** The path as typed, without the deploy base path. */
export const requestedPath = (pathname: string): string => {
  const inBase =
    BASE_PATH !== "" &&
    (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`));
  const path = inBase ? pathname.slice(BASE_PATH.length) : pathname;
  const shown = readable(path || "/");
  return shown.length > MAX_PATH_LENGTH
    ? `${shown.slice(0, MAX_PATH_LENGTH)}…`
    : shown;
};

/** The locale in the first segment of the path, else the default one. */
export const localeOfPath = (pathname: string): Locale => {
  const [segment = ""] = requestedPath(pathname).split("/").filter(Boolean);
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
};
