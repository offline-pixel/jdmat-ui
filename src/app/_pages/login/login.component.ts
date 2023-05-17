import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { LogicService } from 'src/app/_services/_logic/logic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fg!: FormGroup;
  hideMe = true;

  constructor(
    private fb: FormBuilder,
    private _mid: LogicService
    ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  login(): void {
    if (!this.fg.invalid) {
    let client = {
      'endpoint': '/jd/login',
      'version': '/v1',
      'type': "POST",
      'func': 'login',
      'toServer': this.fg.value,
      'headers': {}
      }
      localStorage.removeItem('data')
      client.toServer['timeZone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
      this._mid.logic(client)
    }
  }

}