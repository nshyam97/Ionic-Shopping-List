import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';
import { Item } from '../../models/item/item.model';
import { ToastService } from '../../services/toast/toast.service';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  item: Item;

  constructor(public navCtrl: NavController, private navParams: NavParams, private view: ViewController, private toast: ToastService, 
    private shopping: ShoppingListService, private loadingCtrl: LoadingController) {
  }

  ionViewWillLoad() {
    this.item = this.navParams.get('item');
  }

  closeModal() {
    this.view.dismiss();
  }

  saveItem() {
    this.shopping.editItem(this.item).then(() => {
      this.presentLoading();
      setTimeout(() => {
        this.toast.show(`${this.item.name} saved!`);
        this.navCtrl.setRoot('HomePage');
      }, 1000);
    });
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Updating...',
      duration: 1000
    });

    loading.present();
  }

}
