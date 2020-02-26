import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  _segment = '_one';

  _d = null;
  _radius = null;
  _Tangle = null;
  _Trise = null;
  _Tnum = null;

  _BendingRadius = 0;
  _BarLength = 0;
  _BalustradeAngle = 0;
  _A = 0;

  constructor(
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this._d = JSON.parse(localStorage.getItem('spiralStairs._d'));
    this._radius = JSON.parse(localStorage.getItem('spiralStairs._radius'));
    this._Tangle = JSON.parse(localStorage.getItem('spiralStairs._Tangle'));
    this._Trise = JSON.parse(localStorage.getItem('spiralStairs._Trise'));
    this._Tnum = JSON.parse(localStorage.getItem('spiralStairs._Tnum'));

    this.onCalculateData();
  }

  async presentModal() {
    const popover = await this.modalController.create({
      component: InfoComponent
    });
    return await popover.present();
  }

  onOpenInfo() {
    this.presentModal();
  }

  onCalculateData(){

    const d = parseFloat(this._d);
    const R = parseFloat(this._radius);
    const Ta = parseFloat(this._Tangle);
    const rise = parseFloat(this._Trise);

    let Tnum: number;

    if (parseInt(this._Tnum) < 1) {
      Tnum = 1;
    } else {
      Tnum = parseInt(this._Tnum);
    }

    let c = 2 * Math.PI * R;
    let h = rise * 360 / Ta;
    //let length = Math.sqrt(c * c + h * h);
    let x = 4 * Math.PI * Math.PI * R * R + h * h;
    let y = 4 * Math.PI * Math.PI * R;
    let handrailRadius = x / y;

    let circumferenceCenterBar = 2 * Math.PI * (R + d/2);
    let c_tread = circumferenceCenterBar / 360 * Ta;
    let A = c_tread * Tnum;

    let tgRad = Math.atan(rise/c_tread);
    let tAngle = tgRad * 180 / Math.PI;
    let balustradeAngle = 90 - tAngle;

    //Check bar length
    let cc = Math.sqrt(c_tread * c_tread + rise * rise);
    let B = cc * Tnum;

    if(d && R && Ta && rise) {
      this._BendingRadius = Number(handrailRadius.toFixed(1));
      this._BarLength = Number(B.toFixed(0));
      this._BalustradeAngle = Number(balustradeAngle.toFixed(1));
      this._A = Number(A.toFixed(0));

      localStorage.setItem('spiralStairs._d', JSON.stringify(this._d));
      localStorage.setItem('spiralStairs._radius', JSON.stringify(this._radius));
      localStorage.setItem('spiralStairs._Tangle', JSON.stringify(this._Tangle));
      localStorage.setItem('spiralStairs._Trise', JSON.stringify(this._Trise));
      localStorage.setItem('spiralStairs._Tnum', JSON.stringify(this._Tnum));
    } else {
      this._BendingRadius = 0;
      this._BarLength = 0;
      this._BalustradeAngle = 0;
      this._A = 0;
    }

  }

}
