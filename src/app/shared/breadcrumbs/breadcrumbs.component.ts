import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  public title:String;

  constructor(private router:Router) {
    this.getArguments();
   }

   getArguments(){
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd)=> event.snapshot.firstChild === null),
      map((event: ActivationEnd)=> event.snapshot.data)
    )
    .subscribe(({title})=>{
      this.title = title;
      document.title = `AdminLte - ${title}`;
    })
   }

}
