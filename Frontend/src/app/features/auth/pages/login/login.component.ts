import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  // Usamos FormsModule, luego usarmos Reactive Forms
  submit() {
    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // this.router.navigate(['/']);
        const user = this.authService.getUser();

        if(user.role === 'ADMIN'){
          this.router.navigate(['/admin']);
        } else{
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.error = 'Credenciales inválidas';
        this.loading = false;
      }
    });
  }


}
