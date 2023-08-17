import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public auth: AngularFireAuth, private router: Router, private alertCtrl: AlertController) { }

  async loginWithEmail(email : string, password : string){
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.router.navigate(['/message'], { queryParams: { user: email.split('@')[0]} });
      })
      .catch(error => {
        
      });
  }
  async showBasicAlert() {
    const alertBox = await this.alertCtrl.create({
      header: 'エラーメッセージ',
      subHeader: 'ログインに失敗する',
      buttons: ['OK']
    });
    await alertBox.present();
  }

 
}
