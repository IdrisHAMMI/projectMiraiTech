import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';


@Component({
  selector: 'app-create-user-modal-admin',
  templateUrl: './create-user-modal-admin.component.html',
  styleUrl: './create-user-modal-admin.component.css'
})
export class CreateUserModalAdminComponent implements OnInit {

  userForm!: FormGroup
  hide = true;

  constructor(private formBuilder : FormBuilder,
    private api : AdminPanelService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<CreateUserModalAdminComponent>
    )
    {}

    ngOnInit(): void {
      this.userForm = this.formBuilder.group({
       username: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       role: ['User', Validators.required]
      });
  }


  createUser() {
    this.api.createUsers(this.userForm.value)
    .subscribe({
      next:(res)=> {
        this.snackBar.open('Utilisateur Crée!', 'Fermer', {duration: 2000});
      },
      error:(err)=> {
        console.log(err)
      }
    })
  }
}
