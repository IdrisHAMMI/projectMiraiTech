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
       password: ['', Validators.required],
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
        switch(err.error.error) {
          case 'Missing email, password, or username':
            this.snackBar.open('Les cases de L\'utilisateur, Mot de passe ou Email sont vides.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          break;
          case 'Email is already in use':
            this.snackBar.open('Cette Email est deja pris.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          break;
          case 'Failed to create user':
            this.snackBar.open('Une erreur est survenu. Veuillez essayer plus tard.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          break;
        }
      }
    })
  }
}
