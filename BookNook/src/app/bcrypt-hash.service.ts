import { Injectable } from '@angular/core';
import * as bcrypt from 'bcrypt';

@Injectable({
  providedIn: 'root'
})
export class BcryptHashService {
  constructor() { }

  bcrypt
    .hash(password, saltRounds).then(hash => {
        userHash = hash
        console.log('Hash ', hash)
        validateUser(hash)
    })
    .catch(err => console.error(err.message))

  validateUser(hash) {
      bcrypt
      .compare(password, hash)
      .then(res => {
          console.log(res) // return true
      })
      .catch(err => console.error(err.message))
}
