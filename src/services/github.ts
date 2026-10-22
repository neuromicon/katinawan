/**
 * @license
 * Katin-awan — GitHub Integration Service
 * Repository: https://github.com/neuromicon/katinawan
 */

export interface GitHubRepoInfo {
  owner: string;
  repo: string;
  repoUrl: string;
  cloneUrl: string;
  actionsUrl: string;
  commitsUrl: string;
  vercelUrl: string;
}

export const GITHUB_CONFIG: GitHubRepoInfo = {
  owner: 'neuromicon',
  repo: 'katinawan',
  repoUrl: 'https://github.com/neuromicon/katinawan',
  cloneUrl: 'https://github.com/neuromicon/katinawan.git',
  actionsUrl: 'https://github.com/neuromicon/katinawan/actions',
  commitsUrl: 'https://github.com/neuromicon/katinawan/commits/main',
  vercelUrl: 'https://katinawan.vercel.app'
};

export async function fetchGitHubRepoDetails() {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`);
    if (res.ok) {
      const data = await res.json();
      return {
        name: data.name,
        description: data.description,
        stars: data.stargazers_count,
        forks: data.forks_count,
        openIssues: data.open_issues_count,
        defaultBranch: data.default_branch || 'main',
        updatedAt: data.updated_at
      };
    }
  } catch (err) {
    console.warn('Could not query GitHub public API:', err);
  }
  return null;
}
