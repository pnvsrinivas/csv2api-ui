import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Dataset } from '../classes/dataset';
import { FileMeta } from '../classes/file-meta';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'https://csv2api.pythonanywhere.com/api';
// const apiUrl = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  getFile(url): Observable<Object[]> {
    return this.http.get<Object[]>(url)
      .pipe(
        tap(file => console.log('fetched data')),
        catchError(this.handleError('getFile', []))
      );
  }

  upload(formData: FormData): Observable<FileMeta> {
    const url = `${apiUrl}/file/upload/`;
    return this.http.post<FileMeta>(url, formData).pipe(
      tap(
        // (c: FileMeta) => console.log(`console`, c),
      ),
      catchError(this.handleError<FileMeta>('upload'))
    );
  }
}
