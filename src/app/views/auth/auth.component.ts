import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MutationsService } from '../../services/mutations.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  codeForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(12)]),
  });

  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
  });

  userExists: boolean = false;
  inputSubmitted: boolean = false;

  constructor(private router: Router, private mutation: MutationsService) { }

  ngOnInit() {
    if(this.router.url.includes('auth')) this.userExists = true;
  }

  onSubmitCode() {
    this.inputSubmitted = true;
    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false
    })
    Swal.showLoading();
    const userId = localStorage.getItem('ecommerce-user-id') as string;
      this.mutation.verifyUser(this.code, userId).subscribe(
        (response: any) => {
          if(response) {
            this.saveToken(response.data.vefiryUser.token);
            Swal.close();
            this.router.navigateByUrl('/');
          }
        },
        error => {
          Swal.fire({
            title: "Error",
            icon: "error",
            html:
              "Something went wrong.<br>Verify the data and try again"
          });
          this.inputSubmitted = false;
          throw error;
        }
    );    
  }

  onSubmitPassword() {
    this.inputSubmitted = true;
    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false
    })
    Swal.showLoading();    
    const phone = localStorage.getItem('ecommerce-user-phone');
    this.mutation.signIn(false, this.password, phone).subscribe(
      (response: any) => {
        if(response) {
          this.saveToken(response.data.signin.token);          
          Swal.close();
          this.router.navigateByUrl('/');
        }
      }, 
      error => {
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "Something went wrong.<br>Verify the data and try again"
        });
        this.inputSubmitted = false;
        throw error;
      }
    );
  }

  saveToken(response: string) {
    if(localStorage.getItem('ecommerce-user-token')) {
      localStorage.removeItem('ecommerce-user-token');
      localStorage.setItem('ecommerce-user-token', response);
    } else {
      localStorage.setItem('ecommerce-user-token', response);
    }
  }

  get code() {
    return this.codeForm.get('code').value as string;
  }

  get password() {
    return this.passwordForm.get('password').value as string;
  }

}
