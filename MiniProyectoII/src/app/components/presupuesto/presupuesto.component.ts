import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PresupuestoService } from '../../services/presupuesto/presupuesto.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  formularioPresupuesto! : FormGroup;
  /**
   *
   */
  constructor(private presupuestoService : PresupuestoService, private fb : FormBuilder) { }
  ngOnInit(): void {
    this.formularioPresupuesto = this.fb.group({
      presupuesto: ['', [Validators.required, Validators.min(0)]],
      divisa: [''],
    });
  }

  agregarPresupuesto(){
    console.log(this.formularioPresupuesto.value);    
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
