import { Component, OnInit } from '@angular/core';
import { RoomsSearchOptionService } from './rooms-search-option.service';


@Component({
  selector: 'app-rooms-search-option',
  templateUrl: './rooms-search-option.component.html',
  styleUrls: ['./rooms-search-option.component.scss']
})
export class RoomsSearchOptionComponent implements OnInit {

  constructor(
    public opt: RoomsSearchOptionService,
  ) {
  }

  ngOnInit() {
  }

}
