import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmedService } from '../../../../services/smed.service';
import { Router, ActivatedRoute } from '@angular/router';

import { taskType } from '../../../../models/taskType'; // Ensure taskType enum or type is imported
import { task } from '../../../../models/task';

@Component({
  selector: 'ngx-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  TaskForm: FormGroup;
  taskTypes = Object.values(taskType); // Populate the form with available task types
  projectId: string;

  constructor(
    private smedService: SmedService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute // To get projectId from route params
  ) {
    this.TaskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      desc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      estimatedTime: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      Deadline: [new Date(), Validators.required],
      Employer: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      taskType: [taskType.internal, Validators.required], // Adjust as needed
    });
  }

  ngOnInit(): void {
    // Get projectId from route parameters
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId') || ''; // Adjust as needed
    });
  }

  addTask(): void {
    if (this.TaskForm.valid) {
      const newTask: task = {
        ...this.TaskForm.value,
        projectId: this.projectId // Include projectId in the task
      };
      this.smedService.addTask(newTask).subscribe(
        (createdTask: task) => {
          console.log('Task Created successfully:', createdTask);
          alert('Task SMED Created successfully!');
          this.router.navigate(['/pages/lean/smed/list']);
        },
        (error) => {
          console.error('Error creating task:', error);
          alert('Failed to create task SMED. Please try again later.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
