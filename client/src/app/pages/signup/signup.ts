import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [Navbar, Footer, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  user = { username: '', email: '', password: '', confirmPassword: '' };

  private _auth = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastrService);

  submit(form: any): void {
    if (!form.valid) return;
    this._auth.signup(form.value).subscribe({
      next: (res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
        if (res?.data) {
          localStorage.setItem('prodify_user', JSON.stringify(res.data));
        }
        form.reset();
        this.toast.success('Account created! Welcome to Prodify.');
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1200);
      },
      error: (err: any) => {
        this.toast.error(
          err?.error?.message || 'Signup failed, please try again'
        );
      },
    });
  }
}
