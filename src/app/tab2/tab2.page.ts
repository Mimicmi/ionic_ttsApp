import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  locale = "fr-FR";
  rate = 2;

  constructor(private storage: Storage) { }

  saveLocale(event) {
    this.storage.set('locale', this.locale);
  }

  saveRate(event) {
    this.storage.set('rate', this.rate);
  }

  ionViewWillEnter() {
    console.log('Récup des données');
    this.storage.get('locale').then((val) => {
      console.log('Récup des réglages locale', val);
      this.locale = val ?? val;
    });
    this.storage.get('rate').then((val) => {
      console.log('Récup du rate', val);
      this.rate = val ?? val;
    });
  }
}
