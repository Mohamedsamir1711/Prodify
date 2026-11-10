import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Navbar, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = {email: '', password: ''};

  constructor(private _auth: Auth, private router: Router, private toast: ToastrService) {}
  
  login() {
    console.log(this.user);
  }

  submit(form:any) {
    console.log(form.value);

    try {
      if (form.valid) {
      this._auth.login(form.value).subscribe({
      next: (res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      form.reset();
      this.toast.success('Login successful');
      setTimeout(() => {
        this.router.navigate(['']);
      }, 2000);
    }});
  }
    } catch (error) {
      this.toast.error('Login failed, try again');
    }

  }
}
