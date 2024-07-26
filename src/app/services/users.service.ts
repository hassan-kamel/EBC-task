import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { PageList } from '../interfaces/page-list.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = environment.baseUrl + '/user';

  constructor(private http: HttpClient) {}

  getUsers(page: number, limit: number): Observable<PageList<User>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PageList<User>>(this.usersUrl, { params });
  }
}
