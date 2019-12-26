import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnerService } from '../service/owner.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerOptionsResolver implements Resolve<Observable<any>> {
  constructor(private ownerService: OwnerService) {
  }

  resolve() {
    return this.ownerService.retrieveOwnerOptions();
  }
}
