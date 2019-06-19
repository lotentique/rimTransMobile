import { Component, OnInit } from "@angular/core";
import { RetraitPage } from "../retrait/retrait.page";

import { ModalController, NavController, MenuController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

import { User } from "src/app/models/user";
import { stringify } from '@angular/compiler/src/util';
import { __values } from 'tslib';

@Component({
  selector: "app-resultat",
  templateUrl: "./resultat.page.html",
  styleUrls: ["./resultat.page.scss"]
})
export class ResultatPage implements OnInit {
  user: User;
  data: any;
  benef: any;
  trans: any;
  villeFrom: any;
  pnt1: any;
  res: any;
  id: number;
  nni: number;
  id_trans: number;
  id_pnt: number;
  nniForm: FormGroup;
  verif = true;
  error_messages = {
    nni: [
      { type: "required", message: "le nni est obligatoire" },
      { type: "minLength", message: "ce champs doit contenire 10 numero" },
      { type: "maxLength", message: "ce champs doit contenire 10 numero" },
      { type: "pattern", message: "veille saisire un NNI 10 chifre" }
    ]
  };
  constructor(
    public modalController: ModalController,
    public authService: AuthService,
    public navCtrl: NavController,
    public menu: MenuController,
    public alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.menu.enable(true);
    this.route.queryParams.subscribe(params => {
      console.log(params.donnees);
       this.data = JSON.parse(params.donnees);
      this.id_trans=this.data["trans"][0]["id"];
      if (params && params.donnees) {
        this.data = JSON.parse(params.donnees);
        this.benef = this.data["benef"][0];
        this.trans = this.data["trans"][0];
        this.pnt1 = this.data["pnt1"][0];
        this.villeFrom = this.data["villeFrom"][0];
        console.log(this.data["benef"][0]["nom"]);
        if (this.trans.effectue_par) {
          console.log("cette agent a effectue le transfert");
        }
      }
    });
    this.nniForm = formBuilder.group({
      nni: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]{10}$")
        ])
      ),
    });
  }
  ngOnInit() {}
  ionViewWillEnter() {
    this.authService.user().subscribe(user => {
      this.user = user;
    });
  }
  retrai() {
    console.log(this.nniForm.value);
    this.nni = this.nniForm.value.nni;
    let navExtra: NavigationExtras;
    this.authService
      .retEffect(this.nni, this.id_trans)
      .subscribe(
        data => {
          console.log(data["data"]);
          if (data["data"]["message"] == undefined) {
            this.verif = false;
          }
          navExtra = {
            queryParams: {
              donnees: JSON.stringify(data["data"])
            }
          };
        },
        res => {
          this.res = res;
          console.log(this.res);
        },
        () => {
          if (this.verif) {
            console.log(this.verif);
            // this.router.navigate(["resultat"], navExtra);
            this.alertService.presentToast("retrais effetue ");
            this.navCtrl.navigateRoot("/retrait");
          } else {
            this.alertService.presentToast("se montant ne se trouve pas dans la caisse");
            this.navCtrl.navigateRoot("/resultat");
          }
          
        }
      );
  }
}
