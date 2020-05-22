import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { IconService } from '../icon.service';

xdescribe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let iconService: jasmine.SpyObj<IconService>;

  beforeEach(async(() => {
    const mockIconService = jasmine.createSpyObj('IconService', ['createBypassedIconSet']);

    TestBed.configureTestingModule({
      declarations: [ IconComponent ],
      providers: [
        {
          provide: IconService,
          useValue: mockIconService,
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    iconService = TestBed.inject(IconService) as jasmine.SpyObj<IconService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
