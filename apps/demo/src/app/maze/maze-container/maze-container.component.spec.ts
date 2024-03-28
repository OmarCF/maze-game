import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeContainerComponent } from './maze-container.component';

describe('MazeContainerComponent', () => {
  let component: MazeContainerComponent;
  let fixture: ComponentFixture<MazeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
