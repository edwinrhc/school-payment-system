import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
