export interface IGitInfo {
  login: string;
  avatarUrl: string;
  createdAt: string;
  description: string;
  id: string;
  stargazerCount: number;
  files: {
    text: string;
  }[];
}
