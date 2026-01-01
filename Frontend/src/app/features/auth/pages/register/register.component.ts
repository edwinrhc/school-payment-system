import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  role = 'user';

  loading = false;
  error = '';
  success = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit(){
    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    }).subscribe({
       next: () => {
         this.success = 'Usuario registrado correctamente';
         this.loading = false;

         //
         setTimeout(()=> {
           this.router.navigate(['/login']);
         }, 1500);
       },
      error: (err) => {
         this.error = err?.error?.message || 'Error al registrar usuario';
         this.loading = false;
      }
    });
  }


}
