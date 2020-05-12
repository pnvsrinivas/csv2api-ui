import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Csv2apiComponent } from './csv2api.component';

describe('Csv2apiComponent', () => {
  let component: Csv2apiComponent;
  let fixture: ComponentFixture<Csv2apiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Csv2apiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Csv2apiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
