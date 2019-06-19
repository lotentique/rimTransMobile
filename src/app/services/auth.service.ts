import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Retrais } from '../models/retrais';
import { Storage } from '@ionic/storage';
import { NumberSymbol } from '@angular/common';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;
  token: any;
  data: any;
  constructor(
    private http: HttpClient,
    private httpc: Http,
    public storage1: Storage,
    private storage: NativeStorage,
    private env: EnvService
  ) {}
  login(login: String, password: String) {
    return this.http
      .post(this.env.API_URL + "auth/login", {
        login: login,
        password: password
      })
      .pipe(
        tap(token => {
          this.storage1.set("token", token),
            this.storage.setItem("token", token).then(
              () => {
                console.log("Token Stored");
              },
              error => console.error("Error storing item", error)
            );
          this.token = token;
          this.isLoggedIn = true;
          return token;
        })
      );
  }
  logout() {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .get(this.env.API_URL + "auth/logout", { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      );
  }
  user() {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .get<User>(this.env.API_URL + "auth/user", { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      );
  }

  detail() {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .get<User>(this.env.API_URL + "auth/detail", { headers: headers })
      .pipe(
        tap(datail => {
        return datail;
        })
      );
  }

  ret(code: string) {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .post(
        this.env.API_URL + "auth/retrais",
        { code: code },
        { headers: headers }
      )
      .pipe(
        tap(retrais => {
          return retrais;
        })
      );
  }
  getToken() {
    return this.storage.getItem("token").then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
  retEffect(nni_benef: number, id_trans: number) {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .post(
        this.env.API_URL + "auth/retrais/effectue",
        {
          nni_benef: nni_benef,
          id_trans: id_trans
        },
        { headers: headers }
      )
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  verifTel(tel_benef: number, tel_expe: number) {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .post(
        this.env.API_URL + "auth/transfert/verif",
        {
          tel_benef: tel_benef,
          tel_expe: tel_expe
        },
        { headers: headers }
      )
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  transfert(
    nom_expediteur: string,
    prenom_expediteur: string,
    tel_expediteur: number,
    nni_expediteur: number,
    email_expediteur: string,
    nom_beneficiaire: string,
    prenom_beneficiaire: string,
    tel_beneficiaire: number,
    email_beneficiaire: string,
    montant: number,
    ville: number
  ) {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .post(
        this.env.API_URL + "auth/transfert",
        {
          nom_expediteur: nom_expediteur,
          prenom_expediteur: prenom_expediteur,
          tel_expediteur: tel_expediteur,
          nni_expediteur: nni_expediteur,
          email_expediteur: email_expediteur,

          nom_beneficiaire: nom_beneficiaire,
          prenom_beneficiaire: prenom_beneficiaire,
          tel_beneficiaire: tel_beneficiaire,
          email_beneficiaire: email_beneficiaire,

          montant: montant,
          id_ville: ville
        },
        { headers: headers }
      )
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  retiraisCaisse(montant: number) {
    const headers = new HttpHeaders({
      Authorization:
        this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .post(
        this.env.API_URL + "auth/caisse/retirais",
        {
          montant: montant
        },
        { headers: headers }
      )
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  ajoutCaisse(montant: number) {
    const headers = new HttpHeaders({
      Authorization:
        this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http
      .post(
        this.env.API_URL + "auth/caisse/ajout",
        {
          montant: montant
        },
        { headers: headers }
      )
      .pipe(
        tap(res => {
          return res;
        })
      );
  }
}