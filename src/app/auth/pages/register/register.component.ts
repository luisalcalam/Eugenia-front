import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormUtils } from '../../../core/utils/form.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    secondSurname: [null],
    apartment: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
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
      this.registerForm.controls[controlName].hasError(errorName) &&
      this.registerForm.controls[controlName].dirty
    );
  };

  register() {
    if (this.registerForm.invalid) {
      FormUtils.checkAndUpdateForm(this.registerForm);
      return;
    }
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/auth'),
      error: (message) => {
        console.log(message);
      },
    });
  }
}
