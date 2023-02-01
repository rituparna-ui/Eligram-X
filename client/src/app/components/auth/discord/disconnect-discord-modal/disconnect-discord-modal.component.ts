import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-disconnect-discord-modal',
  templateUrl: './disconnect-discord-modal.component.html',
  styleUrls: ['./disconnect-discord-modal.component.css'],
})
export class DisconnectDiscordModalComponent {
  constructor(
    private dialogRef: MatDialogRef<DisconnectDiscordModalComponent>
  ) {}
}
