import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UserRoles } from './utils/userRoles';
import { ClientSitesComponent } from './client-sites/client-sites.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { AddVendorsComponent } from './add-vendors/add-vendors.component';
import { AddNetworksComponent } from './add-networks/add-networks.component';
import { AddClientSiteComponent } from './add-client-site/add-client-site.component';
import { NetworkTableComponent } from './dashboard/network-table/network-table.component';
import { DevicesTableComponent } from './dashboard/devices-table/devices-table.component';
import { VendorsTableComponent } from './dashboard/vendors-table/vendors-table.component';
import { UsersTableComponent } from './dashboard/users-table/users-table.component';
import { TicketsTableComponent } from './tickets-table/tickets-table.component';
import { AddVendorAccountComponent } from './add-vendor-account/add-vendor-account.component';
import { VendorsAccountTableComponent } from './vendors-account-table/vendors-account-table.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { AddClientComponent } from './add-client/add-client.component';



const routes: Routes = [
  {
    path: "login", component: LoginComponent,
  },
  {
    path: "", component: DashboardComponent,
    children: [
      {
        path: "networks", component: NetworkTableComponent
      },
      {
        path: "devices", component: DevicesTableComponent
      },
      {
        path: "vendors", component: VendorsTableComponent
      },
      {
        path: "vendors-accounts", component: VendorsAccountTableComponent
      },
      {
        path: "users", component: UsersTableComponent
      },
      {
        path: "client_sites", component: ClientSitesComponent
      },
      {
        path: "", component: TicketsTableComponent
      },
      {
        path: "device", component: AddDeviceComponent
      },
      {
        path: "edit-device/:id", component: AddDeviceComponent
      },
      {
        path: "vendor", component: AddVendorsComponent
      },
      {
        path: "edit-vendor/:id", component: AddVendorsComponent
      },
      {
        path: "client", component: AddClientComponent
      },
      {
        path: "edit-client/:id", component: AddClientComponent
      },
      {
        path: "clients", component: ClientsTableComponent
      },
      {
        path: "network", component: AddNetworksComponent
      },
      {
        path: "edit-network/:id", component: AddNetworksComponent
      },
      {
        path: "client-site", component: AddClientSiteComponent
      },
      {
        path: "edit-client-site/:id", component: AddClientSiteComponent
      },
      {
        path: "vendor-account", component: AddVendorAccountComponent
      },
      {
        path: "edit-vendor-account/:id", component: AddVendorAccountComponent
      },
      {
        path: "edit-ticket/:id", component: CreateTicketComponent
      },
      {
        path: "edit-user/:id", component: AddUserComponent
      },
      {
        path: "ticket", component: CreateTicketComponent,
        canActivate: [AuthGuardService],
        data: {
          expectedRoles: [UserRoles.ADMIN, UserRoles.CLIENT_ADMIN, UserRoles.CLIENT_USER, UserRoles.SUPER_ADMIN]
        }
      },
      {
        path: "user", component: AddUserComponent,
        canActivate: [AuthGuardService],
        data: {
          expectedRoles: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN]
        }
      },
    ],
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: [UserRoles.ADMIN, UserRoles.CLIENT_ADMIN, UserRoles.CLIENT_USER, UserRoles.SUPER_ADMIN]
    }
  },
  {
    path: "home", component: HomeComponent
  }, {
    path: "contact-detail", component: ContactCardComponent
  },

  {
    path: "client-sites", component: ClientSitesComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
