import { Injectable, NgZone } from '@angular/core';
import Tracker from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';

@Injectable({ providedIn: 'root' })
export class OpenReplayService {
  tracker: Tracker | null = null;

  constructor(protected readonly ngZone: NgZone) {
    this.initialize();
  }

  initialize(): void {
    this.ngZone.runOutsideAngular(() => {
      this.tracker = new Tracker({
        __DISABLE_SECURE_MODE: true,
        projectKey: 'PROJECT_KEY',
        captureIFrames: true,
        captureExceptions: true,
      });

      this.tracker.use(
        trackerAssist({
          confirmText: `You have an incoming call from etiscan Support. Do you want to answer?`,
        })
      );

      this.start();
    });
  }

  async start() {
    return this.ngZone.runOutsideAngular(() => {
      if (this.tracker) return this.tracker.start();

      return {
        sessionToken: undefined,
        sessionID: undefined,
        userUUID: undefined,
      };
    });
  }

  setUserData(user: string): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.tracker) {
        this.tracker.setUserID(user);
      }
    });
  }
}
