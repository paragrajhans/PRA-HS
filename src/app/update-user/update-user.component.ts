import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UserService } from "../user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public user;
  submitted = false;
  id: Number;
  public updateuserform: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute,
    private frmBld: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    //Get data from localstorage and set it to user
    this.user = JSON.parse(localStorage.getItem('user'));

    this.updateuserform = this.frmBld.group({
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

    this.updateuserform.setControl('phone', this.setPhones(this.user.phone));
    this.setTitleValidators();
  }

  //Populate the FormArray data
  public setPhones(phones: any[]): FormArray {
    const formArray = new FormArray([]);
    phones.forEach(s => {
      formArray.push(this.frmBld.group({
        phone: s
      }));
    });
    return formArray;
  }

  //To have a default input phone field
  public initiateForm(): FormGroup {
    return this.frmBld.group({
      phone: ['', Validators.required]
    });
  }

  //Get all the phone numbers, if any
  public get phone() {
    let control = this.updateuserform.get('phone') as FormArray;
    return control;
  }

  //Add phone number to the FormArray
  public addPhone() {
    const control = this.updateuserform.get('phone') as FormArray;
    control.push(this.initiateForm());
  }

  //Delete phone number to the FormArray
  public removePhone(i: number) {
    const control = this.updateuserform.get('phone') as FormArray;
    control.removeAt(i);
  }

  //Get access to the FormGroup controls
  public get f() { return this.updateuserform.controls; }

  //Customer Validator to validate the Other input field
  //Only when the Title is Other, the Other input field is required
  public setTitleValidators() {

    const other = this.updateuserform.get('other');
    this.updateuserform.get('title').valueChanges
      .subscribe(title => {

        if (title === 'Mr') {
          other.setValidators(null);
        }

        if (title === 'Mrs') {
          other.setValidators(null);

        }

        if (title === "Other") {
          other.setValidators([Validators.required]);
        }
        other.updateValueAndValidity();
      });
  }

  //Navigate back to users table
  public backtoUsers() {
    this.router.navigateByUrl("/users");
  }

  //Update user
  public updateUser() {
    this.submitted = true;

    let passPhone: any = [];
    let tempPhone = this.updateuserform.get('phone').value;
    tempPhone.forEach(element => {
      passPhone.push(Object.values(element));
    });

    let tempuser = {
      id: Number(this.id),
      name: {
        first: this.updateuserform.get('first').value,
        last: this.updateuserform.get('last').value,
      },
      age: this.updateuserform.get('age').value,
      title: this.updateuserform.get('title').value,
      other: this.updateuserform.get('other').value,
      company: this.updateuserform.get('company').value,
      email: this.updateuserform.get('email').value,
      phone: passPhone,
      address: this.updateuserform.get('address').value,
      address2: this.updateuserform.get('address2').value,
      city: this.updateuserform.get('city').value,
      state: this.updateuserform.get('state').value,
      zipcode: this.updateuserform.get('zipcode').value,
    }

    if (this.updateuserform.invalid) {
      return;
    }

    this.userService.updateUser(JSON.stringify(tempuser)).subscribe(_ => {
      this.router.navigateByUrl("/users");
    }, err => {
      console.log(err);
    })
  }

}
