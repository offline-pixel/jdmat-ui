import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http'
import { domain } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  general( data: any ) {
    console.table(data)
    let fromClient = data.toServer
    const request = new HttpRequest(data.type, `${domain}${data.version}${data.endpoint}`, fromClient )
    return this.http.request(request)
  }

}
