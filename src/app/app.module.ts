import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { MatExpansionModule, MatSelectModule, MatTabsModule, MatTableModule, MatMenuModule, MatDialogModule,MatInputModule,MatFormFieldModule, MatCardModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator'

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './shared/auth/login/login.component';
import { RegisterComponent } from './shared/auth/register/register.component';
import { SidenavComponent } from './shared/layout/sidenav/sidenav.component';
import { ResetComponent } from './shared/auth/reset/reset.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudensComponent } from './pages/studens/studens.component';
import { DinningComponent } from './pages/dinning/dinning.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { AddGroupsComponent } from './pages/groups/add-groups/add-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SidenavComponent,
    ResetComponent,
    DashboardComponent,
    StudensComponent,
    DinningComponent,
    CalendarComponent,
    GroupsComponent,
    AddGroupsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    RouterModule.forRoot( ROUTES ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule, 
    MatCardModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
