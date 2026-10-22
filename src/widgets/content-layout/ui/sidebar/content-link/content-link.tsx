import type { FC } from "react";

import { useTranslations } from "next-intl";

import { Icon, NavLink } from "@/shared/ui";

import type { IContentLinkProps } from "./content-link.types";

// An address may wrap only before the @, never mid-word.
const withBreakAtSign = (text = "") => {
  const at = text.indexOf("@");
  return at > 0 ? (
    <>
      {text.slice(0, at)}
      <wbr />
      {text.slice(at)}
    </>
  ) : (
    text
  );
};

const ContentLink: FC<IContentLinkProps> = ({ item }) => {
  const t = useTranslations("sidebar.items");
  const title = item.titleKey ? t(item.titleKey) : item.title;
  const linkProps = {
    variant: "file",
    title,
    className: "group flex min-h-11 cursor-pointer items-center desktop:min-h-0"
  } as const;
  const children = (
    <>
      <Icon
        name={item.icon || "markdown"}
        tone={item.tone}
        className="h-3.5 w-4 shrink-0"
        interactive={!item.tone}
      />
      <span className="min-w-0 text-base desktop:group-hover:text-white">
        {withBreakAtSign(title)}
      </span>
    </>
  );

  return item.external ? (
    <NavLink
      {...linkProps}
      href={item.href}
      download={item.download}
      isExternal
    >
      {children}
    </NavLink>
  ) : (
    <NavLink {...linkProps} href={item.href}>
      {children}
    </NavLink>
  );
};

export default ContentLink;
