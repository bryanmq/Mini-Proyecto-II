import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGasto } from 'src/app/interfaces/igasto';
import { IPresupuesto } from 'src/app/interfaces/ipresupuesto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { PresupuestoService } from 'src/app/services/presupuesto/presupuesto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  @Input() gastos!: any;
  arrayGastos!: IGasto[];
  formularioGastos!: FormGroup;
  categorias!: any[] | undefined;
  gastoDTO!: IGasto;
  uuid = require('uuid');
  idpresupuesto: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private roter: Router,
    private activeRoute: ActivatedRoute,
    private presupuestoService: PresupuestoService
  ) {
    this.arrayGastos = [];
    this.idpresupuesto = this.activeRoute.snapshot.paramMap.get('id');
    let temp = this.presupuestoService
      .obtenerPresupuesto(this.idpresupuesto)
      .then((result) => {
        this.gastos = { ...result.data() };
        debugger;
      });
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

    debugger;
  }
}
