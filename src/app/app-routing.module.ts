import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryComponent } from './components/country/country.component';
import { RelevantesComponent } from './components/relevantes/relevantes.component';
import { PaisDetailComponent } from './components/pais-detail/pais-detail.component';
import { DetailComponent } from './components/detail/detail.component';
import { SumaryComponent } from './components/sumary/sumary.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'relevantes',
        component: RelevantesComponent,
      },
      { path: 'countries', component: CountryComponent },
      { path: 'paisDetail/:country', component: PaisDetailComponent },
      { path: 'detail/:country/:status', component: DetailComponent },
      { path: 'sumary', component: SumaryComponent },
    ],
  },
  // { path: 'path4', component: Name4Component },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
