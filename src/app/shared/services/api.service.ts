import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FileMeta } from '../classes/file-meta';
import { FileData } from '../classes/file-data';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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
  
  getFile(id: string, queryParams: string = ""): Observable<FileData> {
    let url = `${environment.apiUrl}/file/${id}/`;
    if(queryParams && queryParams.length > 0) {
      url += queryParams;
    }
    return this.http.get<FileData>(url)
      .pipe(
        tap(file => console.log('fetched data')),
        catchError(this.handleError<FileData>('getFile'))
      );
  }

  upload(formData: FormData): Observable<FileMeta> {
    const url = `${environment.apiUrl}/file/upload/`;
    return this.http.post<FileMeta>(url, formData).pipe(
      tap(
        // (c: FileMeta) => console.log(`console`, c),
      ),
      catchError(this.handleError<FileMeta>('upload'))
    );
  }
}
