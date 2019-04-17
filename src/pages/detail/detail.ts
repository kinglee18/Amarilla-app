import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { EmailComposer } from "@ionic-native/email-composer";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: "page-detail",
  templateUrl: "detail.html"
})
export class DetailPage {
  negocio;
  coords: object = {};

  urlIcon = {
    url: "./assets/imgs/ico_seccion.png",
    scaledSize: {
      width: 41,
      height: 56
    }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    private iab: InAppBrowser
  ) {
    this.negocio = this.navParams.get("negocio");
    this.coords = this.navParams.get("coords");
  }

  actionCall(tel) {
    this.callNumber
      .callNumber(tel, true)
      .then(res => console.info("Launched dialer!", res))
      .catch(err => console.error("Error launching dialer", err));
  }

  actionEmail(correo) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
      }
    });

    let email = {
      to: correo,
      subject: "Sección Amarilla APP - Cliente",
      body: "Hola, necesito mas información sobre sus servicios?",
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  actionSitio(sitio) {
    const browser = this.iab.create(sitio);
    browser.show();
  }

  actionMap(lat, lng, name, address) {
    this.navCtrl.push("MapaPage", {
      lat,
      lng,
      name,
      address,
      coords: this.coords
    });
  }
}
