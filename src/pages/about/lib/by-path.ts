import {
  ABOUT_TYPE_ROUTES,
  DEFAULT_ABOUT_TYPE,
  type AboutType
} from "../config";

import { byType } from "./by-type";

const TYPES = Object.keys(byType(type => type)) as AboutType[];

const trimSlash = (path: string): string => path.replace(/\/+$/, "");

/** The file a locale-less pathname shows; the default one on the section index pages. */
export const aboutTypeOf = (pathname: string | null): AboutType =>
  TYPES.find(type => ABOUT_TYPE_ROUTES[type] === trimSlash(pathname ?? "")) ??
  DEFAULT_ABOUT_TYPE;
