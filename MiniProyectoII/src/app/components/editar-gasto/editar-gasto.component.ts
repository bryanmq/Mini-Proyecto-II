import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IGasto } from 'src/app/interfaces/igasto';

@Component({
  selector: 'app-editar-gasto',
  templateUrl: './editar-gasto.component.html',
  styleUrls: ['./editar-gasto.component.css'],
})
export class EditarGastoComponent {
  constructor(private router: Router) {}
}
