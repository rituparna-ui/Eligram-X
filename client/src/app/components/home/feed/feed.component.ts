import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  feed: Post[] = [];
  constructor(private feedService: FeedService) {}
  ngOnInit(): void {
    this.feedService.getUserFeed().subscribe((data) => {
      this.feed = data.feed;
    });
  }
}
