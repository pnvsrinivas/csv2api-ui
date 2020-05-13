import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { ApiService } from '../shared/services/api.service';
import { FileData } from '../shared/classes/file-data';

  
@Injectable()  
export class FileResolve implements Resolve<FileData> {  
  constructor(private service: ApiService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<FileData> {  
    let id = route.params['id'];
    return this.service.getFile(id);  
  }  
}  