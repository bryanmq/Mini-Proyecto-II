import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IGasto } from 'src/app/interfaces/igasto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-editar-gasto',
  templateUrl: './editar-gasto.component.html',
  styleUrls: ['./editar-gasto.component.css'],
})
export class EditarGastoComponent implements OnInit {
  categorias!: any[];
  formularioGastosEdicion!: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditarGastoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGasto, private router: Router,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formularioGastosEdicion = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.obtenerCategorias()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe((result) => {
      this.categorias = result;
    });
  }
}
