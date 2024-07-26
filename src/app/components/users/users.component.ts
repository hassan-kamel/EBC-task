import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { TableModule } from 'primeng/table';
import { User } from '../../interfaces/user.interface';
import { PageList } from '../../interfaces/page-list.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<PageList<User>> | null = null;

  currentPage: number = 1;
  limit: number = 5;

  constructor(
    private _userService: UsersService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.users$ = this._route.queryParams.pipe(
      switchMap((params) => {
        this.currentPage = params['page'] ? +params['page'] : 1;
        this.limit = params['limit'] ? +params['limit'] : 5;
        return this._userService.getUsers(this.currentPage, this.limit);
      })
    );
  }

  loadUsers(page: number, limit: number) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { page, limit },
      queryParamsHandling: 'merge',
    });
  }
}
