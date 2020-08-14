import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialogcontent',
  templateUrl: './dialogcontent.component.html',
  styleUrls: ['./dialogcontent.component.scss']
})
export class DialogcontentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToUsers() {
    this.router.navigateByUrl("/users");
  }

}
