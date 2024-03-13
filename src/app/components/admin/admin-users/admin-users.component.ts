import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminPanelService } from './../../../../services/admin/adminpanel.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
 selector: 'app-admin-users',
 standalone: true,
 imports: [MatTableModule],
 templateUrl: './admin-users.component.html',
 styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns : string[] = ['_id','username', 'email'];
  dataSource!: MatTableDataSource<any>

  constructor(private dialog: MatDialog, private api : AdminPanelService){}

  ngOnInit(): void {
    this.getUsers();
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