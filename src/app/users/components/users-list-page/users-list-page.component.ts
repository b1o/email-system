import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {

  public users = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers()
      .subscribe(response => this.users = response)
  }

}
