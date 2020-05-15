import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';  
import { ApiService } from 'src/app/shared/services/api.service';
import { FileMeta } from 'src/app/shared/classes/file-meta';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ClearAllService } from 'src/app/shared/services/clear-all.service';

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
    private notifyService: NotificationService,
    public router: Router,
    public clearHistoryService: ClearAllService
  ) { 
    this.clearHistoryService.changeEmitted$.subscribe(text => {
      console.log(text, localStorage.length);
      if(localStorage.length){
        localStorage.clear();
        this.remove();
        this.router.navigate(['/'])
      } else {
        this.notifyService.notify("Nothing to clear !!");
      }
    });
  }

  updateStorage(){
    if(this.results.length)
      localStorage.setItem('data', JSON.stringify(this.results));
    else
      localStorage.removeItem('data');
  }

  onView(id: string) {
    this.router.navigate(['/data', id]);
  }

  ngOnInit(): void {
    this.results = JSON.parse(localStorage.getItem("data") || '[]');
  }

  onFileUpload() {  
      const fileInput = this.fileInput.nativeElement;
      fileInput.onchange = () => {
        this.upload(fileInput);
      };  
      fileInput.click();  
  }

  remove(id: string = null) {
    if(id)
      this.results = this.results.filter(x => x.id != id);
    else
      this.results = [];
    this.updateStorage();
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
            this.updateStorage();
          } else {
            this.notifyService.notify("Unable to upload file(s)")
          }
          fileInput.value = null;
          this.is_loading = false;
        }); 
      } else {
        if(fileInput.files.length > 1) {
          this.notifyService.notify("Note: only .csv files will be processed.")
        }
        else {
          this.notifyService.notify("Please choose only csv files.")
        }
      }
    }
  }

}
