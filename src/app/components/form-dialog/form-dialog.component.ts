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
interface Month {
  value: number;
  monthValue:string;
}

interface Year {
  value: number;
  yearValue: string;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  productForm !: FormGroup;

  date!:string

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
  // months: Month[] = [
  //   {value:1, monthValue:'01'},
  //   {value:2,monthValue:'02'},
  //   {value:3,monthValue:'03'},
  //   {value:4,monthValue:'04'},
  //   {value:5,monthValue:'05'},
  //   {value:6,monthValue:'06'},
  //   {value:7,monthValue:'07'},
  // ]
  // years: Year[] = [
  //   {value:1, yearValue:'2022'},
  //   {value:2, yearValue:'2023'}
  // ]
  dates: any [] = [
    {'id':'01', 'month':'01', 'year': '2022'},
    {'id':'02', 'month':'02', 'year': '2023'},
  ];  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormData,
    private productService: ProductService,
    
    ) { }

    dat: Date[] = []; 

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      productName: ['', Validators.required],
      companyName: ['', Validators.required],
      price: ['', Validators.required],
      favoriteFood: ['', Validators.required],
      favoriteFruit: ['', Validators.required],
      month:['',Validators.required],
      year:['',Validators.required],
      comment:['', Validators.required]
    })
    
  }


  addProduct(): void {
    this.date = this.productForm.value.month +"/"+ this.productForm.value.year;
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
    console.log(this.date);
  }
}
