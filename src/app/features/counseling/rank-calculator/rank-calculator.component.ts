import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../../services/blog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rank-calculator',
  templateUrl: './rank-calculator.component.html',
  styleUrls: ['./rank-calculator.component.css']
})
export class RankCalculatorComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  branchesAvailable: any;
  josaaInstituteNames: any;
  josaaIitInstituteNames: any;
  rankForm: FormGroup;
  rankArrayForm: FormGroup;
  rankAdvanceArrayForm: FormGroup;
  rankRange: any;
  rankArray: any;
  p: any;
  k: any;

  ngOnInit() {
    if (!localStorage.getItem('JosaaInstituteNames')) {
      this.getJosaaInstituteNames();
    }
    if (!localStorage.getItem('JosaaIitInstituteNames')) {
      this.getJosaaIitInstituteNames();
    }
    this.josaaInstituteNames = JSON.parse(localStorage.getItem('JosaaInstituteNames'));
    this.josaaIitInstituteNames = JSON.parse(localStorage.getItem('JosaaIitInstituteNames'));
    this.rankArray = '';
    this.rankForm = new FormGroup({
      applicationNumber: new FormControl(''),
      // dateOfBirth: new FormControl('', Validators.required),
      percentileScore: new FormControl('', [Validators.required,
      Validators.pattern('^100(\.[0]{1,2})?|([0-9]|[1-9][0-9])(\.[0-9]{1,2})?$')]),
      category: new FormControl('Gen', Validators.required),
      passingYear: new FormControl('2018', Validators.required)
    });

    this.rankArrayForm = new FormGroup({
      lowerRank: new FormControl('', Validators.required),
      higherRank: new FormControl('', Validators.required),
      gender: new FormControl('Gender-Neutral', Validators.required),
      category: new FormControl('OPEN', Validators.required),
      institute: new FormControl('*', Validators.required),
      quote: new FormControl('AI', Validators.required)
    });

    this.rankAdvanceArrayForm = new FormGroup({
      lowerRank: new FormControl('', Validators.required),
      higherRank: new FormControl(''),
      gender: new FormControl('Gender-Neutral', Validators.required),
      category: new FormControl('OPEN', Validators.required),
      institute: new FormControl('*', Validators.required),
      quote: new FormControl('AI', Validators.required)
    });
  }

  rankCalcultorMains() {
    this.blogService.validateForm(this.rankForm);
    if (this.rankForm.valid) {
      const percentile = this.rankForm.value.percentileScore;
      const category = this.rankForm.value.category;
      let rankbetter = Math.round((100 - percentile) * 9889.86) + 1;
      let rankbitter = Math.round((100 - percentile) * 11157.41) + 1;
      if (category !== 'Gen') {
        const categoryRank = this.categoryRankcalculatorMains(percentile, category);
        console.log(categoryRank);
      }
      if (rankbetter > rankbitter) {
        const rank = rankbetter;
        rankbetter = rankbitter;
        rankbitter = rank;
      }
      this.rankRange = { 'lowerRank': rankbetter, 'higherRank': rankbitter };
      this.rankArray = 'As per data given above. Your predicted Rank would be in Range '
        + this.rankRange.lowerRank + ' - ' + this.rankRange.higherRank;
      this.rankArrayForm.patchValue(this.rankRange);
    }
  }

  branchAvailableMains() {
    this.blogService.validateForm(this.rankArrayForm);
    if (this.rankArrayForm.valid) {
      this.blogService.branchesAvailableMains(this.rankArrayForm.value).subscribe(
        result => {
          this.branchesAvailable = result;
        },
        error => {
          console.log('Branches are not avaialble for the above percentile score');
        }
      );
    }
  }

  branchAvailableAdvance() {
    this.blogService.validateForm(this.rankAdvanceArrayForm);
    if (this.rankAdvanceArrayForm.valid) {
      this.blogService.branchesAvailableAdvance(this.rankAdvanceArrayForm.value).subscribe(
        result => {
          this.branchesAvailable = result;
        },
        error => {
          console.log('Branches are not avaialble for the above percentile score');
        }
      );
    }
  }

  categoryRankcalculatorMains(percentile, category) {
    let categoryCandidates = {
      'SC': 89000, 'OBC': 367000,
      'ST': 36000, 'PWD': 12, 'OBCPWD': 12, 'STPWD': 87, 'SCPWD': 18
    };
    category = JSON.parse(category);
    categoryCandidates = JSON.parse(JSON.stringify((categoryCandidates)));
    return Math.round((100 - percentile) * categoryCandidates[category] / 100) + 1;
  }

  getJosaaInstituteNames() {
    this.blogService.getJosaaInstituteNames().subscribe(
      result => {
        this.josaaInstituteNames = result;
        localStorage.setItem('JosaaInstituteNames', JSON.stringify(this.josaaInstituteNames));
      }, error => {
        console.log('institute names not availabel');
      }
    );
  }

  getJosaaIitInstituteNames() {
    this.blogService.getJosaaIitInstituteNames().subscribe(
      result => {
        this.josaaIitInstituteNames = result;
        localStorage.setItem('JosaaIitInstituteNames', JSON.stringify(this.josaaIitInstituteNames));
      }, error => {
        console.log('Iit Institute names not availabel');
      }
    );
  }

}

