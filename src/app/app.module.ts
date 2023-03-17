import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemeComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path:'accueil', component:AccueilComponent},
      { path:'probleme', component:ProblemeComponent},    
      { path:'', redirectTo:'accueil', pathMatch:'full'},
      { path:'**', redirectTo:'accueil', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
