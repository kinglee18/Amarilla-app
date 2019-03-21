import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { LoadingController } from "ionic-angular";

@Injectable()
export class InformacionProvider {
  public info = {
    search: "",
    texto: "",
    auto: [],
    blog: [],
    list: [],
    page: 1,
    total: 0,
    coords: {
      lat: null,
      lng: null
    }
  };

  msg: String;

  public datosApp = {
    favoritos: []
  };

  resultados: boolean = true;
  dataAll;

  constructor(
    public loadingCtrl: LoadingController,
    public http2: Http
  ) {}

  getNegocios1(texto, page, ev) {
    this.resultados = true;
    let lat, lng;
    lat = this.info.coords.lat.toString();
    lng = this.info.coords.lng.toString();

    let load;

    if (page == 1) {
      load = this.loadingCtrl.create({
        content: "Cargando..."
      });

      load.present();
    }

    let obs = this.http2
      .get(
        `http://wsse.seccionamarilla.com/SearchEngine.svc/REST/PUNCTUALSEARCHLISTING/${texto}/${lat}/${lng}/80/${page}/10/2/1/IPHONEADSA/bEJjb0hvK1U2Vm1uaHQyVE5wMkdDSkY5cE11RiszSlI=`
      )
      .subscribe(
        resp => {
          resp = resp.json();
          //Promise.all([this.http.setSSLCertMode ('nocheck'),this.http.get('`http://wsse.seccionamarilla.com/SearchEngine.svc/REST/PUNCTUALSEARCHLISTING/${texto}/${lat}/${lng}/80/${page}/10/2/1/IPHONEADSA/bEJjb0hvK1U2Vm1uaHQyVE5wMkdDSkY5cE11RiszSlI=`',{},{})])
          //.then((data) => {
          //let resp = data[1].data;
          if (
            Object.keys(resp).length > 0 &&
            resp.hasOwnProperty("ListRes") &&
            resp.hasOwnProperty("totalPages")
          ) {
            let total = parseInt(resp["totalPages"]);
            this.info.total = total;
            let datos = resp["ListRes"];
            //console.log(datos);

            if (this.info.page == 1) {
              this.info.list = this.formatNeg2Coords(datos);
              load.dismiss();
            } else {
              this.info.list = this.info.list.concat(
                this.formatNeg2Coords(datos)
              );
              ev.complete();
            }
            //console.log(this.info.list);
          }

          if (page == 1 && this.info.list.length == 0) {
            this.msg =
              "No encontramos ningún negocio referente a tu búsqueda: " +
              this.info.search;
            this.resultados = false;
            load.dismiss();
          }
          //load.dismiss();
          obs.unsubscribe();
        },
        err => {
          this.msg =
            "No se tiene acceso a internet :(" /*+JSON.stringify(err)*/;
          this.resultados = false;
          load.dismiss();
        }
      );
  }

  getNegocios2(texto, page, ev) {
    this.resultados = true;
    let body = {
      motorIp: "172.18.1.122:5110",
      systemName: "MexMainSystem",
      action: "search",
      what: texto,
      searchType: "exact",
      pageNumber: page,
      results: 10,
      format: 0
    };

    let load;

    if (page == 1) {
      load = this.loadingCtrl.create({
        content: "Cargando..."
      });

      load.present();
    }

    let body2 = JSON.stringify(body);
    let obs = this.http2
      .post(
        `https://wsseo.seccionamarilla.com.mx/Service.svc/REST/ListingsNormal`,
        body2
      )
      .subscribe(
        resp => {
          //resp = resp.json()
          //console.log(resp.json())
          let data = resp.json();
          if (
            Object.keys(data).length > 0 &&
            data.hasOwnProperty("AMResults") &&
            data["AMResults"].hasOwnProperty("AMResult")
          ) {
            let datos = data["AMResults"]["AMResult"]["Listings"]["ListRes"];
            //console.log(datos);
            if (this.info.page == 1) {
              let num =
                parseInt(
                  data["AMResults"]["AMResult"]["Listings"]["@totalResultsNum"]
                ) / 10;
              let total = Math.trunc(num);
              this.info.total = total;
              this.info.list = this.formatNeg2(datos);
              load.dismiss();
            } else {
              this.info.list = this.info.list.concat(this.formatNeg2(datos));
              ev.complete();
            }
            //console.log(this.info.list);
          }

          if (page == 1 && this.info.list.length == 0) {
            this.resultados = false;
            load.dismiss();
          }

          obs.unsubscribe();
        },
        err => {
          this.msg =
            "No se tiene acceso a internet :(" /*+JSON.stringify(err)*/;
          this.resultados = false;
          load.dismiss();
        }
      );
  }

