import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { arr } from './data'
import { LogicService } from '../../_services/_logic/logic.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  type: 'add' | 'view';
  obj: any
}
function numberRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  header: any = 'Add The Product'
  fg!: FormGroup;
  productTypeList: any = JSON.parse(JSON.stringify(arr))
  showMoreCtrls: boolean = false
  moreCtrlsList: any = []
  isSuccess: boolean = false
  hideSave: boolean = false
  constructor(
    private fb: FormBuilder,
    private _mid: LogicService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this._mid.$hideDialog.subscribe((el: any) => this.isSuccess = el)
  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      productType: ['', Validators.required],
      sku: ['', [Validators.required, Validators.minLength(3)]], // /^[a-z0-9]+$/i
      price: ['', [Validators.required, numberRange(1, 9999999)]],
      
      description: ['', [Validators.required, Validators.minLength(50)]],
      address: ['', [Validators.required,]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required, numberRange(1, 9999999999)]],
    });
    const ls = localStorage.getItem('data')
    if ( ls && typeof JSON.parse(ls) == 'object' ) {
      this.fg.patchValue(JSON.parse(ls));
    }
    if (this.data.type == 'add') {
      this.header = 'Add The Product'
    } else {
      this.fg.patchValue(this.data.obj);
      this.header = 'View/Edit Product'
      this.hideSave = true
      this.fg.disable()
    }
    console.log(this.data)
  }

  edit() {
    this.fg.enable()
    this.hideSave = true
  }

  update() {
    console.log(this.data.obj)
    if (!this.fg.invalid) {
      let client = {
        'endpoint': '/jd/update-product',
        'version': '/v1',
        'type': "POST",
        'func': 'updateProduct',
        'toServer': {...this.fg.value, _id:this.data.obj._id },
        'headers': {}
        }
        this._mid.logic(client)
      }
  }
  productTypeChange(){
    let x = this.fg.value.productType
    if ( x == 'Book' ) {
      this.moreCtrlsList = this.productTypeList[0].arr
      this.addRemoveCtrls(['weight'], ['size', 'height', 'length', 'width'])
    } else if ( x == 'DVD'){
      this.moreCtrlsList = this.productTypeList[1].arr
      this.addRemoveCtrls(['size'], ['weight', 'height', 'length', 'width'])
    } else if ( x == 'Furniture') {
      this.moreCtrlsList = this.productTypeList[2].arr
      this.addRemoveCtrls(['height', 'length', 'width'], ['weight', 'size'])
    }
    this.showMoreCtrls = true
  }

  save(): void {
    if (!this.fg.invalid) {
      let client = {
        'endpoint': '/jd/product',
        'version': '/v1',
        'type': "POST",
        'func': 'addProduct',
        'toServer': this.fg.value,
        'headers': {}
        }
        this._mid.logic(client)
    }
  }
  addRemoveCtrls(ad:any, rem:any) {
    for (let i of ad) { this.fg.addControl(i, new FormControl('', numberRange(1, 9999999) )) }
    for (let j of rem) { this.fg.removeControl(j) }
  }

  ngOnDestroy(): void {
    if (this.data.type == 'add') {
      localStorage.setItem('data', JSON.stringify(this.fg.value))
    } else {
      localStorage.removeItem('data')
    }
  }
}
