import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmedService } from './../../../../services/smed.service';
import { task } from '../../../../models/task';
import { Status } from '../../../../models/Status';

@Component({
  selector: 'ngx-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  taskId: string | null = null;
  taskDetails: task | undefined;
  isLoading: boolean = true;
  countdownDisplay: string = '10:00';
  private countdownStartTime: number = 10 * 60 * 1000; // 10 minutes in milliseconds
  private countdownTime: number = this.countdownStartTime;
  private countdownInterval: any;
  showPopup: boolean = false;
  isPopupUpdateOpen = false;

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

  ngOnDestroy(): void {
    this.stopCountdown();
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

  updateTaskStatus(): void {
    if (this.taskDetails) {
      this.taskDetails.status = Status.InProgress;
      this.smedService.updateTask(this.taskDetails.idTask, this.taskDetails).subscribe(
        (updatedTask: task) => {
          console.log('Task status updated successfully:', updatedTask);
          this.startCountdown(); // Start the countdown when task status is updated
        },
        (error) => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }
  updateTaskStatus2(): void {
    if (this.taskDetails) {
      this.taskDetails.status = Status.Completed;
      this.smedService.updateTask(this.taskDetails.idTask, this.taskDetails).subscribe(
        (updatedTask: task) => {
          console.log('Task status updated successfully:', updatedTask);
          this.closePopupUpdate(); // Close the popup after updating the task status
        },
        (error) => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }


  startCountdown(): void {
    if (!this.countdownInterval) {
      this.countdownInterval = setInterval(() => {
        if (this.countdownTime > 0) {
          this.countdownTime -= 1000;
          this.countdownDisplay = this.formatTime(this.countdownTime);
        } else {
          this.stopCountdown();
        }
      }, 1000);
    }
  }

  stopCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  resetCountdown(): void {
    this.stopCountdown();
    this.countdownTime = this.countdownStartTime;
    this.countdownDisplay = this.formatTime(this.countdownTime);
  }

  private formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return this.pad(minutes, 2) + ':' + this.pad(seconds, 2);
  }

  private pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

//popup
openPop(): void {
  this.showPopup = true;
  this.isPopupUpdateOpen = true;
}

closePopupUpdate(): void {
  this.showPopup = false;
}
}
