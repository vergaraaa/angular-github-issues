import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {
  issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.getLabelsQuery;
  }
}
