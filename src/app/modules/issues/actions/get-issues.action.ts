import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment.development';
import { GithubIssue, State } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssues = async (
  state: State = State.All,
  selectedLabels: string[]
): Promise<GithubIssue[]> => {
  await sleep(1500);

  const params = new URLSearchParams();
  params.append('state', state);

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const resp = await fetch(`${BASE_URL}/issues?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!resp.ok) throw "Cant't load issues";

    const issues: GithubIssue[] = await resp.json();

    return issues;
  } catch (error) {
    throw "Cant't load issues";
  }
};
