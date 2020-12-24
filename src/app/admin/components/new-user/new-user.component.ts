import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styles: [
  ]
})
export class NewUserComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(user: User): void {
    this.userService.createUser({
      ...user
    }).subscribe(() => {
      this.router.navigate(['/admin/users']);
    });
  }
}
