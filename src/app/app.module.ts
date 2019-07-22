import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatDividerModule,
  MatChipsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule
} from "@angular/material";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreateTicketComponent } from "./create-ticket/create-ticket.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddUserComponent } from "./add-user/add-user.component";
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { VendorsTableComponent } from "./dashboard/vendors-table/vendors-table.component";
import { UsersTableComponent } from "./dashboard/users-table/users-table.component";
import { DevicesTableComponent } from "./dashboard/devices-table/devices-table.component";
import { NetworkTableComponent } from "./dashboard/network-table/network-table.component";
import { HttpClientModule } from "@angular/common/http";
import { ClientSitesComponent } from "./client-sites/client-sites.component";
import { AddDeviceComponent } from "./add-device/add-device.component";
import { AddVendorsComponent } from "./add-vendors/add-vendors.component";
import { AddNetworksComponent } from "./add-networks/add-networks.component";
import { AddClientSiteComponent } from "./add-client-site/add-client-site.component";
import { TicketsTableComponent } from "./tickets-table/tickets-table.component";
import { TktEditHistoryComponent } from "./create-ticket/tkt-edit-history/tkt-edit-history.component";
import { AddVendorAccountComponent } from "./add-vendor-account/add-vendor-account.component";
import { VendorsAccountTableComponent } from "./vendors-account-table/vendors-account-table.component";
import { ClientsTableComponent } from "./clients-table/clients-table.component";
import { AddClientComponent } from "./add-client/add-client.component";
import { CookieService } from "ngx-cookie-service";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ContactDialogueComponent } from "./tickets-table/contact-dialogue/contact-dialogue.component";
import { Key2stringPipe } from './key2string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    CreateTicketComponent,

    AddUserComponent,
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
    TktEditHistoryComponent,
    AddVendorAccountComponent,
    VendorsAccountTableComponent,
    ClientsTableComponent,
    AddClientComponent,
    ForgotPasswordComponent,
    ContactDialogueComponent,
    Key2stringPipe
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
    MatCheckboxModule,
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
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: "rgba(0,0,0,0.3)",
      backdropBorderRadius: "4px",
      primaryColour: "purple",
      secondaryColour: "white",
      tertiaryColour: "blue"
    })
  ],
  entryComponents: [ForgotPasswordComponent, ContactDialogueComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
