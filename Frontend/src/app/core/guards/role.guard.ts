import {AuthService} from '../../features/auth/services/auth.service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';


export function roleGuard(expectedRole: 'ADMIN' | 'PARENT' | 'USER') {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.getUser();

    if (user?.role === expectedRole) {
      return true;
    }

    router.navigate(['/']);
    return false;
  };
}
