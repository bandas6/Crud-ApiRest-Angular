import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = 'Http://localhost:8080/api/users';

  constructor(private http: HttpClient) {

   }

  llamarUsuarios():Observable<User>{
    return this.http.get<User>(this.url)
  }

  agregarUsuario(usuario:User):Observable<User>{
    return this.http.post<User>(this.url,usuario)
  }

  ModificarUsuario(id: string):Observable<User>{
    return this.http.put<User>(this.url, id)
  }

  eliminarUsuario(id: string):Observable<User>{
    return this.http.put<User>(this.url, id)
  }



}
