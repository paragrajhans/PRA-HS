## Installation

Get the repository (master branch) and run the following commands.

```bash
npm i
ng serve
```

## Requirements

Create a small CRUD application that will display all customer data, allow for editing of
an existing customer record and add a new customer.

The display should show all data in an intuitive and easy to use way. You have complete control over how you chose to present this information.

he user should be able to click on an individual record and enter an edit mode. This can be done inline or as a separate page. All values should be validated against the matrix below. The user should be able to add a new customer record. This should be done by navigating to a new page. All values should be validated against the matrix below. If user navigates away from the page prior to submitting, the user should be prompted that they will lose all information and be given the ability to continue or stay on page.

*the ‘other’ field is only required if ‘Other’ is selected in the title field.

*more than one phone number should be allowed. This should be reflected in the
interface.
You may use Angular (please use version 8 or higher), Angular Material and RxJS for
this exercise.
No other 3rd party libraries/functions are allowed.

Minimum Conceptual Requirements:

- Include the product image, title, price, and link to the product page URL.
- Present a UI that is clean, visually interesting, intuitive, and efficient for the user to do the following:
  - add an item to a cart
  - remove an item from the list
  - sort items according to price, title, brand, availability

Code Requirements:

- Responsive : mobile first
- Semantic HTML5
- CSS3 / Sass
- Accessibility Compliant

## My Approach

- The header is divided into 3 sections - Home, Shop & Cart. Clicking on each section navigates the page to that particular part of the page.
- A small gesture is displayed on refreshing the page.
- The landing page is a video.
- Clicking on any image in the Shop section will display detailed information about the product with a link to Navigate to the Product.
- Items can be sorted based on Availability, Stock, Title, Brand & Price.
- If the item is "Out of Stock", the "Add to Cart" button is disabled with a different color code.
- Adding/Removing an item from the Cart updates the number of items in the cart and the total amount which is displayed in the header.
- The footer has links to my github repository and email address.

## Contributions

I'm always open for suggestions and improvements.
