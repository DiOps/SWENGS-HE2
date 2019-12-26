import { UserService } from './../service/user.service';
import { OwnerService } from './../service/owner.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  owners: any[];
  displayedColumns = ['name', 'id'];

  constructor(
    private http: HttpClient,
    private ownerService: OwnerService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.ownerService.retrieveOwnerOptions().subscribe(
      (response) => {
        return this.owners = response;
      }
    );
  }

  deleteOwner(owner) {
    this.ownerService.deleteOwner(owner).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

}
