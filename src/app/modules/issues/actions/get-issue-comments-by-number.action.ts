import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment.development';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueCommentsByNumber = async (
  issueNumber: string
): Promise<GithubIssue[]> => {
  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Cant't load issues";

    const issues: GithubIssue[] = await resp.json();

    return issues;
  } catch (error) {
    throw `Cant't load comments of issue ${issueNumber}`;
  }
};
