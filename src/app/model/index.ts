export interface ILocaleProps {
  params: Promise<{ locale: string }>;
}

export interface ILocaleTypeProps {
  params: Promise<{ locale: string; type: string }>;
}
