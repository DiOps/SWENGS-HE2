import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnerService } from '../service/owner.service';
import { CategoryService } from '../service/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryOptionsResolver implements Resolve<Observable<any>> {
  constructor(private categoryService: CategoryService) {
  }

  resolve() {
    return this.categoryService.retrieveCategoryOptions();
  }
}
