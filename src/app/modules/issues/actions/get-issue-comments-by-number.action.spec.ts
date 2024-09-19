import { environment } from 'src/environments/environment.development';
import { getIssueCommentsByNumber } from './get-issue-comments-by-number.action';

const issueNumber = '123';
const mockComments: any[] = [
  { id: 1, body: 'First Comment', user: { login: 'user1' } },
  { id: 2, body: 'Second Comment', user: { login: 'user2' } },
];

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

describe('GetIssueComment', () => {
  it('should fetch issue comments succesfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueCommentsReponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsReponse);

    await getIssueCommentsByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
  });

  it('should throw error if response is not okay', async () => {
    const issueCommentsReponse = new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsReponse);

    try {
      await getIssueCommentsByNumber(issueNumber);
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Cant't load comments of issue ${issueNumber}`);
    }
  });
});
