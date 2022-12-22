import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PresupuestoService } from '../../services/presupuesto/presupuesto.service';
import { Router } from '@angular/router';
import { DivisaService } from 'src/app/services/divisa/divisa.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  formularioPresupuesto! : FormGroup;
  divisas!: any[] | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private presupuestoService : PresupuestoService, 
    private divisaService: DivisaService,
    private fb : FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerDivisas();
    this.formularioPresupuesto = this.fb.group({
      presupuesto: ['', [Validators.required, Validators.min(0)]],
      divisa: this.divisas
    });
  }

  openDialog() {
    this._snackBar.open('Presupuesto agregado exitosamente!', 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  agregarPresupuesto(){
    this.presupuestoService
    .agregarPresupuesto(this.formularioPresupuesto.value)
    .then((result) => {
      console.log(`submitted: ${JSON.stringify(result)}`);
      this.openDialog();
      this.router.navigate([`/gastos`]);
    })
    .catch((error) => console.error(error));
  }

  obtenerDivisas(){
    const divisas= this.divisaService.getDivisas().subscribe((result)=>{
      this.divisas = result;
    });
    debugger
    console.log(divisas);
  }

  getErrorMessage() {
    const presupuesto = this.formularioPresupuesto.get('presupuesto');
    console.log(presupuesto?.errors?.['min']);
    if (presupuesto?.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return presupuesto?.hasError('min') 
    ? `El valor minimo de este campo es ${presupuesto?.errors?.['min'].min}` : '';
  }

}
