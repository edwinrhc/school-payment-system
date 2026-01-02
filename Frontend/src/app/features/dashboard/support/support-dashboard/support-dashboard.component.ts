import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-support-dashboard',
  standalone: true,
  templateUrl: './support-dashboard.component.html',
  styleUrl: './support-dashboard.component.css'
})
export class SupportDashboardComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    }

}
