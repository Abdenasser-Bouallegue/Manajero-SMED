import { Component } from '@angular/core';
import { tutoSMED } from '../../../../models/tutoSmed';
import { SmedService } from '../../../../services/smed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-new-tuto',
  templateUrl: './new-tuto.component.html',
  styleUrls: ['./new-tuto.component.scss']
})
export class NewTutoComponent {
  newTuto: tutoSMED = {
    idTuto: null,
    how: "",
    what: "",
    why: "",
    what_if: "",
    image_how: null,
    image_what: null,
  };

  constructor(private tutoSmedService: SmedService,private router: Router,) {}

  onFileSelected(event: any, type: string): void {
    const file = event.target.files[0];
    if (file) {
      if (type === 'image_how') {
        this.newTuto.image_how = file;
      } else if (type === 'image_what') {
        this.newTuto.image_what = file;
      }
    }
  }

  onSubmit(): void {
    console.log('Tuto submitted:', this.newTuto);
    this.addTuto();
  }

  addTuto(): void {
    const formData = new FormData();
    formData.append('how', this.newTuto.how);
    formData.append('why', this.newTuto.why);
    formData.append('what', this.newTuto.what);
    formData.append('what_if', this.newTuto.what_if);
    if (this.newTuto.image_how) {
      formData.append('image_how', this.newTuto.image_how);
    }
    if (this.newTuto.image_what) {
      formData.append('image_what', this.newTuto.image_what);
    }

    this.tutoSmedService.addtutotSMED(formData).subscribe(
      (createdTuto: tutoSMED) => {
        console.log('Added successfully:', createdTuto);
        this.router.navigate(['/pages/lean/smed']);
      },
      (error) => {
        console.error('Error adding tuto:', error);
      }
    );
  }
}
