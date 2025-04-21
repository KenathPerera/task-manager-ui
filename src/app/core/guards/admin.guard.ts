import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getCurrentUser();
  console.log(user)
  if (user?.roles.includes('Admin')) {
    return true;
  }

  alert('Access denied. Admins only.');
  return false;
};
