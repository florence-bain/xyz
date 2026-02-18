import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './images/image-carousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ImageCarouselComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    fetch('https://api.countapi.xyz/hit/florence-wesley/visits')
      .then((response) => response.json())
      .then((data) => {
        const element = document.getElementById('visits');
        if (element) element.innerText = data.value;
      });
  }
}
