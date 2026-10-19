import type { FC } from "react";

import type { Metadata, ResolvedMetadata } from "next";

import { E_ROUTES } from "@/shared/config";
import { pageMetadata } from "@/shared/lib";

import { HomeView } from "@/pages/home";

export async function generateMetadata(
  _props: unknown,
  parent: Promise<ResolvedMetadata>
): Promise<Metadata> {
  const title = `Welcome to My Portfolio | ${(await parent)?.title?.absolute}`;
  return pageMetadata(E_ROUTES.PROJECTS, { title, openGraph: { title } });
}

const Projects: FC = () => {
  return <HomeView />;
};

export default Projects;
