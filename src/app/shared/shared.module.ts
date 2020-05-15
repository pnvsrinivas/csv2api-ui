import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ReversePipe } from './pipes/reverse.pipe';
import { HelpComponent } from './components/help/help.component'
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorComponent } from './components/error/error.component';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    LoaderComponent, 
    HelpComponent,
    ReversePipe,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent,
    LoaderComponent,
    HelpComponent,
    ErrorComponent,
    ReversePipe
  ],
  providers: [
    NotificationService
  ]
})
export class SharedModule { }
