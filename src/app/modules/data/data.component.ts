import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileData } from 'src/app/shared/classes/file-data';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  data: FileData;
  id: string;

  constructor(private route: ActivatedRoute, private service: ApiService) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.fileData;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id, params);
    });
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
