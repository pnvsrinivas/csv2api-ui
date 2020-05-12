import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';  
import { ApiService } from 'src/app/shared/services/api.service';
import { FileMeta } from 'src/app/shared/classes/file-meta';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-csv2api',
  templateUrl: './csv2api.component.html',
  styleUrls: ['./csv2api.component.scss']
})
export class Csv2apiComponent implements OnInit {

  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  results: FileMeta[] = []; // [{ url: 'http://127.0.0.1:8001/api/file/47a09a35-d63e-4e42-82f6-73c429a7d59c/', filename: 'test_share_rules_13.csv', validity: new Date() }, { url: 'http://127.0.0.1:8001/api/file/47a09a35-d63e-4e42-82f6-73c429a7d59c/', filename: 'test_share_rules_13.csv', validity: new Date() }, { url: 'http://127.0.0.1:8001/api/file/47a09a35-d63e-4e42-82f6-73c429a7d59c/', filename: 'test_share_rules_13.csv', validity: new Date() }, { url: 'http://127.0.0.1:8001/api/file/47a09a35-d63e-4e42-82f6-73c429a7d59c/', filename: 'test_share_rules_13.csv', validity: new Date() }, { url: 'http://127.0.0.1:8001/api/file/47a09a35-d63e-4e42-82f6-73c429a7d59c/', filename: 'test_share_rules_13.csv', validity: new Date() }, { url: 'http://127.0.0.1:8001/api/file/47a09a35-d63e-4e42-82f6-73c429a7d59c/', filename: 'test_share_rules_13.csv', validity: new Date() }, { url: 'http://127.0.0.1:8001/api/file/47a09a35-d63e-4e42-82f6-73c429a7d59c/', filename: 'test_share_rules_13.csv', validity: new Date() }];
  is_loading: boolean = false;

  constructor(public service: ApiService, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = "") {
    let snackBarRef = this._snackBar.open(message, action, {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      const fileInput = this.fileInput.nativeElement;
      this.upload(fileInput);
    });
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
