import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SmedService } from './../../../../services/smed.service';
import { projectSmed } from '../../../../models/projectSmed';

@Component({
  selector: 'ngx-dash-smed',
  templateUrl: './dash-smed.component.html',
  styleUrls: ['./dash-smed.component.scss']
})
export class DashSMEDComponent implements OnInit {
  chartBar: Chart | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private projectservice: SmedService) {}

  ngOnInit(): void {
    console.log("Initializing component");
    this.createChartBar();
    this.getProjectByDeadline(); // Fetch data after chart is created
  }

  createChartBar(): void {
    this.chartBar = new Chart('MyChartBar', {
      type: 'bar', // This denotes the type of chart
      data: { // Values on X-Axis
        labels: ["deadline"], // Add static "deadline" label as the first date
        datasets: [
          {
            label: "Number of Projects", // Provide a meaningful label
            data: [0], // Start with 0 projects for the "deadline" label
            backgroundColor: 'blue', // Use single color for simplicity
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `Projects: ${tooltipItem.raw}`; // Format tooltip
              }
            }
          }
        },
        scales: {
          x: {
            type: 'time', // Use time scale for x-axis
            time: {
              unit: 'day',
              tooltipFormat: 'll' // Format date in tooltip
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Projects'
            }
          }
        }
      }
    });
  }

  getProjectByDeadline(): void {
    this.projectservice.getAllProjectSMED().subscribe(
      (data: projectSmed[]) => {
        if (this.chartBar) {
          const groupedData = this.groupByDate(data);

          this.chartBar.data.labels = [,...Object.keys(groupedData)]; // Add the dynamic dates after "deadline"
          this.chartBar.data.datasets[0].data = [0, ...Object.values(groupedData)]; // Add the project counts after 0

          this.chartBar.update(); // Update chart with new data
        }
      },
      (error) => {
        console.error('Error fetching project data:', error);
      }
    );
  }

  private groupByDate(data: projectSmed[]): { [key: string]: number } {
    const groupedData: { [key: string]: number } = {};

    data.forEach(project => {
      if (project.deadline) {
        const date = new Date(project.deadline).toLocaleDateString();
        if (!groupedData[date]) {
          groupedData[date] = 0; // Initialize to zero if not already present
        }
        groupedData[date] += 1; // Increment count for the project on this date
      }
    });

    // Ensure all dates from the start to end of the range have zero counts
    const dates = Object.keys(groupedData);
    if (dates.length > 0) {
      const startDate = new Date(Math.min(...dates.map(d => new Date(d).getTime())));
      const endDate = new Date(Math.max(...dates.map(d => new Date(d).getTime())));
      let currentDate = startDate;

      while (currentDate <= endDate) {
        const dateStr = currentDate.toLocaleDateString();
        if (!groupedData[dateStr]) {
          groupedData[dateStr] = 0; // Ensure date is included with zero count
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return groupedData;
  }
}
