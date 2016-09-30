import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: '<%= selector %>-form',
  templateUrl: './<%= dasherizedModuleName %>-form.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>-form.component.<%= styleExt %>']
})
export class <%= classifiedModuleName %>FormComponent implements OnInit {

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;

  originalData: any = { id: null, name: null, description: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl
    });

    this.route.data.forEach((data: { element: any }) => {
      if ('element' in data) {
        this.id = data.element.id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.element.name);
      } else {
        this.creatingNew = true;
        this.nameCtrl.setValue('');
      }
      this.setOriginalDataFromFields();
      this.errorMsg = '';
      this.errorDetails = '';
    });
  }

  onSubmit() {
    this.setOriginalDataFromFields();
/*    if (this.creatingNew) {
	// TODO add element
      this.elementService.addElement(this.nameCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding element';
          this.errorDetails = err.text();
        });
    } else {
      this.elementService.updateElement(this.id, this.nameCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating element';
          this.errorDetails = err.text();
        });
    }*/
  }

  doCancel() {
    this.setOriginalDataFromFields();
    this.goBackToList();
  }

  doDelete() {
    this.setOriginalDataFromFields();
/*    this.elementService.deleteElement(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting element';
        this.errorDetails = err.text();
      });*/
  }

  goBackToList(withSelected = false) {
    if (withSelected) {
      this.router.navigate(['/admin/<%= dasherizedModuleName %>', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/<%= dasherizedModuleName %>']);
    }
  }

  canDeactivate() {
    if (this.originalDataChanged()) {
      this.pleaseSave = true;
      return false;
    } else {
      return true;
    }
  }

  private setOriginalDataFromFields() {
    this.originalData.name = this.nameCtrl.value;
  }

  private originalDataChanged() {
    return this.originalData.name !== this.nameCtrl.value;
  }
}
