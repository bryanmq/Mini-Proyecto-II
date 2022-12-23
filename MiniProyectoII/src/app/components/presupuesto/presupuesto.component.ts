import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PresupuestoService } from '../../services/presupuesto/presupuesto.service';
import { Router } from '@angular/router';
import { DivisaService } from 'src/app/services/divisa/divisa.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IPresupuesto } from 'src/app/interfaces/ipresupuesto';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css'],
})
export class PresupuestoComponent implements OnInit {
  presupuesto!: IPresupuesto;
  presupuestos: IPresupuesto[] = [];
  formularioPresupuesto!: FormGroup;
  divisas!: any[] | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  uuid = require('uuid');

  constructor(
    private presupuestoService: PresupuestoService,
    private divisaService: DivisaService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerDivisas();
    this.formularioPresupuesto = this.fb.group({
      presupuesto: ['', [Validators.required, Validators.min(0)]],
      divisa: this.divisas,
    });
    this.presupuestoService.obtenerPresupuestos().subscribe((presupuestos)=>{
      this.presupuestos = presupuestos;
    });
  }

  openDialog(message :string) {
    this._snackBar.open(message, 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  agregarPresupuesto() {
    let formulario = this.formularioPresupuesto.value;
    this.presupuesto = {
      id: this.uuid.v4(),
      presupuesto: formulario.presupuesto,
      divisa: formulario.divisa,
      totalgasto: 0,
      balance: 0,
      listagastos: [],
    };

    if (!this.formularioPresupuesto.invalid) {
      this.presupuestoService
        .agregarPresupuesto(this.presupuesto)
        .then((result) => {
          console.log(`submitted: ${JSON.stringify(result)}`);
          this.openDialog('Presupuesto agregado exitosamente!');
          this.router.navigate([`/gastos/` + result.id]);
        })
        .catch((error) => this.openDialog(error));
    }
  }

  obtenerDivisas() {
    this.divisaService.getDivisas().subscribe((result) => {
      this.divisas = result;
    });
  }

  getErrorMessage() {
    const presupuesto = this.formularioPresupuesto.get('presupuesto');
    console.log(presupuesto?.errors?.['min']);
    if (presupuesto?.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return presupuesto?.hasError('min')
      ? `El valor minimo de este campo es ${presupuesto?.errors?.['min'].min}`
      : '';
  }

  obtenerPresupuesto(id: string) {
    return this.presupuestoService.obtenerPresupuesto(id).then(() => {});
  }
}
