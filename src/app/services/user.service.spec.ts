import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';
import { HomeComponent } from '../home/home.component';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'should perform a successful login',
    waitForAsync(async () => {
      // Given
      const email = 'test@test.de';
      const password = '123';
      const url = 'http://localhost:4200/user/login';
      const urlWithParams = `${url}?email=${email}&password=${password}`;
      const requestBody = {};

      // When
      const result = await service.login(email, password);
      const mockRequest = httpMock.expectOne(urlWithParams);
      mockRequest.flush(requestBody, {
        status: 200,
        statusText: 'Okay',
      });

      // Then
      expect(result).toBe(true);
    })
  );

  it(
    'should perform an UNsuccessful login',
    waitForAsync(async () => {
      // Given
      const email = 'test@test.de';
      const password = '123';
      const url = 'http://localhost:4200/user/login';
      const urlWithParams = `${url}?email=${email}&password=${password}`;

      // When
      const result = await service.login(email, password);
      const mockRequest = httpMock.expectOne(urlWithParams);
      mockRequest.error(new ErrorEvent(''), {
        status: 400,
      });

      // Then
      expect(result).toBe(false);
    })
  );
});
