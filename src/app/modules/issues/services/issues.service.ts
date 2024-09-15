import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions/get-labels.action';
import { getIssues } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  getLabelsQuery = injectQuery(() => ({
    queryKey: ['getLabels'],
    queryFn: () => getLabels(),
  }));

  getIssuesQuery = injectQuery(() => ({
    queryKey: ['getIssues'],
    queryFn: () => getIssues(),
  }));
}
