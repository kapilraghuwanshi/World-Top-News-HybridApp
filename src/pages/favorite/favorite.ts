import { Component } from '@angular/core';
import {
  NavController, Platform, ActionSheetController, NavParams, LoadingController, IonicPage
} from 'ionic-angular';
import { ArticlePage } from '../article/article';
import { AboutUsPage } from '../about_us/about_us';
//import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  public articleSet: any;
  public paperName: string;
  public articleAuthor: string;
  public articleImage: string;
  public articleTitle: string;
  public newsArticleSet = [];

  constructor(public navCtrl: NavController, public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public navParams: NavParams, public loadingCtrl: LoadingController) 
    {
    this.paperName = this.navParams.get('papername');
    console.log(this.paperName);
    this.articleSet = this.navParams.get('articleset');
    console.log(this.articleSet);
  }

  // method to show Loading..
  presentLoadingGif() {
    let loading = this.loadingCtrl.create({
      content: `
          <div>
           Just Near to youe  your fav article...
          </div>`,
      duration: 1500
    });
    loading.present();
  }

  // static method to log Out
  appLogout() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'My Profile',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'About Us',
          handler: () => {
            this.navCtrl.setRoot(AboutUsPage);
          }
        },
        {
          text: 'Logout',
          handler: () => {
            //this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    actionSheet.present();
  }

}
