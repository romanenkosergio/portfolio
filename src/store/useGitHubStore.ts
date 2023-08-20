import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IGitInfo } from 'types';

interface UseGitHubStore {
  githubData: IGitInfo[];
  fetchGithubData: () => void;
}

const query = `
query {
  viewer {
    login
    avatarUrl
    gists(first: 10) {
      nodes {
        id
        description
        createdAt
        files {
          text
        }
        stargazerCount
      }
    }  
  }
}
`;

const useGitHubStore = create<UseGitHubStore>()(
  devtools(set => ({
    githubData: [],
    fetchGithubData: async () => {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      });
      const {
        data: { viewer },
      } = await response.json();
      set({
        githubData: await viewer.gists.nodes.map((el: any) => ({
          ...el,
          login: viewer.login,
          avatarUrl: viewer.avatarUrl,
        })),
      });
    },
  }))
);

export default useGitHubStore;
