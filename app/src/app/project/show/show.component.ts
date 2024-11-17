import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {
  projectForm: FormGroup;
  projectId: String;
  projectDetails: any;

  constructor(
    private fb: FormBuilder, 
    private projectService: ProjectService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') as String;
    this.projectForm = this.fb.group({            
      name: ['', Validators.required],
      description: ['', Validators.required],
      monthDuration: [0, Validators.required]
    });

    this.projectService.get(this.projectId)
      .subscribe({
        next: (response) => {
          this.projectDetails = response.project

          this.projectForm.setValue({            
            name: this.projectDetails.name,
            description: this.projectDetails.description,
            monthDuration: this.projectDetails.monthDuration
          });
        }
      });
  }

  submit() {
    this.projectService.update(this.projectId, this.projectForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/projects'])
        }
      });
  }
}
