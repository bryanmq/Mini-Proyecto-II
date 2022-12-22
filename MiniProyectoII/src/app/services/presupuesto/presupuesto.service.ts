import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPresupuesto } from '../../interfaces/ipresupuesto';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  private collectionName = 'presupuesto';
  constructor(private fireStore: Firestore) {}

  agregarPresupuesto(presupuesto: IPresupuesto) {
    const presupuestoRef = collection(this.fireStore, this.collectionName);
    return addDoc(presupuestoRef, presupuesto);
  }

  obtenerPresupuestos() {
    const presupuestoRef = collection(this.fireStore, this.collectionName);
    return collectionData(presupuestoRef, { idField: 'id' }) as Observable<
      IPresupuesto[]
    >;
  }

  obtenerPresupuesto(id: string) {
    const docRef = doc(this.fireStore, 'presupuesto', id);
    return getDoc(docRef);
  }
}
