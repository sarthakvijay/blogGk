import { Component, OnInit } from '@angular/core';
import { AddBlogComponent } from './../../components/add-blog/add-blog.component';
@Component({
  selector: 'app-tag-buttons',
  templateUrl: './tag-buttons.component.html',
  styleUrls: ['./tag-buttons.component.css']
})
export class TagButtonsComponent implements OnInit {

  constructor(private addBlogComponent: AddBlogComponent) { }

  ngOnInit() {
  }

  insertAtCursorA(tagStr) {
    this.addBlogComponent.insertAtCursor(tagStr);
  }

}
