import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  user: User;
  detail: any;
  caisse: any;
  nbrretrais: any;
  nbrtrans: any;
  somme: any;
  transrecu: any;
  constructor(private menu: MenuController, private authService: AuthService) {
    this.menu.enable(true);
  }
  ngOnInit() {}
  ionViewWillEnter() {
    this.authService.user().subscribe(user => {
      this.user = user;
    });

    this.authService.detail().subscribe(data => {
      this.detail = data;
      this.caisse = this.detail.data.caisse;
      this.nbrretrais = this.detail.data.nbrretrais;
      this.nbrtrans = this.detail.data.nbrtrans;
      this.somme = this.detail.data.somme;
      this.transrecu = this.detail.data.transrecu;
      console.log(this.detail.data.caisse);
    });
  }
}