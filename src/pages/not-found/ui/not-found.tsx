import type { FC } from "react";

import { getTranslations } from "next-intl/server";

import { BASE_PATH } from "@/shared/config";
import { Container } from "@/shared/ui";

import type { INotFoundProps } from "./not-found.types";

const NotFound: FC<INotFoundProps> = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "notFound" });
  return (
    <Container>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <a
        href={`${BASE_PATH}/${locale}/`}
        title={t("backHome")}
        className="text-accent-1"
      >
        {t("backHome")}
      </a>
    </Container>
  );
};

export default NotFound;
