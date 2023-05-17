import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LogicService } from '../../_services/_logic/logic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListProductComponent implements OnInit {
  dataSource :any = new MatTableDataSource<DataElement>()
  temp: any = []
  columnsToDisplay: any = [ 'sku', 'productType', 'name', 'price', 'email'];
  columnsToDisplayWithExpand: any;
  showData: boolean = false
  expandedElement!: DataElement | null;

  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  client:any
  client2:any  = {
    'endpoint': '/jd/delete-product',
    'version': '/v1',
    'type': "POST",
    'func': 'deleteProduct',
    'toServer': {arr:[]},
    'headers': {}
  }
  disableMassDelete: boolean = false
  usData:any
  constructor(
    private _mid: LogicService,
    private _route: Router,
    public dialog: MatDialog
    ) {
      
  }

  massDelete(){
    this._mid.logic(this.client2)
  }
  openDialog(el:any, data:any) {
    if (el == 'view') {
      // emit.data
      console.log(el)
    }
    const dialogRef = this.dialog.open(
                        DialogComponent,
                        { data: { type: el, obj:data },
                      });
    dialogRef.afterClosed().subscribe(result => { console.log(`Dialog result: ${result}`); });
  }

  gInputVal($e:any, data:any){
    let obj:any = this.client2.toServer // shallow copy
    if($e.checked) {
      this.disableMassDelete = true
      obj['arr'].push(data._id)
    } else if (!$e.checked){
      let l = this.client2.toServer['arr']
      for (let i = 0; i < l.length; i++){
        if (data._id.indexOf(l[i]) !== -1) l.splice(i, 1);
      }
    }
    if (!this.client2.toServer.arr.length){
      this.disableMassDelete = false
    }
  }

  onPaginateChange(event: any){
    let i: any = 0,
    j: any = event.pageIndex*20 + 20,
    arr: any = []
    i = j-20
    if ( j > this.temp.length){ j = this.temp.length }
    while (i < j) {
      arr.push(this.temp[i])
      i++;
    }
    this.dataSource = arr
  }

  ngOnInit(): void {
    this.usData = this._mid.$productList.subscribe((el:any) => {
      if ( el == 0 ) { return }
      if (!el.loaded){
        alert(el.error)
        return
      }
      if (Array.isArray(el.arr.d)) {
        this.temp = el.arr.d.reverse()
      } else {
        this.temp.unshift(el.arr.d)
      }
      let i = 0, j=20, arr:any = []
      if (j > this.temp.length){ j = this.temp.length }
      while (i < j) {
        arr.push(this.temp[i])
        i++;
      }
      this.dataSource = arr
      this.resultsLength = this.temp.length;
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
      this.showData = true
    });
    this.client = {
      'endpoint': '/jd/product',
      'version': '/v1',
      'type': "GET",
      'func': 'getProduct',
      'toServer': {},
      'headers': {}
    }
    this._mid.logic(this.client)
  }

  viewProduct(el:any){
    console.log(el)
    this._route.navigate(['view-product'])
  }

  ngOnDestroy() {
    // do we have to unsubscribe?
    this.usData.unsubscribe()
  }


}

export interface DataElement {
  position: number;
  name: string;
  weight: number;
  description: string;
  width:string;
  height:string;
  length:string;
  size:string;
}