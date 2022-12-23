import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGasto } from 'src/app/interfaces/igasto';

@Component({
  selector: 'app-detalle-gasto',
  templateUrl: './detalle-gasto.component.html',
  styleUrls: ['./detalle-gasto.component.css']
})
export class DetalleGastoComponent {
  @Input() presupuesto : number = 0;
  gasto : number = 0;
  balance : number = 0;
  @Output() gastoPadre : EventEmitter<any> = new EventEmitter()

  calcularTotales(gasto : IGasto){
    this.gasto = this.gasto + gasto.monto;
    this.balance = this.balance + gasto.monto;
  }
}
