import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  productName!:string;
  companyName!:string;
  price!:number;
  favoriteFood!:string;
  favoriteFruit!:string;
  comment!:string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, { 
    width: '500px',
    data: {
      productName: this.productName, 
      companyName: this.companyName,
      price:this.price,
      favoriteFood: this.favoriteFood,
      favoriteFruit:this.favoriteFruit,
      comment: this.comment
    },
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${{result}}`);
    });
  }
}
