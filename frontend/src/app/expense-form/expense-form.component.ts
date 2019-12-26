import { ExpenseService } from '../service/expense.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {

  expenseFormGroup: FormGroup;
  ownerOptions;
  categoryOptions;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private expenseService: ExpenseService) {
  }

  ngOnInit() {
    this.expenseFormGroup = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: [null, Validators.required],
      description: [null, [Validators.required, this.badWordValidator()]],
      owner: [null, Validators.required],
      categories: [[]],
      pictures: [[]]
    });

    const data = this.route.snapshot.data;
    this.ownerOptions = data.ownerOptions;
    this.categoryOptions = data.categoryOptions;

    if (data.expense) {
      this.expenseFormGroup.patchValue(data.expense);
    }
  }

  saveExpense() {
    const expense = this.expenseFormGroup.value;

    this.expenseService.createExpense(expense).subscribe((result) => {
      alert('success');
      return result;
    });
  }

  badWordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /fuck/.test(control.value); // regex
      return forbidden ? { 'badWord': { value: control.value } } : null;
    };
  }
}
