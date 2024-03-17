import { Component, OnInit } from '@angular/core';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {

  constructor(private api: AdminPanelService){}

  ngOnInit(): void {
      
  }

  deleteUser(id: string){
    this.api.deleteUsers(id)
    .subscribe({
      next:(res)=>{
        alert("User deleted!")
      },
      error:()=>{
      alert("error while deleting record")
      }
    })
  }
}
