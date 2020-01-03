import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  registerForm: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'No es un email válido.' },
    ],
    password: [
      { type: 'required', message: 'El password es requerido.' },
      { type: 'minlength', message: 'El password debe tener al menos 5 caracteres.' },
    ],
    nombre: [
      { type: 'required', message: 'El nombre es requerido.' },
      { type: 'minlength', message: 'El nombre debe tener al menos 5 caracteres.' },
    ],
    apellido: [
      { type: 'required', message: 'El apellido es requerido.' },
      { type: 'minlength', message: 'El apellido debe tener al menos 5 caracteres.' },
    ]
  };
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {

    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        '', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '', Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ),
      nombre: new FormControl(
        '', Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])
      ),
      apellido: new FormControl(
        '', Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])
      )
    });

  }

  register(userData) {
    this.authService.registerUser(userData);
    this.navCtrl.navigateBack('/login');
    console.log(userData);
  }


  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
