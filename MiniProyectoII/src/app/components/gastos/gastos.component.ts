import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent  implements OnInit{
  categorias!: any[] | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private categoriaService: CategoriaService
  ) {}


  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    const divisas= this.categoriaService.getCategorias().subscribe((result)=>{
      this.categorias = result;
    });
  }

  ingresarGasto(){
    
  }
}
