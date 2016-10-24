# select-generic form control

Select several values from a list of values. 
It is possible to filter the list of values via an input.

## Inputs

| Input | Info |
| --- | --- |
| elements: { name, id }[] | an array of elements to choose from  |
| placeholderString: string | a placeholder for the filter input |
| selectString: string | a title for the form control |

## Example

     <app-select-generic 
         [elements]="data"
         [placeholderString]="'Filter elements'" 
         [selectString]="'Select an element'" 
         formControlName="aName">
     </app-select-generic>
