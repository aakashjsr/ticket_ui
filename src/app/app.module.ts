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
  MatListModule, MatSelectModule, MatAutocompleteModule, MatMenuModule, MatRadioModule, MatSnackBarModule, MatTableModule, MatPaginatorModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { VendorsTableComponent } from './dashboard/vendors-table/vendors-table.component';
import { UsersTableComponent } from './dashboard/users-table/users-table.component';
import { DevicesTableComponent } from './dashboard/devices-table/devices-table.component';
import { NetworkTableComponent } from './dashboard/network-table/network-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientSitesComponent } from './client-sites/client-sites.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { AddVendorsComponent } from './add-vendors/add-vendors.component';
import { AddNetworksComponent } from './add-networks/add-networks.component';
import { AddClientSiteComponent } from './add-client-site/add-client-site.component';
import { TicketsTableComponent } from './tickets-table/tickets-table.component';
import { TktEditHistoryComponent } from './create-ticket/tkt-edit-history/tkt-edit-history.component';


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
    VendorsTableComponent,
    UsersTableComponent,
    DevicesTableComponent,
    NetworkTableComponent,
    ClientSitesComponent,
    AddDeviceComponent,
    AddVendorsComponent,
    AddNetworksComponent,
    AddClientSiteComponent,
    TicketsTableComponent,
    TktEditHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
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
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: 'purple',
      secondaryColour: 'white',
      tertiaryColour: 'blue'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
