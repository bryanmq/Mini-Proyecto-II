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

@Injectable({
  providedIn: 'root'
})
export class DivisaService {

  

  constructor(private firestore: Firestore) { }

  getDivisas(){
    const lista = collection(this.firestore, 'divisas');
    debugger;
    return collectionData(lista, {idField: 'id'})
  }
}
