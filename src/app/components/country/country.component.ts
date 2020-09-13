import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { CovidService } from '../../services/covid.service';
import { Router } from '@angular/router';


export interface CountryCovid {
  Country: string;
  Slug: string;
  ISO2: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['Country', 'ISO2', 'Slug', 'details'];
  public dataSource: MatTableDataSource<any>;
  public paises: CountryCovid[] = [];
  public loading: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  events: string[] = [];

  constructor(private covidService: CovidService, private router: Router) {
    this.loading = true;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log({type, event: event.value});
  }

  ngOnInit(): void {
    // this.loading = true;
    this.covidService.getCountries().subscribe((paises) => {
      // this.paises =  paises;
      // console.log( paises);
      setTimeout(() => {
        paises.forEach(( element: any, i: any ) => {
          this.paises = element;
          this.dataSource = new MatTableDataSource(paises);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.loading = false;
      }, 3000);
    });

    // this.dataSource = new MatTableDataSource(this.paises);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ver(row: any){
    console.log({row});
    this.router.navigate(['/paisDetail', row.Slug]);
  }
}

