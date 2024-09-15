import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions/get-labels.action';
import { getIssues } from '../actions';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  selectedState = signal<State>(State.All);

  getLabelsQuery = injectQuery(() => ({
    queryKey: ['getLabels'],
    queryFn: () => getLabels(),
  }));

  getIssuesQuery = injectQuery(() => ({
    queryKey: ['getIssues', this.selectedState()],
    queryFn: () => getIssues(this.selectedState()),
  }));

  showIssuesByState(state: State) {
    this.selectedState.set(state);
  }
}
