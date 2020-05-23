import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData } from 'src/app/shared/classes/file-data';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  data: FileData;
  id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.fileData;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id, params);
    });
  }

}
