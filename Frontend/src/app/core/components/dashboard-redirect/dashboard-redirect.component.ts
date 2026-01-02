import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../features/auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-redirect',
  standalone: true,
  templateUrl: './dashboard-redirect.component.html',
  styleUrl: './dashboard-redirect.component.css'
})
export class DashboardRedirectComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (user.role === 'USER') {
      this.router.navigate(['/support']);
    } else {
      this.router.navigate(['/parent']);
    }
  }

}
