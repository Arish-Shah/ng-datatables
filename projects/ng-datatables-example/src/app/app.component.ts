import { Component } from '@angular/core';
import { Options } from 'ng-datatables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options: Options = {
    baseAPIUrl: 'http://dummy.restapiexample.com/api/v1',
    get: 'employees',
    edit: 'update/:id',
    add: 'create',
    delete: 'delete/:id',
    datatableOptions: {
      columns: [
        {
          name: 'Name',
          data: 'employee_name',
          format: 'text'
        },
        {
          name: 'Age',
          data: 'employee_age',
          format: 'number'
        },
        {
          name: 'Salary',
          data: 'employee_salary',
          format: 'amount'
        }
      ]
    },
    events: {
      edited: () => console.log('edited callback'),
      added: () => console.log('added callback'),
      deleted: () => console.log('deleted callback')
    }
  };
}
