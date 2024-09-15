import { Injectable, signal } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';

@Injectable({ providedIn: 'root' })
export class IssueService {
  private issueNumber = signal<string | null>(null);
  private queryClient = injectQueryClient();

  getIssueQuery = injectQuery(() => ({
    queryKey: ['getIssue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: !!this.issueNumber(),
    staleTime: 1000 * 60 * 5, // minutes
  }));

  getIssueCommentsQuery = injectQuery(() => ({
    queryKey: ['getIssue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: !!this.issueNumber(),
    staleTime: 1000 * 60 * 5, // minutes
  }));

  setIssueNumber(issueNumber: string) {
    this.issueNumber.set(issueNumber);
  }

  prefetchIssue(issueNumber: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['getIssue', issueNumber],
      queryFn: () => getIssueByNumber(issueNumber),
      staleTime: 1000 * 60 * 5, // minutes
    });
  }
}
