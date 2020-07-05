import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  columns = [];

  constructor(private service: DataService, private router: Router) {}

  ngOnInit(): void {
    this.columns = this.service.columns;
  }

  onSubmit(form: NgForm) {
    this.service.create(form.value);
    this.router.navigate(['/']);
  }
}
