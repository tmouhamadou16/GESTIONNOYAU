import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Mesure } from './models/mesure.model';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MesuresService } from './services/mesures.service';

@Component({
  selector: 'app-mesures',
  templateUrl: './mesures.component.html',
  styleUrls: ['./mesures.component.css']
})
export class MesuresComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
      dtElement: DataTableDirective | undefined;
    
      dtOptions: DataTables.Settings = {};
      dtTrigger: Subject<any> = new Subject<any>();
      //clients: any
      mesures: Mesure[]=[];
      
      formSubmitted = false;

  public mesureForm = this.fb.group({
            coup:['', [Validators.required]],
            epaule:['', [Validators.required]],
            mache:['', [Validators.required]],
            tourM:['', [Validators.required]],
            poitrine:['', [Validators.required]],
            taille:['', [Validators.required]],
            longueurB:['', [Validators.required]],
            longueurGB:['', [Validators.required]],
            ceinture:['', [Validators.required]],
            hanche:['', [Validators.required]],
            fesse:['', [Validators.required]],
            cuisse:['', [Validators.required]],
            genou:['', [Validators.required]],
            pantalonL:['', [Validators.required]],
            bas:['', [Validators.required]]
          });
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private mesureService: MesuresService
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
    this.getAllMesures();
  }

  getAllMesures(){
    //const user = localStorage.getItem('token');
    this.mesureService.getMesures().subscribe((res)=>{
      //console.log(res);
      this.mesures = res;
      this.dtTrigger.next(null);   
    });
  }


  getMesureById(id: number){
    this.mesureService.getMesureById(id).subscribe((res)=>{
      //console.log(res);
      this.mesureForm.setValue({
        coup: res['coup'],
        epaule: res['epaule'],
        mache: res['mache'],
        tourM: res['tourM'],
        poitrine: res['poitrine'],
        taille: res['taille'],
        longueurB: res['longueurB'],
        longueurGB: res['longueurGB'],
        ceinture: res['ceinture'],
        hanche: res['hanche'],
        fesse: res['fesse'],
        cuisse: res['cuisse'],
        genou: res['genou'],
        pantalonL: res['pantalonL'],
        bas: res['bas']
      });
      //const id = res[+'id'];
      localStorage.setItem("mesureId", res[+'id']);
    });

  }

  addMesure(){
      this.formSubmitted = true;
          if (this.mesureForm.invalid) {
            return;
          }
          this.mesureService.addMesure(this.mesureForm.value).subscribe(res => {
                //console.log(res);
                Swal.fire({
                  icon: 'success',
                  title: 'Exit',
                  text: 'Mesure ajoutée avec succès',
                  showConfirmButton: true
                }).then((result)=>{
                  location.reload();
                });
            }, (err)=>{
              const errorService = JSON.parse(err.error);
              Swal.fire('Error', errorService.message, 'error');
            })
    }


    updateMesure(){
        this.mesureService.updateMesure(localStorage.getItem('mesureId'), this.mesureForm.value).subscribe((res)=>{
              //console.log(res);
              Swal.fire({
                icon: 'success',
                title: 'Exit',
                text: 'mesure modifié avec succès',
                confirmButtonText: 'OK'
              }).then((result)=>{
        
                if (result) {
                  localStorage.removeItem('mesureId');
                  location.reload();
                }
              });
            }, (err)=>{
              //const errorEdit = JSON.parse(err.error);
              Swal.fire('Error', err.error.message, 'error');
            })
      }

  deleteMesure(id: number){
  
      Swal.fire({
            icon: 'question',
            title: 'Voulez-vous supprimer cet mesure',
            showCancelButton: true,
            confirmButtonText: 'Confirmer'
          }).then((result)=>{
            if (result.isConfirmed) {
              this.mesureService.deleteMesure(id).subscribe((res:any)=>{
              Swal.fire({
                icon: 'success',
                title: 'Mesure Supprimer avec Succés',
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


  campoInvalid(comp: string): boolean{
    if (this.mesureForm.get(comp).invalid && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  
}
