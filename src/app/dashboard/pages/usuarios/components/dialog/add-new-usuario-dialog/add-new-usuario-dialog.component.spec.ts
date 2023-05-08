import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUsuarioDialogComponent } from './add-new-usuario-dialog.component';

describe('AddNewUsuarioDialogComponent', () => {
  let component: AddNewUsuarioDialogComponent;
  let fixture: ComponentFixture<AddNewUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewUsuarioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
