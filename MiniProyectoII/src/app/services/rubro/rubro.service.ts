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
import { IRubro } from 'src/app/interfaces/irubro';

@Injectable({
  providedIn: 'root'
})
export class RubroService {
  private collectionName = 'rubro'
  constructor(private fireStore : Firestore) { }

  agregarRubro(rubro : IRubro){
    const rubroRef = collection(this.fireStore, this.collectionName);
    return addDoc(rubroRef, rubro);
  }

  actualizarRubro(rubro : IRubro){
    const rubroRef = doc(this.fireStore, `${this.collectionName}/${rubro.id}`);
    return setDoc(rubroRef, { ...rubro });
  }

  obtenerRubros(){
    const rubroRef = collection(this.fireStore, this.collectionName);
    return collectionData(rubroRef, { idField : 'id'}) as Observable<IRubro[]>;
  }
}
