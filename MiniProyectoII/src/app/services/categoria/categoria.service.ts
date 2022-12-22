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
export class CategoriaService {

  constructor(private firestore: Firestore) { }

  getCategorias(){
    const lista = collection(this.firestore, 'categorias');
    return collectionData(lista, {idField: 'id'})
  }
}
