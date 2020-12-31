import { Injectable } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate, public toastController: ToastController) {

    this.swUpdate.available.subscribe(event => {
      this.presentUpdateAvailableToast();
    });

    this.swUpdate.activated.subscribe(event => {
      this.presentUpdateActivatedToast();
    });
  }

  async presentUpdateAvailableToast() {
    const toast = await this.toastController.create({
      message: 'Uma atualização está disponível.',
      buttons: [
        {
          text: 'Atualizar',
          handler: () => {
            window.location.reload();
          }
        }
      ],
      duration: 10000
    });
    toast.present();
  }

  async presentUpdateActivatedToast() {
    const toast = await this.toastController.create({
      message: 'Seu aplicativo foi atualizado.',
      buttons: [
        {
          text: 'Dispensar',
          handler: () => {}
        }
      ],
      duration: 6000
    });
    toast.present();
  }


}
