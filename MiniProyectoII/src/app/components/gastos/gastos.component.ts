import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IGasto } from 'src/app/interfaces/igasto';
import { IPresupuesto } from 'src/app/interfaces/ipresupuesto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { PresupuestoService } from 'src/app/services/presupuesto/presupuesto.service';
import { DetalleGastoComponent } from '../detalle-gasto/detalle-gasto.component';
import { EditarGastoComponent } from '../editar-gasto/editar-gasto.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  presupuesto: IPresupuesto = { presupuesto: 0, totalgasto: 0, balance: 0 };
  idPresupuestoNuevo!: string;
  arrayGastos: IGasto[] = [];
  formularioGastos!: FormGroup;
  categorias!: any[] | undefined;
  gastoDTO!: IGasto;
  id!: string;
  displayedColumns: string[] = ['nombre', 'categoria', 'monto', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<IGasto>;
  @ViewChild(DetalleGastoComponent)
  detalleGastoComponent!: DetalleGastoComponent;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private presupuestoService: PresupuestoService,
    public dialog: MatDialog
  ) {}

  openDialog(gasto:IGasto, indice : number): void {
    const dialogRef = this.dialog.open(EditarGastoComponent, {
      data: gasto,
      height: '300px',
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.arrayGastos[indice] = result;
      this.table.renderRows();
      console.log('Gasto editado!!!', result);
    });
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
    const rubro = {
      ...this.formularioGastos.value,
    };
    this.presupuesto!.listagastos?.push(rubro);

    // this.arrayGastos.push(rubro);
    this.table.renderRows();
    this.detalleGastoComponent.calcularTotales(rubro);
    this.formularioGastos.reset();
  }

  obtenerPresupuesto() {
    this.presupuestoService.obtenerPresupuesto(this.id).then((docSnap) => {
      this.presupuesto = { id: this.id, ...(docSnap.data() as IPresupuesto) };
      this.arrayGastos = this.presupuesto.listagastos!;
      this.presupuesto.listagastos!.forEach((rubro) => {
        this.detalleGastoComponent.calcularTotales(rubro);
      });
      this.setForm();
    });
  }

  actualizarPresupuesto({ gasto, balance }: any) {
    this.presupuesto.totalgasto = gasto;
    this.presupuesto.balance = balance;
    this.presupuestoService
      .actualizarPresupuesto(this.id, this.presupuesto)
      .then(() => {
        // this.openDialog('Presupuesto actualizado correctamente');
        this.router.navigate([`/`]);
      });
    // .catch((ex) => this.openDialog(ex));
  }

  setForm() {
    const values = {
      nombre: this.presupuesto.presupuesto,
    };
  }
  // openDialog(message: string) {
  //   this._snackBar.open(message, 'Aceptar', {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //     duration: 3000,
  //   });
  // }

  console(msj: any) {
    console.log(msj);
  }

  eliminarGasto(gasto: IGasto) {
    const index = this.arrayGastos.findIndex(
      (x) =>
        x.nombre === gasto.nombre &&
        x.monto === gasto.monto &&
        x.categoria === gasto.categoria
    );
    if (index > -1) {
      this.arrayGastos.splice(index, 1);
      this.table.renderRows();
      this.formularioGastos.reset();
    }
  }

  // editarGasto(gasto: IGasto) {
  //   debugger;
  //   this.roter.navigate([`/editar-gasto/${gasto.id}`]);
  // }
}
