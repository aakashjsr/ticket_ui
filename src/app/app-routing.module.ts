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



const routes: Routes = [
  {
    path: "login", component: LoginComponent,
  },
  {
    path: "", component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: [UserRoles.ADMIN]
    }
  },
  {
    path: "add-ticket", component: CreateTicketComponent
  },
  {
    path: "add-company", component: AddCompanyComponent
  },
  {
    path: "add-user", component: AddUserComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
