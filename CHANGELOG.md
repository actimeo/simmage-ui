## 2017-01-20

### Features

- **referee**: A *function* is defined for each referee. In the list of dossiers 
(main>dossiers and account>dossiers), if the connected user is referee of 
a dossier, a star is displayed with a tooltip containing the list of functions 
as referee for this dossier.

- **login**: Last date and IP connection are saved. When connecting, the previous 
date and IP connection are returned and displayed in a snackbar just after 
connection. 

- **profile**: information about connected user are displayed in Account>Profile 
(to be continued).

- **password change**: Password changing is accessible from 
Account>Profile>Change Password.

- **password strength**: password strength is verified at change time and tips 
are given to correctly handle the constraints (length min 8 and chars from 
3 groups of lowercase/uppercase/digits/others).

## 2017-01-27

### Features

- **documents**: For documents form in user side, the document title and its type
selection are now managed by a sub component, which can be reused elsewhere if
necessary ; this component must receive the content id as an input to retrieve
the necessary topics.

### Optimizations

- **document types**: filter function now works as a real filter (retrieving now
those which contains **_ALL_** topics provided instead of retrieving those 
which contains **_AT LEAST ONE_** of the topics provided)

- **documents**: description field shouldn't be mandatory

- **dossiers**: loading all dosiers at once, using json format

- **profile**: information about connected user, including last connection info

- **theme**: theme selection in Profile
