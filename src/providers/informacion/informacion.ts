import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { LoadingController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class InformacionProvider {
  private url =
    "http://wsse.seccionamarilla.com/SearchEngine.svc/REST/PUNCTUALSEARCHLISTING/${texto}/${lat}/${lng}/80/${page}/10/2/1/IPHONEADSA/bEJjb0hvK1U2Vm1uaHQyVE5wMkdDSkY5cE11RiszSlI=";

  constructor(
    public loadingCtrl: LoadingController,
    public http2: Http,
    private httpClient: HttpClient
  ) {}

  getBusiness(
    searchTerms: string,
    length: string,
    latitude: string,
    pageNumber: number = 1
  ): Observable<object> {
    return this.httpClient.get(
      this.url
        .replace("${page}", pageNumber.toString())
        .replace("${lng}", length)
        .replace("${lat}", latitude)
        .replace("${texto}", searchTerms)
    );
  }
}
