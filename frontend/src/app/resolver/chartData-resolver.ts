import { ExpenseService } from './../service/expense.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChartDataResolver implements Resolve<Observable<any>> {
    constructor(private expenseService: ExpenseService) {
    }

    resolve() {
        return this.expenseService.getChartExpenses();
    }
}
