import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Room } from '../model/room';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input()
  public room: Room;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(
  ) {
    this.route.params.subscribe((params: Params) => {
      this.room = this.dataService.getRoomRaw(params.roomId);
    });
  }

}
