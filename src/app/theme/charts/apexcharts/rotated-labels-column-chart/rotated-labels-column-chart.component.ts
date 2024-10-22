import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexAnnotations,
    ApexFill,
    ApexStroke,
    ApexGrid,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: any; //ApexXAxis;
    annotations: ApexAnnotations;
    fill: ApexFill;
    stroke: ApexStroke;
    grid: ApexGrid;
};

@Component({
    selector: 'app-rotated-labels-column-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './rotated-labels-column-chart.component.html',
    styleUrl: './rotated-labels-column-chart.component.scss'
})
export class RotatedLabelsColumnChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Servings",
                    data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
                }
            ],
            annotations: {
                points: [
                    {
                        x: "Bananas",
                        seriesIndex: 0,
                        label: {
                            borderColor: "#0f79f3",
                            offsetY: 0,
                            style: {
                                fontSize: '14px',
                                color: "#ffffff",
                                background: "#0f79f3"
                            },
                            text: "Bananas are good"
                        }
                    }
                ]
            },
            chart: {
                height: 350,
                type: "bar",
                toolbar: {
                    show: true
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "50%",
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2
            },
            grid: {
                row: {
                    colors: ["#ffffff", "#f4f6fc"]
                },
                show: true,
                strokeDashArray: 5,
                borderColor: "#e0e0e0"
            },
            xaxis: {
                axisBorder: {
                    show: false,
                    color: '#e0e0e0'
                },
                axisTicks: {
                    show: true,
                    color: '#e0e0e0'
                },
                labels: {
                    rotate: -45,
                    show: true,
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                },
                categories: [
                    "Apples",
                    "Oranges",
                    "Strawberries",
                    "Pineapples",
                    "Mangoes",
                    "Bananas",
                    "Blackberries",
                    "Pears",
                    "Watermelons",
                    "Cherries",
                    "Pomegranates",
                    "Tangerines",
                    "Papayas"
                ],
                tickPlacement: "on"
            },
            yaxis: {
                title: {
                    text: "Servings",
                    style: {
                        color: "#475569",
                        fontSize: "14px",
                        fontWeight: 500
                    }
                },
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
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 0.85,
                    opacityTo: 0.85,
                    // stops: [50, 0, 100]
                }
            }
        };
    }

}