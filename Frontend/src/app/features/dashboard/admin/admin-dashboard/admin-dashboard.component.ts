import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService,) {}

  ngOnInit(): void {
  this.user = this.authService.getUser();
  }




}
