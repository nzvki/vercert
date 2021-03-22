
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as sinon from 'sinon';
import { DataService } from '../data.service';
import { VerifyCertComponent } from './VerifyCert.component';
import {VerifyCertService} from './VerifyCert.service';

describe('VerifyCertComponent', () => {
  let component: VerifyCertComponent;
  let fixture: ComponentFixture<VerifyCertComponent>;

  let mockVerifyCertService;
  let mockDataService

  beforeEach(async(() => {

    mockVerifyCertService = sinon.createStubInstance(VerifyCertService);
    mockVerifyCertService.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ VerifyCertComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: VerifyCertService, useValue: mockVerifyCertService },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(VerifyCertComponent);
    component = fixture.componentInstance;

  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

