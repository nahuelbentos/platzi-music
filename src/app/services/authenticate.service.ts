
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private storage: Storage
  ) { }


  loginUser(credentials) {
    const key = credentials.email;
    const encryptedPass = credentials.password;
    console.log('key:', key);
    console.log('encryptedPass:', encryptedPass);
    console.log('Credentials:', credentials);
    if (key === 'test@test.com' && encryptedPass === '12345') {
      return new Promise((accept, reject) => {
        if (key === 'test@test.com' && encryptedPass === '12345') {
          console.log('ok');
          accept(credentials);
        } else {
          console.log('no ok');
          reject('Login incorrecto');
        }
      });
    } else {
        return new Promise((accept, reject) => {
          this.storage.get(key).then(usuario => {
            if (usuario) {
              if (btoa(encryptedPass) === usuario.password) {
                accept(usuario);
              } else {
                reject('Contraseña incorrecta');
              }
            }
          });
        });
      }
  }

  registerUser(value) {
    return new Promise((accept, reject) => {
      this.storage.get(value.email).then(usuario => {
        if (usuario) {
          console.log(usuario);
          reject('El usuario ya existe');
        } else {
          // Un poco 'Minimo' de seguridad
          value.password = btoa(value.password);
          this.storage.set(value.email, value).then(() => {
            accept('El usuario se ha creado con éxito');
          });
        }
      });
    });
  }
}
