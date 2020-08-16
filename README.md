## Installation

Get the repository (master branch) and run the following commands.

```bash
npm i
ng serve
url for browser : http://localhost:4200/users
```

## Requirements

Create a small CRUD application that will display all customer data, allow for editing of
an existing customer record and add a new customer.

The display should show all data in an intuitive and easy to use way. You have complete control over how you chose to present this information.

- The user should be able to click on an individual record and enter an edit mode. This can be done inline or as a separate page. 
- All values should be validated against the matrix below. 
- The user should be able to add a new customer record. This should be done by navigating to a new page. All values should be validated against the matrix below.
- If user navigates away from the page prior to submitting, the user should be prompted that they will lose all information and be given the ability to continue or stay on page.
- *the ‘other’ field is only required if ‘Other’ is selected in the title field.
- *more than one phone number should be allowed. This should be reflected in the
interface.

You may use Angular (please use version 8 or higher), Angular Material and RxJS for
this exercise.
No other 3rd party libraries/functions are allowed.

## My Approach

- Created 4 Components
  - Users Component that is loaded when you run the application for the very first time. It displays the list of users populated from the JSON.
  - Add User Component that allows you to add a new user.
  - Update User Component that allows you to update an exsting user.
  - Dialog Content Component that has the dialog content.

- Any changes made to the data is temporary. Once you refresh the page, all the users that you may hav created, deleted or updated will go away and data will be loaded from the json.

- A Service that takes care of all the HTTP transactions.

- Used the RxJS library to implement the CRUD functionality. Due to restrictions, I have also written an Http Interceptor(MockHttpCalIInterceptor) to intercept the type of HTTP request (GET/PUT/POST/DELETE) and based on the request, performed the operation.

- Default and Custom Validations to the FormGroup and FormArray fields. Some HTML validations using ngClass.

- Material Icons for better readability.

- Bootstrap components

## Contributions

I'm always open for suggestions and improvements.
