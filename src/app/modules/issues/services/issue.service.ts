import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';

@Injectable({ providedIn: 'root' })
export class IssueService {
  private issueNumber = signal<string | null>(null);

  getIssueQuery = injectQuery(() => ({
    queryKey: ['getIssue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: !!this.issueNumber(),
  }));

  getIssueCommentsQuery = injectQuery(() => ({
    queryKey: ['getIssue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: !!this.issueNumber(),
  }));

  setIssueNumber(issueNumber: string) {
    this.issueNumber.set(issueNumber);
  }
}
