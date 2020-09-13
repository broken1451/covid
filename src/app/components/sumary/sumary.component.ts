import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.scss'],
})
export class SumaryComponent implements OnInit {
  displayedColumns: string[] = [
    'Country',
    'NewConfirmed',
    'NewDeaths',
    'NewRecovered',
    'TotalConfirmed',
    'TotalDeaths',
    'TotalRecovered',
  ];
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = [
    'NewConfirmed',
    'NewDeaths',
    'NewRecovered',
    'TotalConfirmed',
    'TotalDeaths',
    'TotalRecovered',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A' },
  ];

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.getSumary();
  }

  public getSumary() {
    this.covidService.getSumary().subscribe((sumary: any) => {
      // tslint:disable-next-line: max-line-length
      this.dataSource = new MatTableDataSource(sumary.Countries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.barChartData = [
        {
          data: [
            sumary.Global.NewConfirmed,
            sumary.Global.NewDeaths,
            sumary.Global.NewRecovered,
            sumary.Global.TotalConfirmed,
            sumary.Global.TotalDeaths,
            sumary.Global.TotalRecovered,
          ],
          label: 'algo',
        },
      ];
      console.log({ sumary: sumary.Countries });
    });
  }
}
