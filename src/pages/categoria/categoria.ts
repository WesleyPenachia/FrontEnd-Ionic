import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService : CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(Response => {
        console.log(Response);
      },
      error =>{
        console.log(error);
      })
  }
}
