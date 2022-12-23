import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IGasto } from 'src/app/interfaces/igasto';
import { IPresupuesto } from 'src/app/interfaces/ipresupuesto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { PresupuestoService } from 'src/app/services/presupuesto/presupuesto.service';
import { DetalleGastoComponent } from '../detalle-gasto/detalle-gasto.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  presupuesto: any = undefined;
  idPresupuestoNuevo!: string;
  arrayGastos: IGasto[] = [];
  formularioGastos!: FormGroup;
  categorias!: any[] | undefined;
  gastoDTO!: IGasto;
  id!: string;
  displayedColumns: string[] = ['nombre', 'categoria', 'monto', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<IGasto>;
  @ViewChild(DetalleGastoComponent) detalleGastoComponent!: DetalleGastoComponent;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private roter: Router,
    private activeRoute: ActivatedRoute,
    private presupuestoService: PresupuestoService
  ) {
  }

  ngOnInit(): void {
    this.formularioGastos = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.obtenerCategorias();
    this.id = this.activeRoute.snapshot.paramMap.get('id') || '';
    this.obtenerPresupuesto();
  }

  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe((result) => {
      this.categorias = result;
    });
  }

  agregarGasto() {    
    const rubro =  {
      ...this.formularioGastos.value
    }
    this.presupuesto!.listagastos?.push(rubro);
    
    this.arrayGastos.push(rubro);
    this.table.renderRows();
    this.detalleGastoComponent.calcularTotales(rubro);
    this.formularioGastos.reset();
  }

  obtenerPresupuesto() {    
    this.presupuestoService.obtenerPresupuesto(this.id).then((docSnap) => {
      this.presupuesto = { id: this.id, ...docSnap.data() };
      this.setForm();
    });
  }

  setForm() {
    const values = {
      nombre: this.presupuesto.presupuesto,
    };
  }

  console(msj: any){
    console.log(msj);
  }
}
