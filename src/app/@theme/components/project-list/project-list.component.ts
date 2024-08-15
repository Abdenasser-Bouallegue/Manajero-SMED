import { SmedService } from './../../../../services/smed.service';
import { Component, OnInit } from '@angular/core';
import { projectSmed } from '../../../../models/projectSmed';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: projectSmed[] = [];
  ProjectForm: FormGroup;
  showPopup: boolean = false;
  isPopupUpdateOpen = false;


  projectToUpdate: projectSmed = {
    idProject: "",
    nameProject: '',
    deadline:null,
    estimatedTime:null,

  };


  openPopupUpdate(p: projectSmed): void {
    this.showPopup = true;
    console.log(this.projectToUpdate);
    const popup = document.getElementById('popupUpdate');
    this.projectToUpdate = p;
    this.isPopupUpdateOpen = true;

    console.log(this.projectToUpdate);

    if (popup) {
        popup.style.display = 'block';
    }
  }
  closePopupUpdate(): void {
  this.showPopup=false;

  }

  constructor(private SmedService: SmedService ,private fb: FormBuilder ,private router: Router,

  ) {    this.ProjectForm = this.fb.group({
    nameProject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    deadline: ['', Validators.required],
    estimatedTime: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  });}

  updateProject(): void {
    console.log(this.projectToUpdate);

    this.SmedService.updateProjectSMED(this.projectToUpdate).subscribe(
      (updatedProject: projectSmed) => {
        console.log('Project updated successfully:', updatedProject);
        this.showPopup = false;


      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }

  ngOnInit(): void {

    this.fetchProject();
  }

  getProjects(): void {
    this.SmedService.getAllProjectSMED().subscribe((data: projectSmed[]) => {
      this.projects = data;
    });
  }

  //archive
  archived(projet: projectSmed): void {
    const confirmation = confirm('Are you sure you want to archive this project?');

    if (confirmation) {
        projet.archived = true;
        this.SmedService.archived(projet).subscribe(
            () => {
                this.fetchProject();
            },
            (error) => {
                console.error('Error archiving project:', error);
            }
        );
    }
}

fetchProject(): void {
    this.SmedService.getAllProjectSMED().subscribe(
        (projets: projectSmed[]) => {
            this.projects = projets.filter(projet => !projet.archived);
        },
        (error) => {
            console.error('Error fetching projects:', error);
        }
    );
}


}
