import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminPanelService } from './../../../../services/admin/adminpanel.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';


@Component({
 selector: 'app-admin-users',
 templateUrl: './admin-users.component.html',
 styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns : string[] = ['_id','username', 'email', 'action'];
  dataSource!: MatTableDataSource<any>

  constructor(private dialog: MatDialog, private api : AdminPanelService){}

  ngOnInit(): void {
    this.getUsers();
  }

  editUser() {
    this.dialog.open(EditUserModalComponent, {
      width: '30%',
      height: '600px'
    })
  }

  deleteUser(id: string){
    this.api.deleteUsers(id)
    .subscribe({
      next:(res)=>{
        alert("User deleted!");
        this.getUsers();
      },
      error:()=>{
      alert("error while deleting record")
      }
    })
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