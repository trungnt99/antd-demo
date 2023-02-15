import { useEffect, useState } from "react"
import { db } from "../firebase/config"

const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt');

        // condition
        /**
         * {
         *  fieldName: 'abc',
         *  operator:'==',
         *  comparevalue:'abd' 
         * }
         */
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length)
                return;

            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
        }
        const unsubscibe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocuments(documents);
        })
        return unsubscibe;
    }, [collection, condition]);
    return documents;
}

export default useFirestore;