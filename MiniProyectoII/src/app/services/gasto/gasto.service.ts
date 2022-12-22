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
import { IGasto } from 'src/app/interfaces/igasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private collectionName = 'rubro'
  constructor(private fireStore : Firestore) { }

  agregarRubro(rubro : IGasto){
    const rubroRef = collection(this.fireStore, this.collectionName);
    return addDoc(rubroRef, rubro);
  }

  actualizarRubro(rubro : IGasto){
    const rubroRef = doc(this.fireStore, `${this.collectionName}/${rubro.id}`);
    return setDoc(rubroRef, { ...rubro });
  }

  obtenerRubros(){
    const rubroRef = collection(this.fireStore, this.collectionName);
    return collectionData(rubroRef, { idField : 'id'}) as Observable<IGasto[]>;
  }
}
