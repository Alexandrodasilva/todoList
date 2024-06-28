import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-font-weight-resizer-directive',
  standalone: true,
  imports: [CommonModule],
  template: `<h2 fontWeightResizer="bold">Test Directive</h2>`
})
export class TestFontWeightResizerDirectiveComponent {

}
