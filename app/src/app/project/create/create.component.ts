import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  public projectForm: FormGroup;
  
  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      monthDuration: [0, Validators.required]
    })
  }

  submit() {
    this.projectService.create(this.projectForm.value)
    .subscribe({
      next: () => {
        this.router.navigate(['/projects'])
      }
    })
  }
}
