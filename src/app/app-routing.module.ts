import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UserRoles } from './utils/userRoles';
import { ClientSitesComponent } from './client-sites/client-sites.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { AddVendorsComponent } from './add-vendors/add-vendors.component';
import { AddNetworksComponent } from './add-networks/add-networks.component';
import { AddClientSiteComponent } from './add-client-site/add-client-site.component';



const routes: Routes = [
  {
    path: "login", component: LoginComponent,
  },
  {
    path: "", component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: [UserRoles.ADMIN, UserRoles.CLIENT_ADMIN, UserRoles.CLIENT_USER, UserRoles.SUPER_ADMIN]
    }
  },
  {
    path: "add-ticket", component: CreateTicketComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: [UserRoles.ADMIN, UserRoles.CLIENT_ADMIN, UserRoles.CLIENT_USER, UserRoles.SUPER_ADMIN]
    }
  },
  {
    path: "add-company", component: AddCompanyComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN]
    }
  },
  {
    path: "add-user", component: AddUserComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN]
    }
  },
  {
    path: "users", component: UsersListComponent
  },
  {
    path: "home", component: HomeComponent
  }, {
    path: "contact-detail", component: ContactCardComponent
  },
  {
    path: "tickets", component: TicketsComponent
  },
  {
    path: "client-sites", component: ClientSitesComponent
  },
  {
    path: "add-device", component: AddDeviceComponent
  },
  {
    path: "add-vendors", component: AddVendorsComponent
  },
  {
    path: "add-network", component: AddNetworksComponent
  },
  {
    path: "add-client-site", component: AddClientSiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
