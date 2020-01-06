import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  validationsForm: FormGroup;
  errorMessage = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ),
      password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required]))
    });
  }

  validationMessages = {
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'Por favor ingrese un email válido' }
    ],
    password: [
      { type: 'required', message: 'El password es requerido.' },
      {
        type: 'minlength',
        message: 'El password debe tener al menos 5 caracteres'
      }
    ]
  };

  loginUser(credentials) {
    console.log(credentials);
    this.authService.loginUser(credentials)
      .then(res => {
        this.errorMessage = '';
        this.storage.set('isUserLoggedIn', true);
        this.navCtrl.navigateForward('/menu/home');
      })
      .catch(error => {
        this.errorMessage = error;
      });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }
}
