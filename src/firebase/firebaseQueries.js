import firebase from "./firebase";

const db = firebase.firestore();

class FirebaseQueries {
  /**
   * Get all the classes (or materias) in the db.
   */
  async getAllMaterias() {
    const snapshot = await db.collection("materias").get();
    const docs = snapshot.docs.map((docSnap) => {
      return { ...docSnap.data(), docPath: docSnap.ref.path };
    });
    return docs;
  }

  async getMateriaFromId(materiaId) {
    const docSnap = await db.collection("materias").doc(materiaId).get();
    if (!docSnap.exists) {
      return null;
    }

    return {
      ...docSnap.data(),
      docPath: docSnap.ref.path,
    };
  }

  subscribeToMateriaFromId(materiaId, callback) {
    const unsubscribe = db
      .collection("materias")
      .doc(materiaId)
      .onSnapshot(callback);

    return unsubscribe;
  }

  updateMateriaFromId(materiaId, data) {
    return db.collection("materias").doc(materiaId).update(data);
  }
}

export const firebaseQueries = new FirebaseQueries();
