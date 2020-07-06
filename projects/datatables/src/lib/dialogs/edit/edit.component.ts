import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  returnData;
  editForm: FormGroup;
  disabled = false;
  subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const controls = {};
    this.data.popupColumns.forEach((column) => {
      controls[column.data] = new FormControl(
        this.data.editingItem[column.data],
        [Validators.required]
      );
    });
    this.editForm = new FormGroup(controls);

    this.subscription = this.editForm.valueChanges.subscribe((_) => {
      this.disabled = !this.editForm.valid;
      this.returnData = {
        ...this.data.editingItem,
        ...this.editForm.value
      };
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
