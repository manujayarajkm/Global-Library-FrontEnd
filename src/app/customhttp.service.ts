import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { ErrorNotifierService } from './error.notifier.service';

@Injectable()
export class CustomhttpService extends Http{

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,private errorservice:ErrorNotifierService) {
    super(backend, defaultOptions);
  }

  loadervar:boolean;


  // request(url: string | Request): Observable<any> {
  //   console.log('Before the request...');
  //   return super.request(url)
  //       .catch((err: any): any => {
  //         console.log("error");
  //         return Observable.empty();
  //       })
  //       .retryWhen(error => error.delay(500))
  //       .timeoutWith(2000, Observable.throw(new Error('delay exceeded')))
  //       .finally(() => {
  //         console.log('After the request...');
  //       });
  // }

  get(url: string,options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the request...');
    alert('Before the request');
    
    return super.get(url,(options))
        .catch((err: any): any => {
          if (err.status === 400 || err.status === 422) {
            return Observable.throw(err);
          } else {
            this.errorservice.notifyError(err);
            console.log("error");
            return Observable.empty();
          }
        })
        .retryWhen(error => error.delay(500))
        .timeoutWith(2000, Observable.throw(new Error('delay exceeded')))
        .finally(() => {
          console.log('After the request...');
          alert('after the request');
        });
  }

  // post(url: string, body: any): Observable<any> {
  //   console.log('Before the request...');
  //   return super.post(url, body)
  //       .catch((err: any): any => {
  //         if (err.status === 400 || err.status === 422) {
  //           return Observable.throw(err);
  //         } else {
  //           console.log("error");
  //           return Observable.empty();
  //         }
  //       })
  //       .finally(() => {
  //         console.log('After the request...');
  //       });
  // }


  
}


