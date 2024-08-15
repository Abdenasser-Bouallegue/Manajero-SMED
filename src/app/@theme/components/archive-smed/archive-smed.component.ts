import { SmedService } from './../../../../services/smed.service';
import { Component, OnInit } from '@angular/core';
import { projectSmed } from '../../../../models/projectSmed';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-archive-smed',
  templateUrl: './archive-smed.component.html',
  styleUrls: ['./archive-smed.component.scss']
})
export class ArchiveSMEDComponent implements OnInit{
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




  constructor(private SmedService: SmedService ,private fb: FormBuilder ,private router: Router,

  ) {}

  ngOnInit(): void {
    this.fetchArchived();
}


fetchArchived(): void {
  this.SmedService.getAllProjectSMED().subscribe(
    (project: projectSmed[]) => {
      this.projects = project.filter(project => project.archived === true);
    },
    (error) => {
      console.error('Error fetching feedbacks:', error);
    }
  );
}

Unarchived(project: projectSmed): void {
  const confirmation = confirm('Are you sure you want to unarchive this project?');

  if (confirmation) {
      project.archived = false;
      this.SmedService.unarchived(project).subscribe(
          () => {
              this.projects.push(project);
              window.location.reload();
          },
          (error) => {
              console.error('Error unarchiving project:', error);
          }
      );
  }
}

confirmDelete(idProject: number): void {
  const confirmed = confirm('Are you sure you want to delete this project?');
  if (confirmed) {
    this.deleteProjectSmed(idProject);
  }
}

deleteProjectSmed(idProject: number): void {
  this.SmedService.deleteProjectSMED(idProject).subscribe(
    () => {
      console.log('Project deleted successfully');
      window.location.reload();
    },
    (error) => {
      console.error('Error deleting project:', error);
    }
  );
}

}
