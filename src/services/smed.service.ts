import { tutoSMED } from './../models/tutoSmed';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectSmed } from '../models/projectSmed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmedService {
  private apiUrl = 'http://localhost:8081/project';
  private apiUrlTuto = 'http://localhost:8081/tuto';

  constructor(private http: HttpClient) {}

  addprojectSMED(projectsmed: projectSmed): Observable<projectSmed> {
    return this.http.post<projectSmed>(`${this.apiUrl}/addProject`, projectsmed, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  getAllProjectSMED(): Observable<projectSmed[]> {
    return this.http.get<projectSmed[]>(`${this.apiUrl}/getAllProject`);
  }
  deleteProjectSMED(idProject: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${idProject}`);
  }

  updateProjectSMED(projectsmed: projectSmed): Observable<projectSmed> {
    const url = `${this.apiUrl}/update`;
    return this.http.put<projectSmed>(url, projectsmed);
  }

  getProjectSmedById(idProject: string): Observable<projectSmed> {
    const url = `${this.apiUrl}/getProjectById/${idProject}`;
    return this.http.get<projectSmed>(url);
  }
  //TutoService
  addtutotSMED(formData: FormData): Observable<tutoSMED> {
    return this.http.post<tutoSMED>(`${this.apiUrlTuto}/addTuto`, formData);
  }
  getAlltutoSMED(): Observable<tutoSMED[]> {
    return this.http.get<tutoSMED[]>(`${this.apiUrlTuto}/getAllTutos`);
  }
  deletetutoSMED(idTuto: string): Observable<any> {
    return this.http.delete(`${this.apiUrlTuto}/remove/${idTuto}`);
  }

  updatetutoSMED(idTuto: string, projectsmed: tutoSMED): Observable<tutoSMED> {
    const url = `${this.apiUrlTuto}/update`;
    return this.http.put<tutoSMED>(url, projectsmed);
  }


  getLatestTutorial(): Observable<tutoSMED> {
    return this.http.get<tutoSMED>(`${this.apiUrlTuto}/latest`);
  }
}
