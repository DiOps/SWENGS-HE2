import { OwnerResolver } from './resolver/owner-resolver';
import { ChartDataResolver } from './resolver/chartData-resolver';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { ExpenseResolver } from './resolver/expense-resolver';
import { CategoryOptionsResolver } from './resolver/category-options.resolver';
import { OwnerOptionsResolver } from './resolver/owner-options.resolver';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'expense-list', pathMatch: 'full' },
  {
    path: 'expense-list', component: ExpenseListComponent, canActivate: [AuthGuard], resolve: {
      chartData: ChartDataResolver
    }
  },
  {
    path: 'expense-form', component: ExpenseFormComponent, canActivate: [AuthGuard], resolve: {
      ownerOptions: OwnerOptionsResolver,
      categoryOptions: CategoryOptionsResolver,
    }
  },
  {
    path: 'expense-form/:id', component: ExpenseFormComponent, canActivate: [AuthGuard], resolve: {
      ownerOptions: OwnerOptionsResolver,
      categoryOptions: CategoryOptionsResolver,
      expense: ExpenseResolver
    }
  },
  { path: 'person-list', component: PersonListComponent, canActivate: [AuthGuard] },
  {
    path: 'person-form', component: PersonFormComponent, canActivate: [AuthGuard], resolve: {
      ownerOptions: OwnerOptionsResolver
    }
  },
  {
    path: 'person-form/:id', component: PersonFormComponent, canActivate: [AuthGuard], resolve: {
      ownerOptions: OwnerOptionsResolver,
      owner: OwnerResolver
    }
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
