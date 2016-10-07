# select-generic form control

Select several values from a list of values. 
It is possible to filter the list of values via an input.

     <app-select-generic 
         [elements]="data"
         [placeholderString]="'Filter elements'" 
         [selectString]="'Select an element'" 
         formControlName="aName">
     </app-select-generic>
