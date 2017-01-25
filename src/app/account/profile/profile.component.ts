import { Component, OnInit } from '@angular/core';
import { SwitchthemeService } from '../../shared/switchtheme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(private _switchthemeService:SwitchthemeService) {}
  
  onThemeClicked() {
    this._switchthemeService.onThemeClicked();
  }

  ngOnInit() { 
    
  }

}