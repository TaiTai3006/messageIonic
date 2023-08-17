import { Component } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isToastOpen = false;
  mess = ''
  email : string = ''
  password : string = ''
  constructor(private firebaseService: FirebaseAuthService, public auth: AngularFireAuth, private router: Router,) {}
  handleLogin(){
    if(this.email === '' && this.password === ''){
      this.mess = 'Please enter your email.'
      this.setOpen(true)
    } else if(this.password === ''){
      this.mess = 'Please enter your password.'
      this.setOpen(true)
    } else {
      this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(userCredential => {
        this.router.navigate(['/message'], { queryParams: { user: this.email.split('@')[0]} });
      })
      .catch(error => {
        this.checkEmail()
        
      });
  
    }
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async checkEmail() {
    try {
      const methods = await this.auth.fetchSignInMethodsForEmail(this.email);
      if(methods.length > 0){
        this.mess = 'パスワードが間違っています。'
        this.setOpen(true)
      } else{
        this.mess = 'メルアドレスが存在しません。'
        this.setOpen(true)
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra email:', error);
    }
  }


}
