
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SmedService } from './../../../../services/smed.service';
import { projectSmed } from '../../../../models/projectSmed';
import { task } from '../../../../models/task';


@Component({
  selector: 'ngx-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.scss']
})
export class ShowProjectComponent implements OnInit {
  taskToUpdate: task = {
    idTask: '',
    taskName :'',
    desc: '',
    estimatedTime: null,
    deadline: null,
    employer: null,
    taskType: null,
    status:null
  };
  projectDetails: projectSmed | undefined;
  tasks: task[] = [];  // Assurez-vous que c'est le bon type
  isLoading: boolean = true;
  projectId: string | null = null;
  showPopup: boolean = false;
  isPopupUpdateOpen = false;

  constructor(
    private smedService: SmedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      if (this.projectId) {
        this.getProject(this.projectId);
        this.getTasks(this.projectId);
      } else {
        console.error('Invalid project ID:', this.projectId);
        this.isLoading = false;
      }
    });

    this.initApp();
  }

  getProject(idProject: string): void {
    this.smedService.getProjectSmedById(idProject).subscribe(
      (projectDetails: projectSmed) => {
        this.projectDetails = projectDetails;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching project', error);
        this.isLoading = false;
      }
    );
  }

  getTasks(idProject: string): void {
    this.smedService.getTasksByProjectId(idProject).subscribe(
      (tasks: task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  initApp(): void {
    this.datetime();
    this.sideNav();
    this.searchBar();
    this.navigation();
    this.hyperlinks();
    setInterval(() => this.datetime(), 1000);
  }

  datetime(): void {
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date: Date = new Date();
    let year: number = date.getFullYear();
    const day: number = date.getDay();
    const month: number = date.getMonth();
    let dayOfMonth: number | string = date.getDate();
    let hours: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();
    let seconds: number | string = date.getSeconds();
    let period: string = "AM";

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) hours -= 12;
    }
    if (hours === 0) hours = 12;
    if (dayOfMonth < 10) dayOfMonth = "0" + dayOfMonth;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    const dayElement = document.querySelector(".welcome .datetime .day");
    if (dayElement) dayElement.textContent = days[day];
    const dateElement = document.querySelector(".welcome .datetime .date");
    if (dateElement) dateElement.textContent = `${months[month]} ${dayOfMonth}, ${year}`;
    const timeElement = document.querySelector(".welcome .datetime .time");
    if (timeElement) timeElement.textContent = `${hours}:${minutes}:${seconds} ${period}`;
  }

  title(e: string): void {
    const headerTitle = document.querySelector(".header>.title");
    if (headerTitle) {
      headerTitle.textContent = e;
    }
  }

  sideNav(): void {
    this.sideToggle();
    this.sideNavigation();
  }

  sideToggle(): void {
    const navIcon = document.querySelector(".ion-ios-navicon");
    const sidebar = document.querySelector(".sidebar");
    const sidebarOverlay = document.querySelector(".sidebar .sidebar-overlay");

    const handleNavToggle = (e: Event) => {
      e.preventDefault();
      sidebar?.classList.toggle("active");
      const nav = document.querySelector(".nav");
      nav?.classList.remove("active");
      sidebarOverlay?.classList.remove("fadeOut", "animated");
      sidebarOverlay?.classList.add("fadeIn", "animated");
    };

    const handleSidebarOverlay = (e: Event) => {
      e.preventDefault();
      const navIcon = document.querySelector(".ion-ios-navicon") as HTMLElement;
      navIcon.click();
      sidebarOverlay?.classList.remove("fadeIn");
      sidebarOverlay?.classList.add("fadeOut");
    };

    navIcon?.addEventListener("touchstart", handleNavToggle);
    navIcon?.addEventListener("click", handleNavToggle);
    sidebarOverlay?.addEventListener("touchstart", handleSidebarOverlay);
    sidebarOverlay?.addEventListener("click", handleSidebarOverlay);
  }

  sideNavigation(): void {
    const navLinks = document.querySelectorAll(".nav-left a");
    navLinks.forEach(link => {
      const handleNavLink = (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        const href = target.getAttribute("href")!.replace("#", "");
        const sidebar = document.querySelector(".sidebar");
        sidebar?.classList.toggle("active");
        const htmlElements = document.querySelectorAll(".html");
        htmlElements.forEach(el => el.classList.remove("visible"));
        const targetElement = document.querySelector(`.html.${href}`);
        if (targetElement) {
          targetElement.classList.add("visible");
        } else {
          document.querySelector(".html.welcome")?.classList.add("visible");
        }
        this.title(target.textContent || "");
      };

      link.addEventListener("touchstart", handleNavLink);
      link.addEventListener("click", handleNavLink);
    });
  }

  searchBar(): void {
    const searchIcon = document.querySelector(".header .ion-ios-search");
    const searchInput = document.querySelector(".header .search input") as HTMLInputElement;

    const handleSearch = () => {
      const searchTerm = searchInput.value;
      if (searchTerm) {
        this.searchHtml(searchTerm);
      } else {
        const nav = document.querySelector(".nav");
        nav?.classList.remove("active");
        searchInput.focus();
        searchInput.classList.toggle("search-visible");
      }
    };

    const handleSearchSubmit = (e: Event) => {
      e.preventDefault();
      this.searchHtml(searchInput.value);
    };

    searchIcon?.addEventListener("touchstart", handleSearch);
    searchIcon?.addEventListener("click", handleSearch);

    const searchForm = document.querySelector(".search form");
    searchForm?.addEventListener("submit", handleSearchSubmit);
  }

  searchHtml(searchTerm: string): void {
    const searchInput = document.querySelector(".search input") as HTMLInputElement;
    searchInput.classList.remove("search-visible");

    const htmlElements = document.querySelectorAll(".html");
    htmlElements.forEach(el => el.classList.remove("visible"));

    const searchHtml = document.querySelector(".html.search");
    searchHtml?.classList.add("visible");

    this.title("Result");

    const keyElement = document.querySelector(".html.search .key");
    if (keyElement) {
      keyElement.textContent = searchTerm;
    }

    searchInput.value = "";
  }

  navigation(): void {
    const masks = document.querySelectorAll(".nav .mask");
    masks.forEach(mask => {
      const handleMaskClick = (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        target.parentElement?.classList.toggle("active");
      };
      mask.addEventListener("touchstart", handleMaskClick);
      mask.addEventListener("click", handleMaskClick);
    });
  }

  hyperlinks(): void {
    const navItems = document.querySelectorAll(".nav .nav-item");
    navItems.forEach(item => {
      const handleNavItemClick = (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        const href = target.getAttribute("href")!.replace("#", "");
        const htmlElements = document.querySelectorAll(".html");
        htmlElements.forEach(el => el.classList.remove("visible"));

        const targetElement = document.querySelector(`.html.${href}`);
        if (targetElement) {
          targetElement.classList.add("visible");
        }

        const nav = document.querySelector(".nav");
        nav?.classList.toggle("active");

        this.title(target.textContent || "");
      };

      item.addEventListener("click", handleNavItemClick);
    });
  }
  //task
  confirmDelete(idTask: string): void {
    const confirmed = confirm('Are you sure you want to delete this Task?');
    if (confirmed) {
      this.deleteTask(idTask);
    }
  }

  deleteTask(idTask: string): void {
    this.smedService.deleteTask(idTask).subscribe(
      () => {
        console.log('task deleted successfully');
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
  openPopupUpdate(task: task): void {
    this.showPopup = true;
    this.taskToUpdate = { ...task };
    this.isPopupUpdateOpen = true;
  }

  closePopupUpdate(): void {
    this.showPopup = false;
  }


  updateTask(): void {
    console.log(this.taskToUpdate);

    this.smedService.updateTask(this.taskToUpdate.idTask, this.taskToUpdate).subscribe(
      (updatedTask: task) => {
        console.log('Tutorial updated successfully:', updatedTask);
        this.showPopup = false;
        window.location.reload();
      },
      (error) => {
        console.error('Error updating tutorial:', error);
      }
    );
  }
}
