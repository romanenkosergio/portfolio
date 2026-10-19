import type { FC, PropsWithChildren } from "react";

// The real root layout (<html>) is app/[locale]/layout.tsx so `lang` follows the
// route; this one only lets the root redirect page exist next to it.
const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
