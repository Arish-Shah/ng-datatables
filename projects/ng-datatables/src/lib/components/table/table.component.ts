import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  data = [];
  dataSub: Subscription;
  columns = [];
  crud;

  constructor(private service: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataSub = this.service.dataSubject.subscribe(
      (data) => (this.data = data)
    );
    this.columns = this.service.columns;
    this.crud = this.service.crud;
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  onDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.service.delete(id);
    }
  }
}
