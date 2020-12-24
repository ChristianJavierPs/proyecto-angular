import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { decimalValidator } from '../../directives/decimal.directive';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  @Input() buttonText: string = 'Submit';
  @Input() user: User = null;
  @Output() saveUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private router: Router
  ){}

  userForm = null;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.user ? this.user.name : '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]),
      email: new FormControl(this.user ? this.user.email : '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]),
      password: new FormControl(this.user ? this.user.password : '',
      [
        Validators.required,
        Validators.min(0),
        decimalValidator()
      ])
    });
  }

  onSubmit(): void {
    const { name, email, password } = this.userForm.value;

    this.saveUser.emit({
      name,
      email,
      password
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/users']);
  }
}
