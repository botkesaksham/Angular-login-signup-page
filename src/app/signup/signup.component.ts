import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

      // signupForm!: FormGroup;
      signupForm: FormGroup|any;
      signUser:any
      constructor(
        private formBuilder: FormBuilder,
        private _http: HttpClient, 
        private _route:Router,
      ){}

      ngOnInit(): void {
        this.signupForm = new FormGroup({
          'name': new FormControl(),
          'email': new FormControl(),
          'password': new FormControl()
        });
        
      }


      signUp(signup:FormGroup){
          console.log(this.signupForm.value)
          this.signUser = this.signupForm.value.name
          this._http.post<any>('http://localhost:3000/signup',this.signupForm.value).subscribe(
            (res)=>{
              alert("You have Successfully Signed Up!!")
              this.signupForm.reset()
              this._route.navigate(['login'])

            }, 
            (error)=>{
              alert("something went wrong.")
            }

          )
      }
    }
  
