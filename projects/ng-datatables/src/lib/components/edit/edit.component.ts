import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  routeSub: Subscription;
  editing;
  columns;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.columns = this.service.columns;
    this.routeSub = this.route.params.subscribe((param) => {
      this.editing = this.service.getData(param.id);
    });

    if (!this.editing) {
      this.router.navigate(['/']);
      return;
    }
  }

  ngAfterViewInit() {
    console.log(this.form, this.editing);
  }

  onSubmit() {
    console.log(this.form.value);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
