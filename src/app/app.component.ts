import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChalkboardComponent } from './chalkboard/chalkboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChalkboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'remote-chalkboard';
}
