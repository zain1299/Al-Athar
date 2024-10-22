import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexXAxis,
    ApexDataLabels,
    ApexGrid,
    ApexLegend,
    ApexYAxis,
    ApexTitleSubtitle,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    yaxis: ApexYAxis;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
    fill: ApexFill;
    dataLabels: ApexDataLabels;
};

@Component({
    selector: 'app-basic-bubble-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './basic-bubble-chart.component.html',
    styleUrl: './basic-bubble-chart.component.scss'
})
export class BasicBubbleChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Bubble 1",
                    data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60
                    })
                },
                {
                    name: "Bubble 2",
                    data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60
                    })
                },
                {
                    name: "Bubble 3",
                    data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60
                    })
                },
                {
                    name: "Bubble 4",
                    data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60
                    })
                }
            ],
            chart: {
                height: 350,
                type: "bubble",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 0.8
            },
            title: {
                text: undefined
            },
            xaxis: {
                tickAmount: 12,
                type: "category",
                axisBorder: {
                    show: false,
                    color: '#e0e0e0'
                },
                axisTicks: {
                    show: false,
                    color: '#e0e0e0'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                }
            },
            yaxis: {
                max: 70,
                labels: {
                    show: true,
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                },
                axisBorder: {
                    show: false
                }
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#e0e0e0"
            },
            legend: {
                position: 'bottom',
                fontSize: "14px",
                labels: {
                    colors: '#919aa3'
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
                }
            }
        };
    }

    public generateData(baseval:any, count:any, yrange:any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }

}