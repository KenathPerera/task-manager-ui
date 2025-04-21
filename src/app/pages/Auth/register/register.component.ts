import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: [['Admin']] // default role
    });
  }

  onSubmit() {
    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.message = 'Registered successfully! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000); // redirect after 2 seconds

      },
      error: err => this.message = err.error || 'Registration failed.'
    });
  }
}
