import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EasyAgent } from '../model/agent';
import { Title } from '@angular/platform-browser';
import { defaultTitle, defaultSubTitle } from '../meta.service';

@Component({
  selector: 'app-init-agent',
  templateUrl: './init-agent.component.html',
  styleUrls: ['./init-agent.component.scss']
})
export class InitAgentComponent implements OnInit {

  public agent: EasyAgent;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    this.route.data.subscribe((data) => {
      if (data.agent) {
        this.agent = data.agent;
        this.titleService.setTitle(defaultTitle + ' - ' + this.agent.name);
      }
    });
  }

  ngOnInit() {
  }

  public begin(): void {
    window.location.href = '';
  }

}
