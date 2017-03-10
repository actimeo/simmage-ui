import { DeviceService } from './../../../services/utils/device.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DossiersService } from './../../../services/backend/dossiers.service';
import { PgService } from './../../../services/backend/pg.service';
import { UserService } from './../../../services/utils/user.service';
import { SwitchthemeService } from './../../../services/utils/switchtheme.service';
import { MaterialModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameComponent ], imports: [ MaterialModule, RouterTestingModule ],
      providers: [ SwitchthemeService, UserService, PgService, DossiersService, DeviceService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
