import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  emailPattern = /\S+@\S+\.\S+/;
  authForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null, [Validators.pattern(this.emailPattern)]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false)
  });
  onSignIn = true;
  passwordType = true;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  togglePage(isSignIn: boolean) {
    this.onSignIn = isSignIn;
    if (!isSignIn) {
      this.authForm.controls["name"].setValidators([Validators.required]);
    } else {
      this.authForm.controls["name"].setValidators([]);
    }
    this.authForm.controls["name"].updateValueAndValidity();
  }

  actionButton() {
    const localRegUsers = localStorage.getItem('registeredUsers');
    const registeredUsers = localRegUsers ? JSON.parse(localRegUsers) : [];
    if (this.onSignIn) {
      const loggedInUser = registeredUsers ? (registeredUsers.filter((item: any) => item && item.email == this.authForm.value['email'] && item.password == this.authForm.value['password'])) : null;
      if (loggedInUser && loggedInUser.length) {
        console.log('logged in successfully');
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('rememberMe', JSON.stringify(this.authForm.value['rememberMe']));
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser[0]));
        this._router.navigate(['']);
      } else {
        console.log('user not found or invalid credentials');
      }
    } else {
      registeredUsers.push(this.authForm.value);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      this.togglePage(true);
    }
  }

}
