import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  retrieveOwnerOptions() {
    return this.http.get<any[]>('/api/owner/options');
  }

  getOwner(id: string) {
    return this.http.get('/api/person/' + id + '/get');
  }

  createOwner(person) {
    if (person.id) {
      return this.http.put('/api/person/' + person.id + '/update', person);
    } else {
      return this.http.post('api/person/create', person);
    }
  }

  deleteOwner(person) {
    return this.http.delete('api/person/' + person.id + '/delete');
  }
}
