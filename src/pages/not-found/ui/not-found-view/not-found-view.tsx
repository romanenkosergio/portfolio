"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { FC } from "react";

import { NextIntlClientProvider } from "next-intl";

import { NotFoundContent } from "../not-found-content";

import type { INotFoundViewProps } from "./not-found-view.types";
import { localeOfPath, requestedPath } from "./request-path";

const subscribe = () => () => undefined;
const readPathname = () => window.location.pathname;
const serverPathname = () => null;

// The first paint is the server's (default language, no path); once hydrated
// the visitor's language and the requested path come from the address bar.
const NotFoundView: FC<INotFoundViewProps> = ({ locale, messages }) => {
  const pathname = useSyncExternalStore(
    subscribe,
    readPathname,
    serverPathname
  );
  const current = pathname === null ? locale : localeOfPath(pathname);

  useEffect(() => {
    document.documentElement.lang = current;
  }, [current]);

  return (
    <NextIntlClientProvider
      locale={current}
      timeZone="UTC"
      messages={{ notFound: messages[current] }}
    >
      <NotFoundContent
        path={pathname === null ? null : requestedPath(pathname)}
      />
    </NextIntlClientProvider>
  );
};

export default NotFoundView;
