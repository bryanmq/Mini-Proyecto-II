import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IGasto, IGastoPrincipal } from 'src/app/interfaces/igasto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  @Input() gastos: IGastoPrincipal;
  gastoPrincipalDTO!: IGastoPrincipal | undefined;
  arrayGastos!: IGasto[];
  formularioGastos!: FormGroup;
  categorias!: any[] | undefined;
  gastoDTO!: IGasto;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private roter: Router
  ) {
    this.arrayGastos = [];
    this.gastos = {
      id: '',
      nombregasto: '',
      presupuesto: 0,
      totalgasto: 0,
      balance: 0,
      divisa: '',
      listagastos: [],
    };
  }

  ngOnInit(): void {
    this.formularioGastos = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe((result) => {
      this.categorias = result;
    });
  }

  agregarGasto() {
    this.gastos!.listagastos?.push({
      nombre: this.formularioGastos.value.nombre,
      categoria: this.formularioGastos.value.categoria,
      monto: this.formularioGastos.value.monto,
    });
  }
}
