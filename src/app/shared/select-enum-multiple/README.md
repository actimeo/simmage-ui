# select-enum-multiple form control

Form control to select multiple values in a postgres enum. Returns an array of strings with the values selected.

## Inputs 

| Input | info |
| --- | --- |
| dbenum | the schema and name of the postgres enum, format schema/enum_name. The function `schema`/`enum_name`_list should exist. |
 