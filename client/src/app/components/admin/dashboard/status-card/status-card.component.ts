import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css'],
})
export class StatusCardComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() color: string = '';
  @Input() count: number = 0;
}
