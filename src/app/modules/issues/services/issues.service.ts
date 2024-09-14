import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  getLabelsQuery = injectQuery(() => ({
    queryKey: ['getLabels'],
    queryFn: () => getLabels(),
  }));
}
