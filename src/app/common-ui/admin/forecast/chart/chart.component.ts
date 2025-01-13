import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Forecast } from '../../../../data/interfaces/forecast.interface';
import { ForecastService } from '../../../../data/services/forecast.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  standalone: true
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  data: Forecast[] = []
  forecastService = inject(ForecastService)
  private chart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.forecastService.getForecast()
      .subscribe(val => {
        this.data = [...val]
        console.log(val)
        console.log(this.data)
      });
    this.createChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      console.log(this.data)
      setTimeout(() => {
        const borderColors = this.data.map((_, index) => {
          return index === this.data.length - 1 ? 'red' : 'blue'; // Красный для последней колонки, синий для остальных
        });
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.data.map(item => item.month),
            datasets: [{
              label: 'Количество посетителей',
              data: this.data.map(item => item.count),
              borderColor: borderColors,
              backgroundColor: borderColors,
              borderWidth: 2,
              segment: {
                borderColor: (context) => {
                  return context.p0DataIndex >= this.data.length - 2 ? 'red' : 'blue'
                }
              },
              fill: false,
              tension: 0.2,
            },]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 50,
                ticks: {
                  stepSize: 10
                }
              }
            }
          }
        });
      }, 100)
    }
  }
}
