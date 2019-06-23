import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {
  MatButtonModule, MatInputModule, MatCardModule,
  MatDatepickerModule, MatNativeDateModule, MatIconModule,
  MatDividerModule, MatChipsModule, MatSidenavModule, MatToolbarModule,
  MatListModule, MatSelectModule, MatAutocompleteModule, MatMenuModule, MatRadioModule, MatSnackBarModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { TicketsComponent } from './tickets/tickets.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    CreateTicketComponent,
    AddCompanyComponent,
    AddUserComponent,
    UsersListComponent,
    ContactCardComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
