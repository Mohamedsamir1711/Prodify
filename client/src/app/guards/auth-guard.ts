import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let platformId = inject(PLATFORM_ID);
  
  // Only check localStorage in browser environment
  if (isPlatformBrowser(platformId)) {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      router.navigate(['/auth/login']);
      return false;
    }
  }
  
  // On server, allow the request to proceed
  return true;
};
