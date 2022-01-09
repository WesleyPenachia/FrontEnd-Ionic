import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
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


  bucketUrl: String = API_CONFIG.bucketBaseUrl
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService : CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(Response => {
        this.items = Response;
      },
      error =>{
        console.log(error);
      })
  }
}
