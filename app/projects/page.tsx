import type { FC } from "react";

import type { Metadata, ResolvedMetadata } from "next";

import { HomeView } from "@/pages/home";

export async function generateMetadata(
  _: any,
  parent: Promise<ResolvedMetadata>
): Promise<Metadata> {
  return {
    title: `Welcome to My Portfolio | ${(await parent)?.title?.absolute}`,
    openGraph: {
      title: `Welcome to My Portfolio | ${(await parent)?.title?.absolute}`
    }
  };
}

const Projects: FC = () => {
  return <HomeView />;
};

export default Projects;
