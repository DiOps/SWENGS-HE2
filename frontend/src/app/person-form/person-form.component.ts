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

  // nameNotTakenValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return this.ownerService.retrieveOwnerOptions()
  //       .pipe(
  //         map((owners: any[]) => {
  //           const currentId = this.personFormGroup.controls.id.value;
  //           const currentLastName = this.personFormGroup.controls.last_name.value;
  //           const ownerWithSameLastName = owners.find((m) => {
  //             console.log(m);
  //             return m.id !== currentId && m.last_name === currentLastName;
  //           });
  //           if (currentId !== null && ownerWithSameLastName) {
  //             console.log(ownerWithSameLastName);
  //             return {
  //               lastNameAlreadyExists: true
  //             };
  //           } else {
  //             return null;
  //           }
  //         })
  //       );
  //   };
  // }
}
