import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public displayedColumns: string[] = ['Country', 'CountryCode', 'Lat', 'Lon', 'Confirmed', 'Deaths', 'Recovered', 'Active', 'Date', 'Details'];
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public loading: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router , private covidService: CovidService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametrosUrl: Params) => {
      const country = parametrosUrl['country'];
      const status = parametrosUrl['status'];
      console.log({parametrosUrl});
      this.getCasos(country, status);
    });
  }



  getCasos(country: string, status: string){
    this.covidService.getCasesEvery10Seconds(country, status).subscribe((data) => {
      data.forEach(( element: any, i: any ) => {
        // this.paises = element;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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
    this.router.navigate(['/detail', row.Country, row.Confirmed])
    console.log({row});
  }

}
