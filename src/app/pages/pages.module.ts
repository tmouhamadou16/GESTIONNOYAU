import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProduitsComponent } from './produits/produits.component';
import { PagesComponent } from './pages.component';
import { StocksComponent } from './stocks/stocks.component';
import { ClientsComponent } from './clients/clients.component';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';




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
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
