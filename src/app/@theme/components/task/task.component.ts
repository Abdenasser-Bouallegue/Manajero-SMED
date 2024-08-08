import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmedService } from '../../../../services/smed.service';
import { Router, ActivatedRoute } from '@angular/router';

import { taskType } from '../../../../models/taskType'; // Assurez-vous que l'enum ou le type taskType est importé
import { task } from '../../../../models/task';

@Component({
  selector: 'ngx-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  TaskForm: FormGroup;
  taskTypes = Object.values(taskType); // Remplir le formulaire avec les types de tâches disponibles
  projectId: string;

  constructor(
    private smedService: SmedService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute // Pour obtenir le projectId depuis les paramètres de la route
  ) {
    this.TaskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      desc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      estimatedTime: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
      deadline: [null, Validators.required], // Modifié pour accepter les dates nulles
      employer: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      taskType: [taskType.internal, Validators.required], // Ajustez au besoin
    });
  }

  ngOnInit(): void {
    // Obtenez le projectId depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId') || ''; // Ajustez si nécessaire
    });
  }

  addTask(): void {
    if (this.TaskForm.valid) {
      const newTask: task = {
        ...this.TaskForm.value,
        projectId: this.projectId // Inclure le projectId dans la tâche
      };
      this.smedService.addTask(newTask).subscribe(
        (createdTask: task) => {
          console.log('Task Created successfully:', createdTask);
          alert('Task SMED Created successfully!');
          this.router.navigate(['/pages/lean/smed/show', this.projectId]);

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
