import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public projects: Array<Project> = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.projectService.getAll().subscribe({
      next: (response) => {
        this.projects = response.projects
      }
    })
  }

  show (id: String) {
    this.router.navigate(['/projects', id])
  }

  delete(id: String) {
    this.projectService.delete(id).subscribe({
      next: () => {
        window.location.reload()
      }
    })
  }
}
