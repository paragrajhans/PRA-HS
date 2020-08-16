import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "../user"
import * as data from "../mock_data.json"
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { DialogcontentComponent } from '../dialogcontent/dialogcontent.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  public users;
  submitted = false;
  public adduserform: FormGroup;
  public userAdded: boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private frmBld: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.adduserform = this.frmBld.group({
      id: '',
      first: ['', [Validators.required, Validators.minLength(1)]],
      last: ['', [Validators.required, Validators.minLength(1)]],
      age: '',
      title: ['', Validators.required],
      other: ['', Validators.required],
      company: '',
      email: ['', [Validators.required, Validators.email]],
      phone: this.frmBld.array([]),
      address: ['', Validators.required],
      address2: '',
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    })

    this.addPhone();
    this.setTitleValidators();
  }

  //To have a default input phone field
  initiateForm(): FormGroup {
    return this.frmBld.group({
      phone: ['', Validators.required]
    });
  }

  //Get all the phone numbers, if any
  public get phone() {
    const control = this.adduserform.get('phone') as FormArray;
    return control;
  }

  //Add phone number to the FormArray
  public addPhone() {
    const control = this.adduserform.get('phone') as FormArray;
    control.push(this.initiateForm());
  }

  //Delete phone number to the FormArray
  public removePhone(i: number) {
    const control = this.adduserform.get('phone') as FormArray;
    control.removeAt(i);
  }

  //Get access to the FormGroup controls
  public get f() { return this.adduserform.controls; }

  //Navigate back to users table
  public backtoUsers() {
    const dialogRef = this.dialog.open(DialogcontentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  //Get id for new user
  public getId() {
    let a = (data as any).default;
    return Object.keys(a).length;
  }

  //Customer Validator to validate the Other input field
  //Only when the Title is Other, the Other input field is required
  public setTitleValidators() {

    const other = this.adduserform.get('other');
    this.adduserform.get('title').valueChanges
      .subscribe(title => {

        if (title === 'Mr') {
          other.setValidators(null);
        }

        if (title === 'Mrs') {
          other.setValidators(null);

        }
        other.updateValueAndValidity();
      });
  }

  //Add user
  public addUser() {
    this.submitted = true;

    let passPhone: any = [];
    let tempPhone = this.adduserform.get('phone').value;
    tempPhone.forEach(element => {
      passPhone.push(Object.values(element));
    });

    let tempuser = {
      id: Number(this.getId()),
      name: {
        first: this.adduserform.get('first').value,
        last: this.adduserform.get('last').value,
      },
      age: this.adduserform.get('age').value,
      title: this.adduserform.get('title').value,
      other: this.adduserform.get('other').value,
      company: this.adduserform.get('company').value,
      email: this.adduserform.get('email').value,
      phone: passPhone,
      address: this.adduserform.get('address').value,
      address2: this.adduserform.get('address2').value,
      city: this.adduserform.get('city').value,
      state: this.adduserform.get('state').value,
      zipcode: this.adduserform.get('zipcode').value,
    }

    if (this.adduserform.invalid) {
      return;
    }

    this.userService.saveUser(JSON.stringify(tempuser)).subscribe(result => {
      this.router.navigateByUrl("/users");
    }, err => {
      console.log(err);
    })

  }

}
