import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { FormData } from 'src/app/models/form.model'

interface Food {
  value: string;
  viewValue:string;
}
interface Fruits {
  value: number;
  viewValue:string;
}

// export interface FormData {
//   productName: string;
//   companyName: string;
//   price:number;
//   favoriteFood: string;
//   favoriteFruit:string;
//   comment: string;
// }

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {
  productForm !: FormGroup;
  //want print binded data to the homepage 

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  fruits: Fruits[] = [
    {value:1, viewValue:'Apple'}, 
    {value:2, viewValue:'Banana'}, 
    {value:3, viewValue:'Orange'}, 
    {value:4, viewValue:'Dragonfruit'}
  ];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormData,
    private productService: ProductService 
    ) { }

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      productName: ['', Validators.required],
      companyName: ['', Validators.required],
      price: ['', Validators.required],
      favoriteFood: ['', Validators.required],
      favoriteFruit: ['', Validators.required],
      comment:['', Validators.required]
    })
  }

  addProduct(): void {
    if(this.productForm.valid) {
      this.productService.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("product submited");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("error");
        }
      })
    }
    console.log(this.productForm.value);
  }
}
