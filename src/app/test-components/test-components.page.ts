import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-test-components',
  templateUrl: './test-components.page.html',
  styleUrls: ['./test-components.page.scss']
})
export class TestComponentsPage {
  constructor(
    private vibration: Vibration,
    private navCtrl: NavController,
  ) {}

  vibrar() {
    // Vibrate the device for a second
    // Duration is ignored on iOS.
    this.vibration.vibrate(10000);
  }

  vibrar2() {
    // Vibrate 2 seconds
    // Pause for 1 second
    // Vibrate for 2 seconds
    // Patterns work on Android and Windows only
    this.vibration.vibrate([2000, 1000, 2000]);
  }

  stop() {
    // Stop any current vibrations immediately
    // Works on Android and Windows only
    this.vibration.vibrate(0);
  }


  goHome() {
    this.navCtrl.navigateBack('/menu/home');
  }
}
