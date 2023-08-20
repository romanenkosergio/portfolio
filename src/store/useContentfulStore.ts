import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IContentfulProjectData {
  projectTitle: string;
  projectDescription: string;
  projectImage: {
    url: string;
  };
  projectTechnologies: string;
  showTheProject: boolean;
}

interface IContentfulAboutMeData {
  [key: string]: string;
}

interface UseContentfulStore {
  aboutMe: IContentfulAboutMeData;
  projects: IContentfulProjectData[];
  activeTechnologies: string[];
  fetchContentfulData: () => void;
}

const query = `
query {
  aboutMePageCollection {
    items {
      aboutMe
      myLife
      coding
      mentoring
      highSchool
      university
      companies
      lecturing
      skills
      books
      games
      music
    }
  }
  projectsCollection {
    items {
      projectTitle
      projectImage {
        url
      }
      projectDescription
      projectTechnologies
      showTheProject
    }
  }
}
`;

const useContentfulStore = create<UseContentfulStore>()(
  devtools(set => ({
    aboutMe: {},
    projects: [],
    activeTechnologies: [],
    fetchContentfulData: async () => {
      const response = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        }
      );
      const {
        data: { projectsCollection, aboutMePageCollection },
      } = await response.json();
      const technologies: string[] = projectsCollection.items
        .map((p: IContentfulProjectData) => p.projectTechnologies)
        .flat();
      set({
        aboutMe: aboutMePageCollection.items[0],
        projects: projectsCollection.items,
        activeTechnologies: [...new Set(technologies)],
      });
    },
  }))
);

export default useContentfulStore;
