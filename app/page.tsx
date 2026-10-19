import { Metadata, ResolvedMetadata } from "next";
import { FC } from "react";
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

const Home: FC = () => {
  return <HomeView />;
};

export default Home;
