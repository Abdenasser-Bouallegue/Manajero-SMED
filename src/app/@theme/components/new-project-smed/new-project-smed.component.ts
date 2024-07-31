import { SmedService } from './../../../../services/smed.service';
import { Component } from '@angular/core';
import { projectSmed } from '../../../../models/projectSmed';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-new-project-smed',
  templateUrl: './new-project-smed.component.html',
  styleUrls: ['./new-project-smed.component.scss']
})
export class NewProjectSMEDComponent  {
  newProject: projectSmed = {
    nameProject: "",
    deadline: new Date(),
    estimatedTime: 0
  };
  ProjectForm: FormGroup;

  constructor(
    private smedService: SmedService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.ProjectForm = this.fb.group({
      nameProject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      deadline: ['', Validators.required],
      estimatedTime: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }



  addProjectSmed(): void {
    if (this.ProjectForm.valid) {
      const newProject: projectSmed = this.ProjectForm.value;
      this.smedService.addprojectSMED(newProject).subscribe(
        (createdProject: projectSmed) => {
          console.log('Project Created successfully:', createdProject);
          alert('Project SMED Created successfully!');
          this.router.navigate(['/pages/lean/smed/list']);
        },
        (error) => {
          console.error('Error creating project:', error);

          alert('Failed to create project SMED. Please try again later.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
