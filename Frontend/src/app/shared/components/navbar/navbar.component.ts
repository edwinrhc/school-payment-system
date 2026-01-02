import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user: any;

  isAdmin = false;
  isSupport = false;
  isParent = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user);
    this.isAdmin = this.user?.role === 'ADMIN';
    this.isSupport = this.user?.role === 'USER';
    this.isParent = this.user?.role === 'PARENT';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
