import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmedService } from './../../../../services/smed.service';
import { task } from '../../../../models/task';

@Component({
  selector: 'ngx-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskId: string | null = null;
  taskDetails: task | undefined;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private smedService: SmedService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
      if (this.taskId) {
        this.getTaskDetails(this.taskId);
      } else {
        console.error('Invalid task ID:', this.taskId);
        this.isLoading = false;
      }
    });
  }

  getTaskDetails(idTask: string): void {
    this.smedService.getTaskById(idTask).subscribe(
      (taskDetails: task) => {
        this.taskDetails = taskDetails;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching task details', error);
        this.isLoading = false;
      }
    );
  }
}
