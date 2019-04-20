import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../model/room';
import { defaultTitle } from '../meta.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-init-room',
  templateUrl: './init-room.component.html',
  styleUrls: ['./init-room.component.scss']
})
export class InitRoomComponent implements OnInit {

  public room: Room;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
  ) {
    this.route.data.subscribe((data) => {
      if (data.room) {
        this.room = data.room;
        this.titleService.setTitle(defaultTitle + ' - ' + this.room.name);
      }
    });
  }

  ngOnInit() {
  }

  public enterRoom(): void {
    this.router.navigate(['room', this.room.id]);
  }

}
