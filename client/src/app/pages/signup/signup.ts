import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [Navbar, Footer, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

    user = {username: '', email: '', password: '', confirmPassword: ''};


    constructor(private _auth: Auth, private router: Router, private toast: ToastrService) {}


    submit(form:any) {
    console.log(form.value);

    try {
      if (form.valid) {
      this._auth.signup(form.value).subscribe({
      next: (res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      form.reset();
      this.toast.success('Signup successful');
      setTimeout(() => {
        this.router.navigate(['']);
      }, 2000);
    }});
  }
    } catch (error) {
      this.toast.error('Signup failed, try again');
    }

  }
}
