import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../model/room';
import { MetaService, defaultKeyWords, defaultImageURL, defaultTitle, defaultSubTitle } from '../meta.service';
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
    private metaService: MetaService,
    private titleService: Title,
    private router: Router,
  ) {
    this.route.data.subscribe((data) => {
      if (data.room) {
        this.room = data.room;
        this.titleService.setTitle(defaultTitle + ' - ' + this.room.name);
        this.metaService.setBase({
          description: defaultTitle + '|' + defaultSubTitle + '|' + this.room.name + '|' + this.room.description,
          keywords: defaultKeyWords.concat(this.room.name).join(','),
        });
        this.metaService.setOG({
          title: defaultTitle + '|' + this.room.name,
          image: defaultImageURL,
          url: `${location.href}`,
          description: this.room.description,
          type: 'website',
          locale: 'ja_jp',
          site_name: this.room.name,
        });
        this.metaService.setTwitter({
          card: 'summary',
          title: defaultTitle + '|' + this.room.name,
          image: defaultImageURL,
          url: `${location.href}`,
          description: this.room.description,
        });
      }
    });
  }

  ngOnInit() {
  }

  public enterRoom(): void {
    this.router.navigate(['room', this.room.id]);
  }

}
