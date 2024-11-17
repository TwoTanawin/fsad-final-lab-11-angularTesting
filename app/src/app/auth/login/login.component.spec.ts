import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>
  let authServiceSpy: jasmine.SpyObj<AuthService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login'])

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    fixture.detectChanges()
  })

  it('should create component', () => {
    expect(component).toBeTruthy()
    })

  it('should show correct title', () => {
    const titleComponent: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(titleComponent.textContent).toContain('Student Login Form')
  })

  it('should have email and password input fields', () => {
    const emailInput: HTMLInputElement =
      fixture.nativeElement.querySelector('#email');
    const passwordInput: HTMLInputElement =
      fixture.nativeElement.querySelector('#password');
    expect(emailInput).toBeTruthy();
    expect(emailInput.getAttribute('type')).toBe('email');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.getAttribute('type')).toBe('password');
  });



  // it('should render the login form correctly', () => {

  // })

  // it('should call login method in authservice when button is clicked', () => {

  // })
});
