import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';

import * as Enums from '../../assets/apiconfig';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  l:any;
  userid = this.navParams.get('userid');

  answersGet: Array<{answeredby : string,teacher: number,content:string,upvote:number,downvote:number,answeredbyname:string}>;

  answers: Array<{answeredby : string,teacher: number,content:string,upvote:number,downvote:number,answeredbyname:string}>;
  


  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public http:Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.answersGet=navParams.get('answer');
    
    this.l=this.answersGet.length
    console.log(this.answersGet[1]);

    this.answers=[];
    for(let i = 0; i < this.l; i++) {

      this.answers.push({
        answeredby : this.answersGet[i].answeredby,
        teacher: this.answersGet[i].teacher,
        content: this.answersGet[i].content,
        upvote : this.answersGet[i].upvote,
        downvote: this.answersGet[i].downvote,
        answeredbyname:this.answersGet[i].answeredbyname
 
      });
    }
  }

  upvote(item){

    item.upvote=item.upvote+1;

    console.log(item.upvote)
  }
  downvote(item){

    item.downvote=item.downvote+1;

    console.log(item.upvote)
  }
  
  answer(){
    let self=this
    let alert = this.alertCtrl.create({
      title: 'ANSWER',
      message:'Enter an answer',
      inputs: [
        {
          name: 'answer',
          placeholder: 'answer'
        }
       
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          
        },
        {
          text: 'Submit',
          handler: data => {
            console.log(data);
            let postParams = {answered_by : this.userid,content:data,teacher:0,QID:this.selectedItem.qid}
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

        let url = Enums.APIURL.URL1;
        let path = url.concat( "/qa/answer");
        console.log(postParams);
       

        this.http.post(path, postParams, {headers: headers})
          .subscribe(res => {
            data=res.json()
            console.log(data)
            //this.token = data.token;
            //this.storage.set('token', data.token);
            //resolve(data);
            self.answers.push({
              answeredby : self.userid,
              teacher : 0,
              content : postParams['content'],
              upvote : 0,
              downvote: 0,
              answeredbyname: data['name']
              });
        


          }, (err) => {
            console.log(err);
            //reject(err);
          });
          //this.navCtrl.push(ItemDetailsPage,{item:this.selectedItem,answer:this.answers,userid:this.userid});
          }
        }
      ]
    });
    alert.present();
  }

}

