import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SmedService } from './../../../../services/smed.service';
import { projectSmed } from '../../../../models/projectSmed';
import { task } from '../../../../models/task';
import { taskType } from '../../../../models/taskType'; // Import taskType enum

@Component({
  selector: 'ngx-dash-smed',
  templateUrl: './dash-smed.component.html',
  styleUrls: ['./dash-smed.component.scss']
})
export class DashSMEDComponent implements OnInit {
  chartBar: Chart | undefined;
  chartStatus: Chart | undefined;
  chartTaskType: Chart | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private projectservice: SmedService) {}

  ngOnInit(): void {
    console.log("Initializing component");
    this.createChartBar();
    this.createChartStatus();
    this.createChartTaskType(); // Create the new task type chart
    this.getProjectByDeadline(); // Fetch project data for the bar chart
    this.getTasksByStatus(); // Fetch task data for the status chart
    this.getTasksByType(); // Fetch task data for the task type chart
  }

  createChartBar(): void {
    this.chartBar = new Chart('MyChartBar', {
      type: 'bar',
      data: {
        labels: ["deadline"], // Static "deadline" label
        datasets: [
          {
            label: "Number of Projects",
            data: [0], // Initial data
            backgroundColor: 'blue',
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
              label: (tooltipItem) => `Projects: ${tooltipItem.raw}` // Tooltip format
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'll' // Date format in tooltip
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

          this.chartBar.data.labels = ["", ...Object.keys(groupedData)];
          this.chartBar.data.datasets[0].data = [0, ...Object.values(groupedData)];

          this.chartBar.update();
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
          groupedData[date] = 0;
        }
        groupedData[date] += 1;
      }
    });

    const dates = Object.keys(groupedData);
    if (dates.length > 0) {
      const startDate = new Date(Math.min(...dates.map(d => new Date(d).getTime())));
      const endDate = new Date(Math.max(...dates.map(d => new Date(d).getTime())));
      let currentDate = startDate;

      while (currentDate <= endDate) {
        const dateStr = currentDate.toLocaleDateString();
        if (!groupedData[dateStr]) {
          groupedData[dateStr] = 0;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return groupedData;
  }

  createChartStatus(): void {
    this.chartStatus = new Chart('MyChartStatus', {
      type: 'doughnut',
      data: {
        labels: ["StandBy", "InProgress", "Completed"],
        datasets: [
          {
            label: "Task Status Distribution",
            data: [0, 0, 0], // Initial values
            backgroundColor: ['blue', 'red', 'green'], // Colors for statuses
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    });
  }

  getTasksByStatus(): void {
    this.projectservice.getAllTasks().subscribe(
      (tasks: task[]) => {
        if (this.chartStatus) {
          const statusCounts = this.calculateStatusCounts(tasks);

          const totalTasks = tasks.length;
          this.chartStatus.data.datasets[0].data = [
            (statusCounts.StandBy ),
            (statusCounts.InProgress ),
            (statusCounts.Completed )
          ];

          this.chartStatus.update();
        }
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  private calculateStatusCounts(tasks: task[]): { StandBy: number, InProgress: number, Completed: number } {
    const statusCounts = { StandBy: 0, InProgress: 0, Completed: 0 };

    tasks.forEach(task => {
      statusCounts[task.status]++;
    });

    return statusCounts;
  }

  createChartTaskType(): void {
    this.chartTaskType = new Chart('MyChartTaskType', {
      type: 'doughnut',
      data: {
        labels: ["External", "Internal"],
        datasets: [
          {
            label: "Task Type Distribution",
            data: [0, 0], // Initial values
            backgroundColor: ['#007bff', '#28a745'], // Colors for task types
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    });
  }

  getTasksByType(): void {
    this.projectservice.getAllTasks().subscribe(
      (tasks: task[]) => {
        if (this.chartTaskType) {
          const taskTypeCounts = this.calculateTaskTypeCounts(tasks);

          const totalTasks = tasks.length;
          this.chartTaskType.data.datasets[0].data = [
            (taskTypeCounts.external ),
            (taskTypeCounts.internal )
          ];

          this.chartTaskType.update();
        }
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  private calculateTaskTypeCounts(tasks: task[]): { external: number, internal: number } {
    const taskTypeCounts = { external: 0, internal: 0 };

    tasks.forEach(task => {
      taskTypeCounts[task.taskType]++;
    });

    return taskTypeCounts;
  }
}
