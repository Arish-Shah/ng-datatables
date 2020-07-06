import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  disabled = true;
  subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const controls = {};
    this.data.popupColumns.forEach((column) => {
      controls[column.data] = new FormControl('', [Validators.required]);
    });
    this.addForm = new FormGroup(controls);

    this.subscription = this.addForm.valueChanges.subscribe((_) => {
      this.disabled = !this.addForm.valid;
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  getType(format: string) {
    switch (format) {
      case 'number':
      case 'amount':
        return 'number';
      default:
        return 'text';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
