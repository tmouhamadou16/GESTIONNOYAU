import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ClientModel } from '../models/client.model';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MesuresService } from '../mesures/services/mesures.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective | undefined;
  
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    //clients: any
    clients: ClientModel[]=[];
    mesureClient: any;
    
    formSubmitted = false;

    public clientForm = this.fb.group({
          firstname:['', [Validators.required]],
          lastname:['', [Validators.required]],
          telephone:['', [Validators.required]]
        });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sibebarService: SidebarService,
    private mesuresService: MesuresService

  ) { }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true,
      processing: true,
      responsive: true,
      info: true
      //language: {url:'CDN: datatables.french...'}
      // Add other DataTables options here                                                                                                         
    };
    this.getAllClients();
  }

  getAllClients(){
    //const user = localStorage.getItem('token');
    this.sibebarService.getClients().subscribe((res)=>{
      //console.log(res);
      this.clients = res;
      this.dtTrigger.next(null);   
    });
  }

  getClientById(id: number){
    this.sibebarService.getClientById(id).subscribe((res)=>{
      //console.log(res);
      this.clientForm.setValue({
        firstname: res['firstname'],
        lastname: res['lastname'],
        telephone: res['telephone']
      });
      localStorage.setItem("userId",res['id']);
    });

  }


  addClient(){
    this.formSubmitted = true;
        if (this.clientForm.invalid) {
          return;
        }
        this.sibebarService.addClient(this.clientForm.value).subscribe(res => {
              //console.log(res);
              Swal.fire({
                icon: 'success',
                title: 'Exit',
                text: 'Client ajoutée avec succès',
                showConfirmButton: true
              }).then((result)=>{
                location.reload();
              });
          }, (err)=>{
            const errorService = JSON.parse(err.error);
            Swal.fire('Error', errorService.message, 'error');
          })
  }


  updateClient(){
    this.sibebarService.updateClient(localStorage.getItem('userId'), this.clientForm.value).subscribe((res)=>{
          //console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Exit',
            text: 'Client modifié avec succès',
            confirmButtonText: 'OK'
          }).then((result)=>{
    
            if (result) {
              localStorage.removeItem('userId');
              location.reload();
            }
          });
        }, (err)=>{
          //const errorEdit = JSON.parse(err.error);
          Swal.fire('Error', err.error.message, 'error');
        })
  }

  deleteClient(id: number){

    Swal.fire({
          icon: 'question',
          title: 'Voulez-vous supprimer cet client',
          showCancelButton: true,
          confirmButtonText: 'Confirmer'
        }).then((result)=>{
          if (result.isConfirmed) {
            this.sibebarService.deleteClient(id).subscribe((res:any)=>{
            Swal.fire({
              icon: 'success',
              title: 'Client Supprimer avec Succés',
              confirmButtonText: 'Ok'
            }).then((result)=>{
              if (result) {
                location.reload();
              }
            })
          }, (err)=>{
            //const errorPass = JSON.parse(err.error);
            Swal.fire('Error', err.error.message, 'error');
          });
          }
        });
  }

  getMesureClientById(id: number){
    this.mesuresService.getMesureClientById(id).subscribe((res)=>{
      //console.log(res);
      this.mesureClient = res;
    })
  }

  // getMesures(){
  //   this.mesuresService.getMesures().subscribe((res)=>{
  //     console.log(res);
  //   })
  // }

  campoInvalid(comp: string): boolean{
    if (this.clientForm.get(comp).invalid && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
