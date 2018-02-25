import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Item } from '../../models/item/item.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ToastService } from '../../services/toast/toast.service';

@IonicPage()
@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html',
})
export class AddShoppingItemPage {
  item: Item = {
    name: '',
    quantity: undefined,
    price: undefined
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private shopping: ShoppingListService, private toast: ToastService, 
  public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }

  addItem(item: Item) {
    this.shopping.addItem(item).then(ref => {
      this.presentLoading();
      setTimeout(() => {
        this.toast.show(`${item.name} added!`);
        this.navCtrl.setRoot('HomePage', {key: ref.key});
      }, 1000)
    });
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Adding Item...',
      duration: 1000

    });

    loading.present();
  }
}
