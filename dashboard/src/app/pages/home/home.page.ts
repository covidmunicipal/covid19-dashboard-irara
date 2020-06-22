import { Component, OnInit } from '@angular/core';
import { RtdbDataService } from '../../services/rtdb-data.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  targetLocation = environment.targetLocation;

  constructor(public rtdbData: RtdbDataService) {

  }

  ngOnInit() {

  }

}
