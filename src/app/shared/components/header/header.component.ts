import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpComponent } from '../help/help.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { ClearAllService } from '../../services/clear-all.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string;

  constructor(public dialog: MatDialog, private router: Router, private clearStorageService: ClearAllService) { }

  ngOnInit(): void {
    this.title = environment.title;
  }

  openHelp(){
    const dialogRef = this.dialog.open(HelpComponent, {
      width: '350px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clearStorage() {
    this.clearStorageService.emitChange("Clear history emit !!");
  }

}
