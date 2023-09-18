import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(
    private _http:HttpClient,
    private _route:Router
  ){}
  login: FormGroup|any

  ngOnInit(): void {
    this.login = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    })
  }

  // ngOnInit(): void {
  //   this.login = new FormGroup({
  //     'username': new FormControl('', [
  //       Validators.required, // Make username field required
  //       Validators.minLength(3), // Minimum length of 3 characters
  //       Validators.maxLength(20), // Maximum length of 20 characters
  //       // You can add more custom validators as needed
  //     ]),
  //     'password': new FormControl('', [
  //       Validators.required, // Make password field required
  //       Validators.minLength(8), // Minimum length of 8 characters
  //       // You can add more password-specific validation rules
  //     ])
  //   });
  // }
  logindata(login: FormGroup){
    console.log(this.login.value)
    this._http.get<any>("http://localhost:3000/signup").subscribe(
      (res)=>{
        const user = res.find((a:any)=>{
          return a.name === this.login.value.username && a.password === this.login.value.password
        });

        if(user){
          this.login.reset();
          this._route.navigate(['home'])
        }

        else{
          alert("User Not found Please Sign up!")
          this._route.navigate(['login'])
        }
      },
      (error)=>{
        alert("Something went wrong!")
      }
    )

  }

}
