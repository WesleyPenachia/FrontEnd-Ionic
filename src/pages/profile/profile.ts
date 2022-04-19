import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;
  picture : string;
  cameraOn : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService : ClienteService,
    private camera : Camera) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(Response => {
        this.cliente = Response as ClienteDTO;
        this.getImageifExists();
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      })
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageifExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(Response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

  getCameraPicture(){

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
  }
}
