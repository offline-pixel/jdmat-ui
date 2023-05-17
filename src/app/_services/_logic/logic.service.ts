import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../_api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  loading: any
  HttpEventResponse(event: any) {
    switch ( event.type ) {
      case HttpEventType.Sent:
      break;
      case HttpEventType.ResponseHeader:
      break;
      case HttpEventType.DownloadProgress:
        this.loading = Math.round( event.loaded / 1024 )
      break;
      case HttpEventType.Response:
      return event.body;
    }
  }

  $hideDialog = new BehaviorSubject<any>(0)
  $productList = new BehaviorSubject<any>(0)
  constructor( private _api: ApiService, private _route: Router ) { }
  
  logic( data: any ) {
    console.log(data)
    this._api.general(data).subscribe((event: HttpEvent<any>) => {
      let _api = this.HttpEventResponse(event);
      if ( event.type === 4 ) {
        const arr = _api
        this.$hideDialog.next(true)
        this.$productList.next({ arr, loaded: 1, _route: '' })
        if (arr.a == 'login') {
          this._route.navigate(['/list-product'])
        }
      }
    }, (err: any) => {
      this.$hideDialog.next(false)
      this._route.navigate(['/login'])
    })
  }
}
