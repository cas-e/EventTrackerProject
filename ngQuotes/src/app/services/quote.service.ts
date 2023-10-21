import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Quote } from '../models/quote';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  private url = environment.baseUrl + 'api/quotes';
  constructor(
    private http: HttpClient
  ) {}


  // we are going to skip over auth for this, at
  // least for the homework
  index(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('quoteService.index(): error retrieving quotes : ' + err)
        );
      })
    );
  }

  create(quote : Quote): Observable<Quote> {
    return this.http.post<Quote>(this.url, quote).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('quoteService.index(): error retrieving quotes : ' + err)
        );
      })
    );
  }


  udpate(quote : Quote): Observable<Quote> {
    return this.http.put<Quote>(this.url + "/" + quote.id, quote).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('quoteService: error : ' + err)
        );
      })
    );
  }

  delete(quote : Quote): Observable<Quote> {
    return this.http.delete<Quote>(this.url + "/" + quote.id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('quoteService: error : ' + err)
        );
      })
    );
  }
}
