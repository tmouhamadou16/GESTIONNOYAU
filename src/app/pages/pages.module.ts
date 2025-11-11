import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProduitsComponent } from './produits/produits.component';
import { PagesComponent } from './pages.component';
import { StocksComponent } from './stocks/stocks.component';
import { ClientsComponent } from './clients/clients.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ProduitsComponent,
    PagesComponent,
    StocksComponent,
    ClientsComponent
  ],
  exports: [
    DashboardComponent,
    UsersComponent,
    ProduitsComponent,
    PagesComponent,
    StocksComponent,
    ClientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class PagesModule { }
