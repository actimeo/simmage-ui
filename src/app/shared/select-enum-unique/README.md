# select-enum-unique form control

Form control to select a single value in a postgres enum. Returns a string with the selected value.

## Inputs 

| Input | info |
| -- | -- |
| dbenum | the schema and name of the postgres enum, format schema/enum_name. The function `schema`/`enum_name`_list should exist. |
 