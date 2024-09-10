import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { OpenReplayService } from '../open-replay.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal | null = null;

  constructor(protected readonly openReplayService: OpenReplayService) {}

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | null = null;

  cancel() {
    if(this.modal) {
      this.modal.dismiss(null, 'cancel');
    }
    
  }

  confirm() {
    if(this.modal) {
      this.modal.dismiss(this.name, 'confirm');
    }
    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
