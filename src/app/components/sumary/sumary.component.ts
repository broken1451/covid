import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CovidService } from '../../services/covid.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.scss'],
})
export class SumaryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

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
      console.log({ sumary });
    });
  }
}
