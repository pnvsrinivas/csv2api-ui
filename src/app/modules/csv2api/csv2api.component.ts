import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';  
import { ApiService } from 'src/app/shared/services/api.service';
import { FileMeta } from 'src/app/shared/classes/file-meta';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csv2api',
  templateUrl: './csv2api.component.html',
  styleUrls: ['./csv2api.component.scss']
})
export class Csv2apiComponent implements OnInit {

  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  results: FileMeta[] = []; // [{ id: '38d50e58-d700-4bb7-8f43-fc20fbcc0fad', url: 'http://127.0.0.1:8001/api/file/38d50e58-d700-4bb7-8f43-fc20fbcc0fad/', filename: 'test_share_rules_13.csv', validity: new Date() }, { id: '38d50e58-d700-4bb7-8f43-fc20fbcc0fad', url: 'http://127.0.0.1:8001/api/file/38d50e58-d700-4bb7-8f43-fc20fbcc0fad/', filename: 'test_share_rules_13.csv', validity: new Date() }];
  is_loading: boolean = false;

  constructor(
    public service: ApiService, 
    private _snackBar: MatSnackBar,
    public router: Router
  ) { }

  openSnackBar(message: string, action: string = "") {
    let snackBarRef = this._snackBar.open(message, action, {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      const fileInput = this.fileInput.nativeElement;
      this.upload(fileInput);
    });
  }

  onView(id: string) {
    console.log(id)
    this.router.navigate(['/data', id]);
  }

  ngOnInit(): void {
  }

  onFileUpload() {  
      const fileInput = this.fileInput.nativeElement;
      fileInput.onchange = () => {
        this.upload(fileInput);
      };  
      fileInput.click();  
  }

  upload(fileInput) {
    let formData = new FormData();
    for(let index = 0; index < fileInput.files.length; index++){
      let file = fileInput.files[index];
      if(file.name.split(".").reverse()[0].toLowerCase() == "csv") {
        formData.append("file", file, file.name);
        this.is_loading = true;
        this.service.upload(formData).subscribe((res: any) => {
          if(res){
            this.results.push(res);
            fileInput.value = null;
          } else {
            this.openSnackBar("Unable to upload file.", "Retry")
          }
          this.is_loading = false;
        }); 
      } else {
        if(fileInput.files.length > 1) {
          this.openSnackBar("Note: only .csv files will be processed.")
        }
        else {
          this.openSnackBar("Please choose only csv files.")
        }
      }
    }
  }

}
