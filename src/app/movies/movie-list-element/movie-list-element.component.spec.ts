import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListElementComponent } from './movie-list-element.component';

describe('MovieListElementComponent', () => {
  let component: MovieListElementComponent;
  let fixture: ComponentFixture<MovieListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
