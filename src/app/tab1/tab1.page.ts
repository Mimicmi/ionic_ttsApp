import { Component } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  locale = "fr-FR";
  rate = 2;

  constructor(private tts: TextToSpeech,
    private clipboard: Clipboard,
    private storage: Storage
  ) { }

  text2Speech: string;

  speak() {
    this.tts.speak({
      text: this.text2Speech,
      locale: this.locale,
      rate: this.rate
    })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log('TTS ERROR', reason));
  }

  paste() {
    this.clipboard.paste().then(
      (text: string) => {
        this.text2Speech = this.text2Speech ? this.text2Speech + '\n' + text : text;
      },
      (reject: string) => {
        console.log('Clipboard Error: ' + reject);
      }
    );
  }
  clear() {
    this.text2Speech = "";
  }
  stopSpeaking() {
    this.tts.speak('').then(() => console.log("Success")).catch((reason: any) => console.log(reason));
  }

  ionViewWillEnter() {
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
