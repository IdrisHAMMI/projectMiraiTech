import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private api: AdminPanelService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any){}

    ngOnInit(): void {
      const userId = this.editData._id;
      console.log('User ID:', userId);

      this.userForm = this.formBuilder.group ({
        username: ['', Validators.required],
        email: ['', Validators.required],
        role: ['User', Validators.required]
      })
    }

    editUser (){
      this.api.editUser(this.editData._id, this.userForm.value)
      .subscribe({
        next:(res)=> {
          this.snackBar.open('Utilisateur Modifié!', 'Fermer', {duration: 2000});
          this.userForm.reset();
        },
        error:()=> {
          alert("error while modifying user data")
        }
      })
    }
}
