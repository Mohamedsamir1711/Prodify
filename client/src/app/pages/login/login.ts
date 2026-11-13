import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, Navbar, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = { email: '', password: '' };

  private _auth = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastrService);

  submit(form: any): void {
    if (!form.valid) return;
    this._auth.login(form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        if (res.data) {
          localStorage.setItem('prodify_user', JSON.stringify(res.data));
        }
        form.reset();
        this.toast.success('Welcome back to Prodify');
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1200);
      },
      error: (err: any) => {
        this.toast.error(
          err?.error?.message || 'Login failed, check your credentials'
        );
      },
    });
  }
}
