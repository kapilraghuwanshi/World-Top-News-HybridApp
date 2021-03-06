import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, Platform } from 'ionic-angular';
import { AboutUsPage } from '../about_us/about_us';
import { NewsPaperPage } from '../news-paper/news-paper';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

@IonicPage()
@Component({
  selector: 'page-choose-category',
  templateUrl: 'choose-category.html',
})
export class ChooseCategoryPage {

  public newsData: any;
  public newsArticles: any;
  public selectedCountryArg: any;
  public ArtsEntertainment_Image = "assets/image/ArtsEntertainment_News.jpg";
  public Business_Image = "assets/image/Business_News.jpg";
  public Health_Image = "assets/image/Health_News.jpg";
  public Science_Image = "assets/image/Science_News.jpg";
  public Sports_Image = "assets/image/Sports_News.jpg";
  public Technology_Image = "assets/image/Technology_News.jpg";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController,
    public ApiService: ApiServiceProvider, public platform: Platform, ) {
    this.presentLoadingGif();
    this.selectedCountryArg = this.navParams.get('selectedCountry');
    console.log('inside ChooseCategoryPage - ' + this.selectedCountryArg);
  }

  openCategory(categoryArg) {
    this.presentLoadingGif();
    console.log("Current categoryArg: " + categoryArg);
    let countryArg = this.selectedCountryArg;
    this.ApiService.getNewsDataByCategory(categoryArg, countryArg).then(data => {
      this.newsData = data;
      // console.log(this.newsData);
      this.newsArticles = this.newsData.articles;
      //console.log(this.newsArticles);
      this.navCtrl.push(NewsPaperPage, {
        categoryArg: categoryArg,
        newsArticles: this.newsArticles
      });
    })
  }

  // method to show Loading..
  presentLoadingGif() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: `
          <div>
           Getting close to your dearest category...
          </div>`,
      duration: 3500
    });
    loading.present();
  }

  // setting method -About us & exit app
  appLogout() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Settings',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'About Us',
          handler: () => {
            this.navCtrl.push(AboutUsPage);
          }
        },
        {
          text: 'Exit the App',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    actionSheet.present();
  }

}
