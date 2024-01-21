import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email: ['luis10@test.com', [Validators.required, Validators.email]],
    password: [
      '123456All',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        ),
      ],
    ],
  });

  public myError = (controlName: string, errorName: string) => {
    return (
      this.myForm.controls[controlName].hasError(errorName) &&
      this.myForm.controls[controlName].dirty
    );
  };

  login() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      this.myForm.markAsDirty();
      return;
    }
    const { email, password } = this.myForm.value;

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (message) => {
        console.log(message);
      },
    });
  }
}
