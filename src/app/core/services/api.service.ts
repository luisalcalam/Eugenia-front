import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/response.interfaces';
import { httpUtils } from '../utils/http.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<I>(
    url: any,
    queryParams?: { [key: string]: string },
    ignoreMessageService?: boolean
  ) {
    return this.httpClient.get<ApiResponse<I>>(environment.baseUrl + url, {
      params: new HttpParams({
        fromObject: queryParams,
      }),
    });
  }

  post(
    url: any,
    data: any,
    ignoreMessageService?: boolean,
    formDataBody?: boolean,
    reportProgress?: boolean
  ) {
    let httpOptions = {};
    if (reportProgress) {
      httpOptions = { reportProgress: true, observe: 'events' };
    }

    if (ignoreMessageService) {
      return this.httpClient.post(
        environment.baseUrl + url,
        formDataBody ? this.getFormData(data) : data,
        httpOptions
      );
    } else {
      return new Observable<any>((subs) => {
        this.httpClient
          .post(
            environment.baseUrl + url,
            formDataBody ? this.getFormData(data) : data,
            httpOptions
          )
          .subscribe(
            (event: any) => {
              this.eventsWrapper(event, subs, reportProgress);
            },
            (error) => {
              // this.message.errorMessage(this.getStringError(error));
              subs.error(error);
            },
            () => {
              subs.complete();
            }
          );
      });
    }
  }

  patch(
    url: any,
    data: any,
    ignoreMessageService?: boolean,
    formDataBody?: boolean,
    reportProgress?: boolean
  ) {
    let httpOptions = {};
    if (reportProgress) {
      httpOptions = { reportProgress: true, observe: 'events' };
    }

    if (ignoreMessageService) {
      return this.httpClient.patch(
        environment.baseUrl + url,
        formDataBody ? this.getFormData(data) : data,
        httpOptions
      );
    } else {
      return new Observable<any>((subs) => {
        this.httpClient
          .patch(
            environment.baseUrl + url,
            formDataBody ? this.getFormData(data) : data,
            httpOptions
          )
          .subscribe(
            (event: any) => {
              this.eventsWrapper(event, subs, reportProgress);
            },
            (error) => {
              // this.message.errorMessage(this.getStringError(error));
              subs.error(error);
            },
            () => {
              subs.complete();
            }
          );
      });
    }
  }

  put(
    url: any,
    data: any,
    ignoreMessageService?: boolean,
    formDataBody?: boolean,
    reportProgress?: boolean
  ) {
    let httpOptions = {};
    if (reportProgress) {
      httpOptions = { reportProgress: true, observe: 'events' };
    }

    if (ignoreMessageService) {
      return this.httpClient.put(
        environment.baseUrl + url,
        formDataBody ? this.getFormData(data) : data,
        httpOptions
      );
    } else {
      return new Observable<any>((subs) => {
        this.httpClient
          .put(
            environment.baseUrl + url,
            formDataBody ? this.getFormData(data) : data,
            httpOptions
          )
          .subscribe(
            (event: any) => {
              this.eventsWrapper(event, subs, reportProgress);
            },
            (error) => {
              // this.message.errorMessage(this.getStringError(error));
              subs.error(error);
            },
            () => {
              subs.complete();
            }
          );
      });
    }
  }

  delete(url: any, ignoreMessageService?: boolean) {
    if (ignoreMessageService) {
      return this.httpClient.delete(environment.baseUrl + url);
    } else {
      return new Observable<any>((subs) => {
        this.httpClient.delete(environment.baseUrl + url).subscribe(
          (res) => {
            subs.next(res);
            // this.message.successMessage();
          },
          (error) => {
            // this.message.errorMessage(this.getStringError(error));
            subs.error(error);
          },
          () => {
            subs.complete();
          }
        );
      });
    }
  }

  private getFormData(data: { [key: string]: string }): FormData {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  private eventsWrapper(
    event: any,
    subs: Subscriber<any>,
    reportProgress?: boolean
  ) {
    if (reportProgress) {
      if (event.type == 1) {
        subs.next({
          progress: httpUtils.getPercentage(event.loaded, event.total),
        });
      } else if (event instanceof HttpResponse) {
        // this.message.successMessage();
        subs.next({ response: event.body });
      }
    } else {
      subs.next(event);
      // this.message.successMessage();
    }
  }

  private getStringError(err: any): string {
    let errMsg = '';
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
      errMsg = `Ha ocurrido un error:, ${err.error.message}`;
    } else {
      console.error(
        `Backend returned code ${err.status}, body was: ${err.error}`
      );
      errMsg = `Error desconocido, Codigo ${err.status}`;
    }
    // console.log(err);
    return errMsg;
  }
}
