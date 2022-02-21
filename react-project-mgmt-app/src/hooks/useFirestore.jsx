import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timeStamp } from "../firebase/config";

// Variable that is the initial state
let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

// Reducer function
const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			return {
				isPending: true,
				document: null,
				success: false,
				error: null,
			};
		case "ADDED_DOC":
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			};
		case "DELETED_DOC":
			return {
				isPending: false,
				document: null,
				success: true,
				error: null,
			};
		case "HAS_ERROR":
			return {
				isPending: false,
				document: null,
				success: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	// State
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	// Collection reference
	const ref = projectFirestore.collection(collection);

	// Function that checks if component is still mounted before dispatching actions
	const dispatchIfNotCancelled = (action) => {
		// Check if component is still mounted and then dispatch the action
		if (!isCancelled) {
			dispatch(action);
		}
	};

	// Function to add a new document to the projectFirestore collection
	const addDocument = async (document) => {
		// Dispatch the "IS_PENDING" action
		dispatch({
			type: "IS_PENDING",
		});

		try {
			// Create timestamp for added document
			const createdAt = timeStamp.fromDate(new Date());
			// Make request to add document to firestore db
			const addedDocument = await ref.add({ ...document, createdAt });
			// Call  dispatchIfNotCancelled function and pass it the action type and document for its payload
			dispatchIfNotCancelled({ type: "ADDED_DOC", payload: addedDocument });
		} catch (error) {
			dispatchIfNotCancelled({
				type: "HAS_ERROR",
				payload: error.message,
			});
		}
	};

	// Function to remove a document to the projectFirestore collection
	const deleteDocument = async (docId) => {
		// Dispatch the "IS_PENDING" action
		dispatch({
			type: "IS_PENDING",
		});

		try {
			// Make request to delete document from firestore db
			await ref.doc(docId).delete();
			// Call  dispatchIfNotCancelled function and pass it the action type and document for its payload
			dispatchIfNotCancelled({ type: "DELETED_DOC" });
		} catch (error) {
			dispatchIfNotCancelled({
				type: "HAS_ERROR",
				payload: error.message,
			});
		}
	};

	// useEffect hook used for a clean up function
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, deleteDocument, response };
};
