import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileData } from 'src/app/shared/classes/file-data';
import { ApiService } from 'src/app/shared/services/api.service';
import { ConfirmationModel, ConfirmationComponent } from 'src/app/shared/widgets/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  data: FileData;
  id: string;

  constructor(
    private route: ActivatedRoute, 
    private service: ApiService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.fileData;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id, params);
    });
    if(!this.data) {
      this.removeIfNotFoundConfirmation();
    }
  }

  removeIfNotFoundConfirmation() {
    let results = JSON.parse(localStorage.getItem("data") || '[]');

    if(results.find(x => x.id === this.id)){
      const message = `This is expired, you want to remove this from your history?`;
      const dialogData = new ConfirmationModel("Confirmation", message);
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: "400px",
        data: dialogData
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult) {
          localStorage.setItem('data', JSON.stringify(results.filter(x => x.id !== this.id)));
          this.router.navigate(['/']);
        }
      });
    }
  }

  get getSelectedColumns() {
    return ['rowindex'].concat(this.data.header_names);
  }

  onPageChange($event: PageEvent): void {
    this.service.getFile(this.id, `?page=${$event.pageIndex + 1}&size=${$event.pageSize}`).subscribe(file => {
      this.data = file;
    });
  }

}
