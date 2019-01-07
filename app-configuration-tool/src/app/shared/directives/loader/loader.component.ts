import { Component, Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnChanges {
  loaderMessage: string = '';
  @Input() message: string;
  constructor() {
    this.loaderMessage = this.message;
  }
  ngOnChanges() {
    this.loaderMessage = this.message;
  }
}
