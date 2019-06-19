import { Component, OnInit } from '@angular/core';

import {FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { ModalController, NavController, MenuController } from "@ionic/angular";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
@Component({
  selector: "app-transfert",
  templateUrl: "./transfert.page.html",
  styleUrls: ["./transfert.page.scss"]
})
export class TransfertPage implements OnInit {
  verif = false;
  verifCode = false;
  verifTelForm: FormGroup;
  transfertForm: FormGroup;
  tel_benef: number;
  tel_expe: number;
  res: any;
  benef: any;
  expe: any;
  villes: any;

  nom_expe: any;
  prenom_expe: any;
  nni_expe: any;
  email_expe: any;
  nom_benef: any;
  prenom_benef: any;
  email_benef: any;

  code_transfert: string;
  tarif: number;

  error_messages = {
    tel_benef: [
      { type: "required", message: "le nni est obligatoire" },
      { type: "minLength", message: "ce champs doit contenire 10 numero" },
      { type: "maxLength", message: "ce champs doit contenire 10 numero" },
      {
        type: "pattern",
        message: "veille saisire un numero de telephone valide"
      }
    ],
    nom_benef: [
      { type: "required", message: "le nom du beneficiair est obligatoire" }
    ],
    prenom_benef: [
      { type: "required", message: "le prenom du beneficiair est obligatoire" }
    ],

    nom_expe: [
      { type: "required", message: "le nom de l'expediteur est obligatoire" }
    ],
    prenom_expe: [
      { type: "required", message: "le prenom de l'expediteur est obligatoire" }
    ],
    nni_expe: [
      { type: "required", message: "le nni de l'expediteur obligatoire" }
    ],

    ville: [
      { type: "required", message: "le choix de ville est obligatoire" }
    ],
    montant: [
      { type: "required", message: "le montant est obligatoire" }
    ],

    tel_expe: [
      { type: "required", message: "le tel est obligatoire" },
      { type: "minLength", message: "ce champs doit contenire 10 numero" },
      { type: "maxLength", message: "ce champs doit contenire 10 numero" },
      {
        type: "pattern",
        message: "veille saisire un numero de telephone valide"
      }
    ]
  };
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public navCtrl: NavController
  ) {
    this.verifTelForm = formBuilder.group({
      tel_benef: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]{8}$")
        ])
      ),
      tel_expe: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]{8}$")
        ])
      ),
      test: []
    });
    console.log(this.expe);
    console.log(this.benef);
    if (this.expe == undefined) {
      if (this.benef == undefined) {
        this.transfertForm = formBuilder.group({
          nom_benef: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          prenom_benef: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          tel_benef: [],
          email_benef: [],
          nom_expe: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          prenom_expe: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          tel_expe: [],
          nni_expe: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          email_expe: [],
          ville: new FormControl("", Validators.compose([Validators.required])),
          montant: new FormControl(
            "",
            Validators.compose([Validators.required])
          )
        });
      } else {
        this.transfertForm = formBuilder.group({
          nom_benef: [],
          prenom_benef: [],
          tel_benef: [],
          email_benef: [],
          nom_expe: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          prenom_expe: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          tel_expe: [],
          nni_expe: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          email_expe: [],

          ville: new FormControl("", Validators.compose([Validators.required])),
          montant: new FormControl(
            "",
            Validators.compose([Validators.required])
          )
        });
      }
    } else {
      if (this.benef == undefined) {
        this.transfertForm = formBuilder.group({
          nom_benef: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          prenom_benef: new FormControl(
            "",
            Validators.compose([Validators.required])
          ),
          tel_benef: [],
          email_benef: [],
          nom_expe: [],
          prenom_expe: [],
          tel_expe: [],
          nni_expe: [],
          email_expe: [],
          ville: new FormControl("", Validators.compose([Validators.required])),
          montant: new FormControl(
            "",
            Validators.compose([Validators.required])
          )
        });
      } else {
        this.transfertForm = formBuilder.group({
          nom_benef: [],
          prenom_benef: [],
          tel_benef: [],
          email_benef: [],

          nom_expe: [],
          prenom_expe: [],
          tel_expe: [],
          nni_expe: [],
          email_expe: [],

          ville: new FormControl("", Validators.compose([Validators.required])),
          montant: new FormControl(
            "",
            Validators.compose([Validators.required])
          )
        });
      }
    }
  }

  ngOnInit() {}

  verifTel() {
    this.tel_benef = this.verifTelForm.value.tel_benef;
    this.tel_expe = this.verifTelForm.value.tel_expe;
    this.authService.verifTel(this.tel_benef, this.tel_expe).subscribe(
      data => {
        this.verif = true;
        this.villes = data["data"]["villes"];
        console.log(this.villes);
        console.log(data["data"]);
        if (data["data"]["benef"][0]["nom"] != undefined) {
          this.benef = data["data"]["benef"][0];
          console.log(this.benef);
        }
        if (data["data"]["expe"][0]["nom"] != undefined) {
          this.expe = data["data"]["expe"][0];
          console.log(this.expe);
          //console.log(this.expe["id"]);
        }
      },
      res => {
        this.res = res;
        console.log(this.res);
      },
      () => {
        console.log(this.verif);
        this.navCtrl.navigateRoot("/transfert");
      }
    );
  }
  transfert(transfertForm1: FormGroup) {
    console.log(transfertForm1.value);

    transfertForm1.value.id;
    if (this.expe == undefined) {
      this.nom_expe = transfertForm1.value.nom_expe;
      this.prenom_expe = transfertForm1.value.prenom_expe;
      this.tel_expe = this.tel_expe;
      this.nni_expe = transfertForm1.value.nni_expe;
      this.email_expe = transfertForm1.value.email_expe;
    } else {
      this.nom_expe = this.expe["nom"];
      this.prenom_expe = this.expe["prenom"];
      this.tel_expe = this.expe["tel"];
      this.nni_expe = this.expe["nni"];
      this.email_expe = this.expe["email"];
    }
    if (this.benef == undefined) {
      this.nom_benef = transfertForm1.value.nom_benef;
      this.prenom_benef = transfertForm1.value.prenom_benef;
      this.tel_benef = this.tel_benef;
      this.email_benef = transfertForm1.value.email_benef;
    } else {
      this.nom_benef = this.benef["nom"];
      this.prenom_benef = this.benef["prenom"];
      this.tel_benef = this.benef["tel"];
      this.email_benef = this.benef["email"];
    }

    let navExtra: NavigationExtras;
    this.authService
      .transfert(
        this.nom_expe,
        this.prenom_expe,
        this.tel_expe,
        this.nni_expe,
        this.email_expe,
        this.nom_benef,
        this.prenom_benef,
        this.tel_benef,
        this.email_benef,

        transfertForm1.value.montant,
        transfertForm1.value.ville
      )
      .subscribe(
        data => {
          console.log(data["data"]);
          this.verifCode = true;
          console.log(data["data"]["code"]);
          console.log(data["data"]["tarif"]);
          this.code_transfert = data["data"]["code"];
          this.tarif = data["data"]["tarif"];
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
          this.navCtrl.navigateRoot("/transfert");
        }
      );
  }
}