  getNegociosSE(texto, page) {
    let body = {};

    return new Promise((resolve, reject) => {
      if (this.info.coords.lat && this.info.coords.lng) {
        let lat, lng;
        lat = this.info.coords.lat.toString();
        lng = this.info.coords.lng.toString();
        /*body = {
                "motorIp":"172.18.1.122:5110",
                "systemName":"MexGeoSingleBoxSystem",
                "searchTerms":"hoteles en df",
                "lat": lat,
                "lon": lng,
                "radius":12,
                "pageNumber":page,
                "results":10,
                "format":0
            }
    
            let body2 = JSON.stringify(body);*/

        let obs = this.http2
          .get(
            `http://wsse.seccionamarilla.com/SearchEngine.svc/REST/PUNCTUALSEARCHLISTING/${texto}/${lat}/${lng}/80/${page}/10/2/1/IPHONEADSA/bEJjb0hvK1U2Vm1uaHQyVE5wMkdDSkY5cE11RiszSlI=`
          )
          .subscribe(resp => {
            resp = resp.json();
            if (
              Object.keys(resp).length > 0 &&
              resp.hasOwnProperty("ListRes") &&
              resp.hasOwnProperty("totalPages")
            ) {
              let total = parseInt(resp["totalPages"]);
              this.info.total = total;
              let datos = resp["ListRes"];
              console.log(datos);
              //this.info.list = this.formatNeg2Coords(datos);
              if (this.info.page == 1) {
                //loading.dismiss();
                this.info.list = this.formatNeg2Coords(datos);
              } else
                this.info.list = this.info.list.concat(
                  this.formatNeg2Coords(datos)
                );
              console.log(this.info.list);
            }
            obs.unsubscribe();
          });

        /*this.http.get(`http://wsse.seccionamarilla.com/SearchEngine.svc/REST/PUNCTUALSEARCHLISTING/${texto}/${lat}/${lng}/80/${page}/10/2/1/IPHONEADSA/bEJjb0hvK1U2Vm1uaHQyVE5wMkdDSkY5cE11RiszSlI=`,{},{})
            .then((resp) => {
                //this.dataAll = 'Exito: '+JSON.stringify(resp);
                let data = JSON.parse(resp.data);
                if(Object.keys(data).length > 0 && data.hasOwnProperty('ListRes') && data.hasOwnProperty('totalPages')) {
                    let total = parseInt(data['totalPages']);
                    this.info.total = total;
                    let datos = data['ListRes']
                    console.log(datos);
                    //this.info.list = this.formatNeg2Coords(datos);
                    if(this.info.page == 1) {
                        //loading.dismiss();
                        this.info.list = this.formatNeg2Coords(datos);
                    }
                    else this.info.list = this.info.list.concat(this.formatNeg2Coords(datos))
                    console.log(this.info.list);
                    resolve();
    
                }
                else {
                    resolve();
                }
            })
            .catch((err) => {
                console.log(err);
                //this.dataAll = 'Error: '+JSON.stringify(err);
                resolve();
            })*/
      } else {
        body = {
          motorIp: "172.18.1.122:5110",
          systemName: "MexMainSystem",
          action: "search",
          what: texto,
          searchType: "exact",
          pageNumber: page,
          results: 10,
          format: 0
        };

        let body2 = JSON.stringify(body);
        let obs = this.http2
          .post(
            `https://wsseo.seccionamarilla.com.mx/Service.svc/REST/ListingsNormal`,
            body2
          )
          .subscribe(resp => {
            //resp = resp.json()
            //console.log(resp.json())
            let data = resp.json();
            if (
              Object.keys(data).length > 0 &&
              data.hasOwnProperty("AMResults") &&
              data["AMResults"].hasOwnProperty("AMResult")
            ) {
              let datos = data["AMResults"]["AMResult"]["Listings"]["ListRes"];
              //console.log(datos);
              if (this.info.page == 1) {
                //loading.dismiss();
                let num =
                  parseInt(
                    data["AMResults"]["AMResult"]["Listings"][
                      "@totalResultsNum"
                    ]
                  ) / 10;
                let total = Math.trunc(num);
                this.info.total = total;
                this.info.list = this.formatNeg2(datos);
              } else
                this.info.list = this.info.list.concat(this.formatNeg2(datos));
              //console.log(this.info.list);
            } else {
            }
            obs.unsubscribe();
            resolve();
          });
        /*this.http.post('https://wsseo.seccionamarilla.com.mx/Service.svc/REST/ListingsNormal',body2,{}).then((resp) => {
                let data = JSON.parse(resp.data);
                if(Object.keys(data).length > 0 && data.hasOwnProperty('AMResults') && data['AMResults'].hasOwnProperty('AMResult')) {
                    let datos = data['AMResult']['AMResult']['Listings']['ListRes'];
                    console.log(datos);
                    if(this.info.page == 1) {
                        //loading.dismiss();
                        this.info.list = this.formatNeg2(datos);
                    }
                    else this.info.list = this.info.list.concat(this.formatNeg2(datos))
                    //console.log(this.info.list);
                    resolve();
    
                }
                else {
                    resolve();
                }
            }).catch((err) => {
                console.log(err);
                resolve();
            })*/
      }
    });
  }

