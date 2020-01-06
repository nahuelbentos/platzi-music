
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private storage: Storage
  ) { }

  async loginUser(credential) {
    const user = await this.storage.get('user');
    return new Promise((accept, reject) => {
      if ((credential.email === 'test@test.com' && credential.password === '12345') ||
        (credential.email === user.email && btoa(credential.password) === user.password)) {
        accept('Login correcto');
      } else {
        reject('Login incorrecto');
      }

    });
  }

  registerUser(userData) {
    userData.password = btoa(userData.password);
    return this.storage.set('user', userData);
  }
}