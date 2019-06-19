import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { AuthGuard } from "./guard/auth.guard";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  rootPage: any;
  public appPages = [
    {
      title: "Acceuil",
      url: "/dashboard",
      icon: "home"
    },
    
    {
      title: "Retrait",
      url: "/retrait",
      icon: "arrow-back"
    },
    {
      title: "Transfert",
      url: "/transfert",
      icon: "arrow-forward"
    },
    {
      title: "Mise a Jour caisse",
      url: "/misajr-caise",
      icon: "cash"
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private authGuard: AuthGuard
  ) {
    // this.initializeApp();
    this.authGuard.checAuth().then(res => {
      console.log("res: " + res);
      if (res == false) {
        this.navCtrl.navigateRoot("/landing");
      } else {
        this.navCtrl.navigateRoot("/dashboard");
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      //this.splashScreen.hide();
      this.authService.getToken();
    });
  }
  // When Logout Button is pressed
  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast(data["message"]);
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot("/landing");
      }
    );
  }
}