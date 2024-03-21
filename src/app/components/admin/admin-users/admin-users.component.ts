import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminPanelService } from './../../../../services/admin/adminpanel.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { CreateUserModalAdminComponent } from '../create-user-modal-admin/create-user-modal-admin.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
 selector: 'app-admin-users',
 templateUrl: './admin-users.component.html',
 styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns : string[] = ['_id','username', 'email', 'isAdmin', 'action'];
  dataSource!: MatTableDataSource<any>

  constructor(private dialog: MatDialog,
      private snackBar: MatSnackBar,
      private api : AdminPanelService){}

  ngOnInit(): void {
    this.getUsers();
  }

  editUser(editData: any) {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '30%',
      height: '600px',
      data: editData,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  deleteUser(id: string){
    this.api.deleteUsers(id)
    .subscribe({
      next:(res)=>{
        this.snackBar.open('Utilisateur Supprimé!', 'Fermer', {duration: 2000});
        this.getUsers();
      },
      error:()=>{
      alert("error while deleting record")
      }
    })
  }

  createUser(){
   const dialogRef = this.dialog.open(CreateUserModalAdminComponent, {
      width: '30%',
      height: '600px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  getUsers() {
    this.api.fetchUsers()
      .subscribe({
        next:(res)=> {
          this.dataSource = new MatTableDataSource(res);
        },
        error:(err)=>{
          console.error("Error fetching user data:", err);
          alert("An error occurred while fetching user data. Please try again later.");
        }
      });
  }
}