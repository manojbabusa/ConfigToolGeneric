import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/shared/services/test.apiMethods';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor(private testService:TestService) { }
  getItems: any[];

  ngOnInit() {
  }

  getItemsGET() {
    this.testService.getItems().subscribe((data => {
      this.getItems = data;
    }
    )
    );
  }

}
