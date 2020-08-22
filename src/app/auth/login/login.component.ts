import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { errorAnimation } from '../../core/animations/error_animation';
import { emailPattern } from '../../core/patterns';
import { AuthService } from '../auth.service';
import { devLog } from 'app/core/functions/development_logs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    errorAnimation
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  showError = false;
  isLoading = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required]]
    });
  }

  // Easier access to form fields as we are using reactiveForm
  get controls() { return this.loginForm.controls; }

  onSubmit() {
    devLog("Submitting form ");
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.controls.email.value, this.controls.password.value)
      .subscribe(
        next => {
          this.router.navigate(['ships'])
        },
        err => {
          devLog(err);
          this.errorMessage = err.error.message;
          this.isLoading = false;
          this.showHideError();
        }
      );
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  showHideError() {
    this.showError = true;
    setTimeout(() => this.showError = false, 3000);
  }
}
