# Angular-Datatables (with CRUD Operations)

Angular library for implementing CRUD operations with Datatables.

Check out the live example [here](https://ng-datatables.netlify.com).

[![Netlify Status](https://api.netlify.com/api/v1/badges/a40621ff-9b9b-418f-89f3-a6f4ffadadcf/deploy-status)](https://app.netlify.com/sites/ng-datatables/deploys)

## Features Implemented

- **Read Records:** Fetches and displays records using `baseAPIUrl` and `get` property of the configuration object.

- **Add Record:** New Records can be added by clicking `Add` button above the table grid. `create` property is required in configuration to render this button.

- **Edit Record:** Records can be edited by clicking the `Edit` button in its Actions column of the table grid.

- **Delete Record:** Records can be deleted by clicking the `Delete` button in its Actions column of the table grid.

- **Conditional Rendering:** Not providing the properties skips rendering. For e.g., if `edit` and `delete` parameters are not provided, Actions column is not rendered.

- **Searching:** Records can be searched by typing the search keyword in the text field above the table grid.

- **Sorting:** Records inside the table grid can be sorted by a respetive column. Clicking the header once sorts in ascending order, and clicking twice in descending.

- **Pagination:** By default each page shows 10 records. This can be changed by clicking the `Items Per Page` dropdown in the table footer.

- **Formatting:** By specifying the `format` in column array, the data fetched can be formatted. This is implemented using the `format` pipe. For e.g. `{{ 2000000 | format:"number" }}` will render `2,000,000`

- **Events:** `added`, `edited` and `deleted` events can be listened to by providing their respective handlers in the `events` property or directly listening to them on the component as such:

```html
<ng-datatable
  [options]="options"
  (added)="onAdd($event)"
  (edited)="onEdit($event)"
  (deleted)="onDelete()"
></ng-datatable>
```

The event parameter is provided by the library while calling the function.

## Usage

**Step-1:** Import the `DatatablesModule` and add it to the `imports` array:

```js
import { DatatablesModule } from "datatables";

@NgModule({
  ...
  imports: [..., DatatablesModule]
});
```

**Step-2:** Configure the options object in `.component.ts` file:

```ts
import { Options } from "ng-datatables";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  options: Options = {
    baseAPIUrl: "http://dummy.restapiexample.com/api/v1",
    get: "employees",
    edit: "update/:id",
    add: "create",
    delete: "delete",
    datatableOptions: {
      columns: [
        {
          name: "Name",
          data: "employee_name",
          format: "text"
        },
        {
          name: "Age",
          data: "employee_age",
          format: "number"
        },
        {
          name: "Salary",
          data: "employee_salary",
          format: "amount"
        }
      ]
    },
    events: {
      edited: (response) => {
        console.log("Edited callback", { response });
      },
      added: (response) => {
        console.log("Added callback", { response });
      },
      deleted: () => {
        console.log("Deleted callback");
      }
    }
  };
}
```

**Step-3:** Use the `ng-datatable` component in your template and bind the object to `options` property.

```html
<ng-datatable [options]="options"></ng-datatable>
```

_The options object can be changed at a later stage in the application causing the component to update accordingly._
