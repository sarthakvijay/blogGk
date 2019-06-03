import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counselling',
  templateUrl: './counselling.component.html',
  styleUrls: ['./counselling.component.css']
})
export class CounsellingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  mainsRankCalculator() {
    this.router.navigate(['/jeeMainsCounselling']);
  }

  mainsBranchCalculator() {
    this.router.navigate(['/jeeMainsCounselling']);

  }
}
