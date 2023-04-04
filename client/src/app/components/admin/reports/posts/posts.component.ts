import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostReport } from 'src/app/models/postReports';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(
    private reportService: ReportService,
    private snackbar: MatSnackBar
  ) {}
  postReports: PostReport[] = [];
  ngOnInit(): void {
    this.fetchPendingReports();
  }
  fetchPendingReports() {
    this.reportService.getPostReports().subscribe((data) => {
      this.postReports = data.reports;
    });
  }
  dismissReports(post: string) {
    this.reportService.dismissReport(post).subscribe(() => {
      this.snackbar.open(
        'All Reports related to this post dismissed',
        'Okay !',
        { duration: 1500 }
      );
      this.fetchPendingReports();
    });
  }
}
