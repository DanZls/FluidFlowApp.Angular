import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyingBoardComponent } from './modifying-board.component';

describe('ModifyingBoardComponent', () => {
  let component: ModifyingBoardComponent;
  let fixture: ComponentFixture<ModifyingBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyingBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
