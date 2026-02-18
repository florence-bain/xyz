import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './images/image-carousel.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageCarouselComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly passwordHash =
    '7f2cc2d8db905052b35620b7b081495960bc6193f2ccad1ad031398393205ed0';
  isAuthenticated = false;
  passwordInput = '';
  wrongPassword = false;

  async checkPassword(): Promise<void> {
    const hash = await this.hashPassword(this.passwordInput);
    if (hash === this.passwordHash) {
      this.isAuthenticated = true;
      sessionStorage.setItem('authenticated', 'true');
    } else {
      this.wrongPassword = true;
    }
  }

  ngOnInit() {
    this.isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}
