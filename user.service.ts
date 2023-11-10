import {Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environmet} from "src/interface/config/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class UserService {
  private ulrr = environmet.url;

  constructor(private http: HttpClient){
  }

  getData(): Observable<any> {
    return this.http.get(`${this.ulrr}/id`)
  }
}
