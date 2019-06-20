import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state/state.service';
import { lorem } from "faker";
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	fakeParagraph: string = lorem.words(500);
}
