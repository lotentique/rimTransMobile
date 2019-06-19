import { Component, OnInit } from '@angular/core';
import { ModalController, NavController ,LoadingController,AlertController} from '@ionic/angular';

import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  log1: string;
  pass: string;
  loading: any;
  constructor(
    private alertCtrl: AlertController,
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private loadingCtrl: LoadingController,
  ) { 
  }
  ngOnInit() {
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message:'veiller pacienter',
      duration:1000
    });
    await loading.present();
  }
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  // On Register button tap, dismiss login modal and open register modal
 
  login(form: NgForm) {
    this.presentLoading();
    this.authService.login(form.value.login, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("connecter");
      },
      error => {
         this.alertCtrl.create({
           header:'alerte',
           message: 'Error on verify authentication info',
            buttons: ['Ok'] 
          });
           
         
      },
      () => {
        
        this.dismissLogin();
        this.navCtrl.navigateRoot('/dashboard');
        this.loading.dismiss();
        
      }
    );
  }
}