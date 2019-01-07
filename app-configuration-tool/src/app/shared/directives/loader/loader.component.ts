import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loaderMessage: string = '';
  @Input() message: string;
  constructor() {
    this.loaderMessage = this.message;
  }

}
