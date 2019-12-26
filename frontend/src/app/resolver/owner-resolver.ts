import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnerService } from '../service/owner.service';

@Injectable({
    providedIn: 'root'
})
export class OwnerResolver implements Resolve<Observable<any>> {
    constructor(private ownerService: OwnerService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.ownerService.getOwner(route.paramMap.get('id'));
    }
}
