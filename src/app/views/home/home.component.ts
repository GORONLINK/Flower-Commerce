import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QueriesService } from '../../services/queries.service';
import { MutationsService } from '../../services/mutations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('modalAuth', {static: true}) modalAuth: any;

  phoneForm: FormGroup = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(13)]),
  });

  phoneSubmitted: boolean = false;

  constructor(private router: Router, private querie: QueriesService,
    private mutation: MutationsService) { }

  ngOnInit() {
  }

  submitPhone() {
    this.phoneSubmitted = true;
    const input = {
      phone: this.phone
    }
    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false
    })
    Swal.showLoading();
    this.querie.userExists(this.phone).subscribe(
      (exists: any) => {
        console.log(exists.data.userExists);
        this.savePhone();
        if(exists.data.userExists) {
          console.log("Existe");
          Swal.close();
          this.router.navigateByUrl('/auth');
        } else {
          console.log("No existe");
          this.requestSignUp(input);
        }
        this.phoneSubmitted = false;
      },
      error => {
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "Something went wrong.<br>Verify the data and try again"
        });
        this.phoneSubmitted = false;
        throw error;  
      }
    );
  }

  savePhone() {
    if(localStorage.getItem('ecommerce-user-phone')) {
      localStorage.removeItem('ecommerce-user-phone');
      localStorage.setItem('ecommerce-user-phone', this.phone);
    } else {
      localStorage.setItem('ecommerce-user-phone', this.phone);
    }
  }

  requestSignUp(input: any) {
    this.mutation.signUp(true, input).subscribe(
      (response: any) => {
        if(response) {
          if(localStorage.getItem('ecommerce-user-id')) {
            localStorage.removeItem('ecommerce-user-id');
            localStorage.setItem('ecommerce-user-id', response.data.signup._id);
          } else {
            localStorage.setItem('ecommerce-user-id', response.data.signup._id);
          }
          Swal.close();
          this.router.navigateByUrl('/verification');
        }
      },
      error => {
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "Something went wrong.<br>Verify the data and try again"
        });
        this.phoneSubmitted = false;
        throw error;
      }
    );
  }

  goToShowCase() {
    this.router.navigateByUrl("/showcase");
  }

  openModal() {
    this.modalAuth.nativeElement.show();
  }

  hideModal() {
    this.modalAuth.nativeElement.hide();
  }

  get phone() {
    return this.phoneForm.get('phone').value as string;
  }

}
