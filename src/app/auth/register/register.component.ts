import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern } from 'app/core/patterns';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSubmitted = false;
  registerForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }


  // Easier access to form fields as we are using reactiveForm
  get controls() { return this.registerForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.auth.register(this.registerForm.value).subscribe(
      next => {
        this.router.navigate(['/auth/login']);
      },
      err => {

      }
    )
  }

  goToLogin() {
    this.router.navigate(['/auth/login'])
  }

}
