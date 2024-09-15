import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';
@Component({
  selector: 'issue-page',
  standalone: true,
  imports: [CommonModule, IssueCommentComponent, RouterLink],
  templateUrl: './issue-page.component.html',
})
export default class IssuePageComponent {
  route = inject(ActivatedRoute);
  issueService = inject(IssueService);

  issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((issueNumber) => this.issueService.setIssueNumber(issueNumber))
    )
  );

  public issueQuery = this.issueService.getIssueQuery;
  public issueCommentsQuery = this.issueService.getIssueCommentsQuery;
}
