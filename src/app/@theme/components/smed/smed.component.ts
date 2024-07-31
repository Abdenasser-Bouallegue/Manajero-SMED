import { tutoSMED } from './../../../../models/tutoSmed';
import { Component, OnInit } from '@angular/core';
import { SmedService } from '../../../../services/smed.service';

@Component({
  selector: 'ngx-smed',
  templateUrl: './smed.component.html',
  styleUrls: ['./smed.component.scss']
})
export class SMEDComponent implements OnInit {
  tuto: tutoSMED[] = [];
  selectedTutorial: tutoSMED;
  latestTutorial: tutoSMED | undefined;
  steps = [
    { key: 'why', label: 'Why', title: 'Why Step', content: 'Why content' },
    { key: 'what', label: 'What', title: 'What Step', content: 'What content' },
    { key: 'how', label: 'How', title: 'How Step', content: 'How content' },
    { key: 'what_if', label: 'What If', title: 'What If Step', content: 'What If content' }
  ];
  activeStep = this.steps[0].key;

  constructor(private tutoSmedService: SmedService) {}

  confirmDelete(idTuto?: string): void {
    if (!idTuto) {
      console.error('No tutorial ID provided');
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this tutorial?');
    if (confirmed) {
      this.deleteTutoSmed(idTuto);
    }
  }

  deleteTutoSmed(idTuto: string): void {
    this.tutoSmedService.deletetutoSMED(idTuto).subscribe(
      () => {
        console.log('Tutorial deleted successfully');
        this.latestTutorial = undefined;
        this.loadLatestTutorial();
      },
      (error) => {
        console.error('Error deleting tutorial:', error);
      }
    );
  }

  activateStep(key: string): void {
    this.activeStep = key;
  }

  previousStep(): void {
    const currentIndex = this.steps.findIndex(step => step.key === this.activeStep);
    if (currentIndex > 0) {
      this.activeStep = this.steps[currentIndex - 1].key;
    }
  }

  nextStep(): void {
    const currentIndex = this.steps.findIndex(step => step.key === this.activeStep);
    if (currentIndex < this.steps.length - 1) {
      this.activeStep = this.steps[currentIndex + 1].key;
    }
  }

  isFirstStep(): boolean {
    return this.activeStep === this.steps[0].key;
  }

  isLastStep(): boolean {
    return this.activeStep === this.steps[this.steps.length - 1].key;
  }

  ngOnInit() {
    this.loadLatestTutorial();
  }

  loadLatestTutorial(): void {
    this.tutoSmedService.getLatestTutorial().subscribe(
      (data) => {
        this.latestTutorial = data;
      },
      (error) => {
        console.error('Error loading latest tutorial:', error);
      }
    );
  }

  updateTutoSmed(updatedTuto: tutoSMED): void {
    if (!updatedTuto.idTuto) {
      console.error('No tutorial ID provided for update');
      return;
    }

    this.tutoSmedService.updatetutoSMED(updatedTuto.idTuto, updatedTuto).subscribe(
      (updatedTutorial: tutoSMED) => {
        console.log('Tutorial updated successfully:', updatedTutorial);
        this.latestTutorial = updatedTutorial;
        this.loadLatestTutorial(); // Optionally reload the latest tutorial
      },
      (error) => {
        console.error('Error updating tutorial:', error);
      }
    );
  }
  editTutorial(tutorial: tutoSMED) {
    this.selectedTutorial = { ...tutorial }; // Clone the tutorial to edit
  }

  onSubmit() {
    if (this.selectedTutorial) {
      this.tutoSmedService.updatetutoSMED(this.selectedTutorial.idTuto, this.selectedTutorial).subscribe(
        (updatedTutorial) => {
          console.log('Tutorial updated successfully', updatedTutorial);
          this.selectedTutorial = null;
          this.loadLatestTutorial(); // Refresh the latest tutorial
        },
        (error) => {
          console.error('Error updating tutorial', error);
        }
      );
    }}

}
