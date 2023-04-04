import { Component, OnInit } from '@angular/core';
import { PostReport } from 'src/app/models/postReports';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(private reportService: ReportService) {}
  postReports: PostReport[] = [];
  ngOnInit(): void {
    this.reportService.getPostReports().subscribe((data) => {
      this.postReports = data.reports;
    });
  }
}
