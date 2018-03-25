import { TestBed, inject } from '@angular/core/testing';
import { HttpHeaders } from '@angular/common/http';
import { ResponseOptions } from '@angular/http';
import { of } from 'rxjs/observable/of';

import { PersonService } from './person.service';
import { AuthenticationService } from './authentication.service';

import { Person } from './person';

describe('PersonService', () => {

  const TEST_TOKEN = 'test-token';

  function setup(clientInterface: string[]) {
    const httpClientServiceSpy = jasmine.createSpyObj('HttpClient', clientInterface);
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['getToken']);
    const personService = new PersonService(httpClientServiceSpy, authenticationServiceSpy);

    const mockPerson = {
      name: 'John Doe',
      gender: 'testGender',
      birthName: 'John Doe Jr.',
      birthPlace: 'testCity',
      dateOfBirth: '1900-01-01T12:00:00.000Z',
      mothersName: 'Jane Doe',
      idNumber: '000000AA',
      socialSecurity: '000000000',
      permanentAddress: 'testAddress',
      permanentAddressSince: '1901-01-01T12:00:00.000Z',
      temporaryAddress: 'testAddress2',
      temporaryAddressSince: '1902-01-01T12:00:00.000Z',
      currentAddress: 'testAddress3',
      currentAddressSince: '1903-01-01T12:00:00.000Z',
      isUnderProtection: true,
      roles: 'testRoles',
      maritalStatus: 'testMaritalStatus',
      phoneNumber: '11111111111',
      memo: 'testMemo',
      email: 'test@test.com',
      personId: 'testPersonId'
    };

    authenticationServiceSpy.getToken.and.returnValue(TEST_TOKEN);

    return { personService, mockPerson, httpClientServiceSpy };
  }

  describe('constructor', () => {
    it('should create the instance', () => {
      const { personService, httpClientServiceSpy } = setup(['constructor']);

      expect(personService).toBeTruthy();
    });
  });

  describe('addPerson', () => {
    it('should call the service once', () => {
      const { personService, httpClientServiceSpy } = setup(['post']);
      httpClientServiceSpy.post.and.returnValue(of());

      personService.addPerson({} as Person).subscribe();

      expect(httpClientServiceSpy.post.calls.count())
        .toBe(1, 'one call');
    });

    it('should call the service properly', () => {
      const { personService, mockPerson, httpClientServiceSpy } = setup(['post']);
      const expectedUrl = 'http://api.test.com/persons';
      const expectedHttpOptions = {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${TEST_TOKEN}`
        }
      };
      httpClientServiceSpy.post.and.returnValue(of());
      const expectedRequestBody = JSON.stringify({
        name: mockPerson.name,
        gender: mockPerson.gender,
        bornAs: mockPerson.birthName,
        birthPlace: mockPerson.birthPlace,
        dateOfBirth: mockPerson.dateOfBirth,
        mothersName: mockPerson.mothersName,
        idCardNumber: mockPerson.idNumber,
        healthInsuranceCardNumber: mockPerson.socialSecurity,
        address: mockPerson.permanentAddress,
        addressSince: mockPerson.permanentAddressSince,
        temporaryAddress: mockPerson.temporaryAddress,
        temporaryAddressSince: mockPerson.temporaryAddressSince,
        correspondingAddress: mockPerson.currentAddress,
        correspondingAddressSince: mockPerson.currentAddressSince,
        underProtection: 'YES',
        role: mockPerson.roles,
        maritalStatus: mockPerson.maritalStatus,
        phoneNumber: mockPerson.phoneNumber,
        email: mockPerson.email,
        memo: mockPerson.memo
      });

      personService.addPerson(mockPerson).subscribe();

      expect(httpClientServiceSpy.post.calls.argsFor(0))
        .toEqual([expectedUrl, expectedRequestBody, expectedHttpOptions]);
    });

    it('should return the response', () => {
      const { personService, mockPerson, httpClientServiceSpy } = setup(['post']);
      const expectedUrl = 'http://api.test.com/persons';
      const expectedReturnValue: object = {};

      httpClientServiceSpy.post.and.returnValue(of(expectedReturnValue));

      personService.addPerson(mockPerson).subscribe(
        returnValue => expect(returnValue).toEqual(expectedReturnValue),
        fail
      );
    });
  });

  describe('getPerson', () => {
    it('should call the service once', () => {
      const { personService, httpClientServiceSpy } = setup(['get']);
      httpClientServiceSpy.get.and.returnValue(of());

      personService.getPerson('testId').subscribe();

      expect(httpClientServiceSpy.get.calls.count())
          .toBe(1, 'one call');
    });

    it('should use env url and set the proper headers', () => {
      const { personService, httpClientServiceSpy } = setup(['get']);
      const expectedUrl = 'http://api.test.com/persons/testPersonId';
      const expectedHttpOptions = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${TEST_TOKEN}`
        }
      };
      httpClientServiceSpy.get.and.returnValue(of());

      personService.getPerson('testPersonId').subscribe();

      expect(httpClientServiceSpy.get.calls.argsFor(0))
        .toEqual([expectedUrl, expectedHttpOptions]);
    });

    it('should return the response', () => {
      const { personService, httpClientServiceSpy } = setup(['get']);
      const expectedReturnValue: object = {};

      httpClientServiceSpy.get.and.returnValue(of(expectedReturnValue));

      personService.getPersons().subscribe(
        returnValue => expect(returnValue).toEqual(expectedReturnValue),
        fail
      );
    });
  });

  describe('getPersons', () => {
    it('should call the service once', () => {
      const { personService, httpClientServiceSpy } = setup(['get']);
      httpClientServiceSpy.get.and.returnValue(of());

      personService.getPersons().subscribe();

      expect(httpClientServiceSpy.get.calls.count())
          .toBe(1, 'one call');
    });

    it('should use env url and set the proper headers', () => {
      const { personService, httpClientServiceSpy } = setup(['get']);
      const expectedUrl = 'http://api.test.com/persons';
      const expectedHttpOptions = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${TEST_TOKEN}`
        }
      };
      httpClientServiceSpy.get.and.returnValue(of());

      personService.getPersons().subscribe();

      expect(httpClientServiceSpy.get.calls.argsFor(0))
        .toEqual([expectedUrl, expectedHttpOptions]);
    });

    it('should return the response', () => {
      const { personService, httpClientServiceSpy } = setup(['get']);
      const expectedReturnValue: object = {};

      httpClientServiceSpy.get.and.returnValue(of(expectedReturnValue));

      personService.getPersons().subscribe(
        returnValue => expect(returnValue).toEqual(expectedReturnValue),
        fail
      );
    });
  });
});
