import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-buyer-validation',
  templateUrl: './buyer-validation.component.html',
  styleUrls: ['./buyer-validation.component.scss']
})
export class BuyerValidationComponent implements OnInit {

  @ViewChild('modalTableOrder', {static: true}) modalTableOrder: any;
  @ViewChild('modalPickUp', {static: true}) modalPickUp: any;

  phoneForm: FormGroup = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(13)]),
  });

  verificationForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  tables: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
  selectedTable: string;

  user: any;

  phoneSubmitted: boolean = false;
  verificationSubmitted: boolean = false;
  canShowPasswordField: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private userService: UsersService) { }

  ngOnInit() {
  }

  async submitPhone() {
    this.canShowPasswordField = true;
    // this.phoneSubmitted = true;
    // Swal.fire("Processing...");
    // Swal.showLoading();    
    // try {      
    //   this.user = await this.userService.registerUser(this.phone)
    //   .catch(err => {throw err;});
    //   console.log(this.user);
    //   this.canShowPasswordField = true;
    //   Swal.fire({
    //     title: "Success!",
    //     icon: "success",
    //     html: `You have created an account.<br>A password has been sent via SMS in order to verify your identity`
    //   });      
    // } catch(err) {
    //   console.log(err);
    //   Swal.fire({
    //     title: "Error",
    //     icon: "error",
    //     html:
    //       "Something went wrong.<br>Verify the data and try again"
    //   });
    //   this.phoneSubmitted = false;
    // }
  }

  async submitVerification() {
    this.verificationSubmitted = true;
    this.openModal();
    // const data = {
    //   code: this.password,
    //   userId: this.user._id
    // }
    // try {
    //   const verification = await this.userService.verifyUser(data)
    //   .catch(err => {throw err;});
    //   if(verification) {
    //     this.router.navigateByUrl('');
    //   }
    // } catch (error) {
    //   console.log(error);
    //   this.verificationSubmitted = false;
    // }
  }

  get phone() {
    return this.phoneForm.get('phone').value as string;
  }

  get password() {
    return this.verificationForm.get('password').value as string;
  }

  openModal() {
    if(this.activatedRoute.snapshot.params.mode == "pickup") this.modalPickUp.nativeElement.show();
    else if(this.activatedRoute.snapshot.params.mode == "table") this.modalTableOrder.nativeElement.show();
  }

  closeModal() {
    this.modalPickUp.nativeElement.hide();
  }

  getSelectedTable(event, table: string) {
    this.selectedTable = table;
    console.log(this.selectedTable);
    this.redirectToCheckout('table');
  }

  redirectToCheckout(path: String) {
    this.router.navigateByUrl(`/checkout/${path}`);
  }

}