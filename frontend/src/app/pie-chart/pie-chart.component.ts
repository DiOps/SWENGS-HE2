import { ExpenseService } from './../service/expense.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  chartData;
  chartDataConv = [];
  chartDataConvSort = [];

  keysMap = {
    name: 'name',
    amount: 'value'
  };

  single = [];
  view = [] = [700, 400];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    // get the chart data styled like the single object below
    const data = this.route.snapshot.data;
    this.chartData = data.chartData;

    // changes the key names
    for (const x of this.chartData) {
      const newobj = this.renameProp('amount', 'value', x);
      this.chartDataConv.push(newobj);
    }

    // change key names again so it is correctly sorted (testing purposes)
    for (const x of this.chartDataConv) {
      const newobj = this.renameProp('name', 'name', x);
      this.chartDataConvSort.push(newobj);
    }

    // the above should equal to the below

    const single = [
      {
        name: 'Bianca',
        value: 30
      },
      {
        name: 'Felix',
        value: 50
      },
      {
        name: 'Bianca',
        value: 80
      },
      {
        name: 'Felix',
        value: 30
      }
    ];

    const newSingle = this.chartDataConvSort;
    // console.log(single);
    // console.log(newSingle);

    // if newSingle is applied below, the chart doesn't work :(
    Object.assign(this, { single });
  }

  // function for renaming keys of objects
  renameProp = (
    oldProp,
    newProp,
    { [oldProp]: old, ...others }
  ) => ({
    [newProp]: old,
    ...others
  })

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