  formatNeg2Coords(arreglo) {
    let arr = [];

    for (let op of arreglo) {
      let result = op;

      let name = null;
      if (result["bn"]) {
        name = result["bn"];
      }

      let ctg = null;
      if (result["categoryname"]) {
        ctg = result["categoryname"];
      }

      let address = "";
      if (
        result["fullstreet"] ||
        result["colony"] ||
        result["physicalcity"] ||
        result["statename"] ||
        result["zip"]
      ) {
        if (result["fullstreet"] && result["fullstreet"] !== null) address = result["fullstreet"];
        if (result["colony"]) address += ", " + result["colony"];
        if (result["physicalcity"]) address += ", " + result["physicalcity"];
        if (result["statename"]) address += ", " + result["statename"];
        if (result["zip"]) address += ", CP. " + result["zip"];
      }
      if (address.charAt(0) === ','){
          address = address.replace(',','');
          address = address.trim();
      }
      let logo = null;
      let urlGrafico = "https://graficos.seccionamarilla.com.mx";
      if (result["llg"]) {
        logo = urlGrafico + result["llg"];
      }

      let sitio = null;
      if (result["url"]) {
        sitio = result["url"];
      }

      let email = null;
      if (result["lke"]) {
        email = result["lke"];
      }

      let phone = null;
      let phones = [];
      if (result["phones"]) {
        let arr2 = [];
        for (let op of result["phones"]) {
          arr2.push(op.number);
        }

        if (arr2.length > 0) {
          phones = arr2;
          phone = phones[0];
        }
      }

      let lat = null;
      let lng = null;
      if (result["lat"] && result["lon"]) {
        lat = parseFloat(result["lat"]);
        lng = parseFloat(result["lon"]);
      }

      let dist = null;

      let hrs = null;
      if (result["txtschedule"]) {
        let arr2 = [];
        for (let op of result["txtschedule"]) {
          arr2.push(op.text);
        }

        if (arr2.length > 0) {
          hrs = arr2.join(", ");
        }
      }

      let payment = null;
      if (result["paymenttype"]) {
        let arr2 = [];
        for (let op of result["paymenttype"]) {
          arr2.push(op.text);
        }

        if (arr2.length > 0) {
          payment = arr2.join(", ");
        }
      }

      let pys = null;
      if (result["productservices"]) {
        let arr2 = [];
        for (let op of result["productservices"]) {
          arr2.push(op.service);
        }

        if (arr2.length > 0) {
          pys = arr2.join(", ");
        }
      }

      arr.push({
        name,
        address,
        phone,
        hrs,
        payment,
        pys,
        logo,
        lat,
        lng,
        ctg,
        sitio,
        phones,
        dist,
        email
      });
    }

    return arr;
  }

  formatNeg2(arreglo) {
    let arr = [];

    for (let op of arreglo) {
      let result = op["Result"];

      let name = null;
      if (result["bn"]) {
        name = result["bn"];
      }

      let ctg = null;
      if (result["categoryname"]) {
        ctg = result["categoryname"];
      }

      let address = null;
      if (
        result["fullstreetresult"] ||
        result["folonyresult"] ||
        result["city"] ||
        result["state"] ||
        result["zipresult"]
      ) {
        if (result["fullstreetresult"]) address = result["fullstreetresult"];
        if (result["colonyresult"]) address += ", " + result["colonyresult"];
        if (result["city"]) address += ", " + result["city"];
        if (result["state"]) address += ", " + result["state"];
        if (result["zipresult"]) address += ", CP. " + result["zipresult"];
      }

      let logo = null;
      let urlGrafico = "https://graficos.seccionamarilla.com.mx";
      if (result["llg"]) {
        logo = urlGrafico + result["llg"];
      }

      let sitio = null;
      if (result["url"]) {
        sitio = result["url"];
      }

      let email = null;
      if (result["lke"]) {
        email = result["lke"];
      }

      let phone = null;
      if (result["phone"]) {
        phone = result["phone"];
      }

      let phones = [];
      if (result["tel"]) {
        phones = result["tel"];
      }

      let lat = null;
      let lng = null;
      if (result["lat"] && result["lon"]) {
        lat = parseFloat(result["lat"]);
        lng = parseFloat(result["lon"]);
      }

      let dist = null;
      let hrs = null;
      let payment = null;
      let pys = null;

      arr.push({
        name,
        address,
        phone,
        hrs,
        payment,
        pys,
        logo,
        lat,
        lng,
        ctg,
        sitio,
        phones,
        dist,
        email
      });
    }

    return arr;
  }
}
