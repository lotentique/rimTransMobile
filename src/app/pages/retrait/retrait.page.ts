import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, MenuController } from '@ionic/angular';

import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Retrais } from 'src/app/models/retrais';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: "app-retrait",
  templateUrl: "./retrait.page.html",
  styleUrls: ["./retrait.page.scss"]
})
export class RetraitPage implements OnInit {
  retrais: Retrais;
  val: any;
  verif= true;
  constructor(
    private storage: NativeStorage,
    public modalController: ModalController,
    public authService: AuthService,
    public navCtrl: NavController,
    public menu: MenuController,
    public alertService: AlertService,
    private router: Router
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {}
  dismissRetrais() {
    this.modalController.dismiss();
  }
  ret(form: NgForm) {
    let navExtra: NavigationExtras;
    console.log(form.value.test);
    this.authService.ret(form.value.code).subscribe(
      data => {
        console.log(data["data"]);
        if (data["data"]["trans"] == undefined) {
          this.verif = false;
        }
        this.storage.setItem("data", data["data"]);
        navExtra = {
          queryParams: {
            donnees: JSON.stringify(data["data"])
          }
        };
      },
      retrais => {
        this.retrais = retrais;
      },
      () => {
        if (this.verif ) {
          console.log(this.verif);
          this.dismissRetrais();
          // this.navCtrl.navigateRoot("/resultat");
          this.router.navigate(["resultat"], navExtra);
        } else {
          this.alertService.presentToast("se code de tranfert n'existe pas ");
          this.navCtrl.navigateRoot("/retrait");
        }
      }
    );
  }
}
