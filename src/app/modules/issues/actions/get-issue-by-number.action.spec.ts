import { environment } from 'src/environments/environment.development';
import { getIssueByNumber } from './get-issue-by-number.action';

const issueNumber = '123';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

const mockIssue = {
  id: '123',
  number: issueNumber,
  body: '# Hello world',
};

describe('GetIssueByNumber action', () => {
  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueReponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueReponse);

    const issue = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
  });

  it('should not fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueReponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueReponse);

    try {
      const issue = await getIssueByNumber(issueNumber);
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Can't load issue ${issueNumber}`);
    }
  });
});
