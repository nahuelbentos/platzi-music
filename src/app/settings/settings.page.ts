import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
  user: any;
  userImage = 'assets/img/user.jpg';
  photo: SafeResourceUrl;

  constructor(private storage: Storage, private sanitizer: DomSanitizer, private navCtrl: NavController) {}

  ionViewWillEnter() {
    this.storage.get('currentUser').then(value => {
      this.user = value;
    });
  }

  goHome() {
    this.navCtrl.navigateBack('/menu/home');
  }
  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    console.log(image);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
  }
}
