import { Component, Input } from '@angular/core';

@Component({
  selector: 'ns-image-cache-view',
  templateUrl: './image-cache-view.component.html',
  styleUrls: ['./image-cache-view.component.css']
})
export class ImageCacheViewComponent {
   /** Accepts string or binary. */
   @Input('src') src: any;
   @Input('width') width: number = 0;
   @Input('height') height: number = 0;
   @Input('placeholder') placeHolder: string = '';
   @Input('stretch') stretch: string = 'none';
   @Input('errorHolder') errorHolder: string = '';
   @Input('fallback') fallback: string = '';
   @Input() styling: string = '';
}
