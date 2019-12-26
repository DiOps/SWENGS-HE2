import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getExpenses() {
    return this.http.get('/api/expense/list');
  }

  getExpense(id: string) {
    return this.http.get('/api/expense/' + id + '/get');
  }

  deleteExpense(expense: any) {
    return this.http.delete('/api/expense/' + expense.id + '/delete');
  }

  createExpense(expense: any) {
    if (expense.id) {
      return this.http.put('/api/expense/' + expense.id + '/update', expense);
    } else {
      return this.http.post('api/expense/create', expense);
    }
  }

  getChartExpenses() {
    return this.http.get('api/expense/chart');
  }

}
