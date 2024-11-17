import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SignupComponent } from "./signup.component";
import { AuthService } from "../../services/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['signup'])
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: spy },
      ]
    })
    fixture = TestBed.createComponent(SignupComponent)
    component = fixture.componentInstance
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    fixture.detectChanges()
  })

  it('should create signup component', () => {
    expect(component).toBeTruthy()
  })
  
  it('should have submit button disabled without input', () => {
    const submitButton = fixture.nativeElement.querySelector('button')
    expect(submitButton.disabled).toBeTruthy();
  })
})