import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageDataService {

  constructor(private afs: AngularFirestore) { }



  getData() {
    return this.afs.collection(`notifications`).get();
  }
}
