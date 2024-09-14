import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'issues-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {}
