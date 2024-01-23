import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTablePaginatorComponent } from './paginator.component';

describe('ResourceTablePaginatorComponent', () => {
  let component: ResourceTablePaginatorComponent;
  let fixture: ComponentFixture<ResourceTablePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceTablePaginatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTablePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
