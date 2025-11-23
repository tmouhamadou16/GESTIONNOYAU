import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { ProduitsComponent } from './produits/produits.component';
import { StocksComponent } from './stocks/stocks.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  {path:'dashboard', component:PagesComponent, canActivate: [AuthGuard],
children:[
    {path:'', component:DashboardComponent, data:{title:'Dashboard'}},
    {path:'users', component:UsersComponent, data:{title:'Users'}},
    {path:'clients', component:ClientsComponent, data:{title:'Clients'}},
    {path:'produits', component:ProduitsComponent, data:{title:'Produits'}},
    {path:'stock', component:StocksComponent, data:{title:'Stock'}},
  ]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }
