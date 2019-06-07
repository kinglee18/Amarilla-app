export default class Business {
  bn: string;
  colony: string;
  desnetwork: string;
  fullstreet: string;
  highLights: string;
  lat: string;
  listadoid: string;
  listingtype: string;
  localflag: boolean;
  lon: string;
  paymenttypes: Array<Array<any>>;
  phones: string;
  physicalcity: string;
  physicalstate: string;
  productservices: Array<string>;
  statename: string;
  zip: string;
  llg: string;
  paopwo: string;
  txtschedule: Array<Array<any>>;
  private logoUrl: string = "https://graficos.seccionamarilla.com.mx";

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  get address() {
    let address = "";
    if (this.fullstreet && this.fullstreet !== null)
      address = this.capitalize(this.fullstreet);
    if (this.colony) address += ", " + this.capitalize(this.colony);
    if (this.physicalcity) address += ", " + this.capitalize(this.physicalcity);
    if (this.statename) address += ", " + this.capitalize(this.statename);
    if (this.zip) address += ", CP. " + this.zip;
    if (address.charAt(0) === ",") {
      address = address.replace(",", "");
      address = address.trim();
    }
    return address;
  }

  get services(): string | boolean {
    if (!this.productservices) return false;
    let s = this.productservices
      .map(item => {
        return item["service"];
      })
      .join(", ");
    return this.capitalize(s);
  }

  get phone(): Array<string> {
    return this.phones[0]["phone"];
  }

  get paymentTypeList(): Array<string> | boolean {
    if (this.paymenttypes) {
      return this.paymenttypes[0]["paymanttype"].map(item => {
        return item.text[0];
      });
    }
    return false;
  }

  get logo(): string {
    if (this.llg) return this.logoUrl + this.llg;
    return "https://s3.amazonaws.com/seccion/card.png";
  }

  get site() {
    return this.paopwo || this.logoUrl;
  }

  capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLocaleLowerCase();
  }

  get bussinessName() {
    return this.capitalize(this.bn);
  }

  get location(): object | boolean{
    if (this.lat && this.lat !== null) {
      return {
        lat: parseFloat(this.lat),
        lon: parseFloat(this.lon)
      };
    }
    return false;
  }
}
