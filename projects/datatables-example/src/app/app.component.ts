import { Component } from '@angular/core';
import { Options } from 'dist/datatables/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options: Options;

  ngOnInit(): void {
    this.options = {
      baseAPIUrl: 'https://employees-demo-api.firebaseio.com',
      get: 'employees.json',
      edit: 'employees/:id.json',
      add: 'employees.json',
      delete: 'employees/:id.json',
      datatableOptions: {
        columns: [
          {
            name: 'ID',
            data: 'id'
          },
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
        edited: (response) => {
          console.log('Edited callback', { response });
        },
        added: (response) => {
          console.log('Added callback', { response });
        },
        deleted: () => {
          console.log('Deleted callback');
        }
      }
    };
  }
}
