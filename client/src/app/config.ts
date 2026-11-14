import { isDevMode } from '@angular/core';

export const API_URL = isDevMode()
    ? 'http://localhost:3000'
    : 'https://prodify-woad-chi.vercel.app';