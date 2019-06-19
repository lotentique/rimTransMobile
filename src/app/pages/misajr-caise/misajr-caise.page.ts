import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";
import { ModalController, NavController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-misajr-caise",
  templateUrl: "./misajr-caise.page.html",
  styleUrls: ["./misajr-caise.page.scss"]
})
export class MisajrCaisePage implements OnInit {
  verif = true;
  res: any;
  retiraisForm: FormGroup;
  ajouterForm: FormGroup;
  error_messages = {
    montant: [
      { type: "pattern", message: "ce champs doit comtenire que des nombre" }
    ]
  };
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public alertService: AlertService,
    public navCtrl: NavController
  ) {
    this.retiraisForm = formBuilder.group({
      montant: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])
      )
    });

    this.ajouterForm = formBuilder.group({
      montant: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])
      )
    });
  }

  ngOnInit() {}

  retrais() {
    this.authService.retiraisCaisse(this.retiraisForm.value.montant).subscribe(
      data => {
        console.log(data["data"]);
        if (data["data"]["message"] == undefined) {
          this.verif = false;
        }
      },
      res => {
        this.res = res;
        console.log(this.res);
      },
      () => {
        if (this.verif) {
          console.log(this.verif);
          this.alertService.presentToast("Retrais effetue ");
          this.navCtrl.navigateRoot("/misajr-caise");
        } else {
          this.alertService.presentToast(
            "se montant ne se trouve pas dans la caisse"
          );
          this.navCtrl.navigateRoot("/misajr-caise");
        }
      }
    );
  }

  ajout() {
    this.authService.ajoutCaisse(this.ajouterForm.value.montant).subscribe(
      data => {
        console.log(data["data"]);
      },
      res => {
        this.res = res;
        console.log(this.res);
      },
      () => {
        this.alertService.presentToast("Ajout effetue ");
        this.navCtrl.navigateRoot("/misajr-caise");
      }
    );
  }
}
