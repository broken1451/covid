import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CovidService } from '../../services/covid.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-pais-detail',
  templateUrl: './pais-detail.component.html',
  styleUrls: ['./pais-detail.component.scss']
})
export class PaisDetailComponent implements OnInit {

   public displayedColumns: string[] = ['Country', 'CountryCode', 'Lat', 'Lon', 'Confirmed', 'Deaths', 'Recovered', 'Active', 'Date', 'Details'];
   public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private activatedRoute: ActivatedRoute, private covidService: CovidService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametrosUrl: Params) => {
      const country = parametrosUrl['country'];
      console.log({parametrosUrl});
      this.getCasesByCountry(country);
    });
  }


  getCasesByCountry(country: string){
    this.covidService.getCasesByCountry(country).subscribe((data) => {
      data.forEach(( element: any, i: any ) => {
        // this.paises = element;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      // this.dataSource = data;
      console.log({data});
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ver(row){
    console.log({row})
  }

}
