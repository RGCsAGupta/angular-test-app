import { Component } from '@angular/core';
import { lorem } from 'faker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  fakeParagraph: string = lorem.words(500);
}
