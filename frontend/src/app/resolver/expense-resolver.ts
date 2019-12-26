import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnerService } from '../service/owner.service';
import { CategoryService } from '../service/category.service';
import { ExpenseService } from '../service/expense.service';

@Injectable({
    providedIn: 'root'
})
export class ExpenseResolver implements Resolve<Observable<any>> {
    constructor(private expenseService: ExpenseService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.expenseService.getExpense(route.paramMap.get('id'));
    }
}
