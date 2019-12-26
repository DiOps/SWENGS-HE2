import { UserService } from '../service/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseService } from '../service/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  expenses: any[];
  displayedColumns = ['title', 'amount', 'date', 'owner_name', 'id'];

  constructor(
    private http: HttpClient,
    private expenseService: ExpenseService,
    public userService: UserService) { }

  ngOnInit() {
    this.expenseService.getExpenses().subscribe((response: any) => {
      this.expenses = response;
    });
  }

  deleteExpense(expense: any) {
    this.expenseService.deleteExpense(expense).subscribe(() => {
      this.ngOnInit();
    });
  }

}
