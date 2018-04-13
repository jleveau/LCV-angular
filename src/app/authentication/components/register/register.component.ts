import { Component, OnInit } from '@angular/core';
import { Auth } from '../../elements/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentPanel = "login"
  auth:Auth =  new Auth();
  constructor() { }

  ngOnInit() {
  }

  loggin() {
   
  }

  register() {
    
  }

}
