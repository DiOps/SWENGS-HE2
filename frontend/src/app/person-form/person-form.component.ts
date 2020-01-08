import { OwnerService } from './../service/owner.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  personFormGroup: FormGroup;
  ownerOptions;
  // notAdult;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ownerService: OwnerService) { }

  ngOnInit() {
    const year = new Date().getFullYear();

    this.personFormGroup = this.fb.group({
      id: [null],
      first_name: ['', Validators.required],
      last_name: ['', [Validators.required]],
      year_of_birth: [null, [Validators.required, Validators.max(year)]],
      getsSalary: [],
      job: ['']
    });

    this.personFormGroup.setValidators(this.isAdult);

    const data = this.route.snapshot.data;
    this.ownerOptions = data.ownerOptions;

    if (data.owner) {
      this.personFormGroup.patchValue(data.owner);
    }
  }

  savePerson() {

    const person = this.personFormGroup.value;

    this.ownerService.createOwner(person).subscribe(
      (result) => {
        alert('success');
        return result;
      }
    );
  }

  // custom validator
  isAdult(group: FormGroup): any {
    const birthYear = group.value.year_of_birth;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 18 && group.value.job === 'child') {
      return { notAdult: true };
    } else {
      return null;
    }
  }
}
