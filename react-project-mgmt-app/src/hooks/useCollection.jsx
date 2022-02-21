import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
	// State
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);

	// Setup a reference to the query array that is being passed in using the useRef hook's current property
	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	// useEffect hook that fires whenever the collection changes
	useEffect(() => {
		let ref = projectFirestore.collection(collection);
		// Check if there is a query, if so, call the fb where method and spread and pass the query to it.
		if (query) {
			ref = ref.where(...query);
		}
		// Check if we have a value for the orderBy ref
		if (orderBy) {
			ref = ref.orderBy(...orderBy);
		}

		const unsubscribe = ref.onSnapshot(
			(snapshot) => {
				let results = [];
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), id: doc.id });
				});
				// Update our documents state with the results variable
				setDocuments(results);
				// Update our error state to null
				setError(error);
			},
			(error) => {
				console.log(error);
				setError(error.message);
			}
		);
		// Clean up function for the unsubscribe event
		return () => unsubscribe();
	}, [collection, query, orderBy]);
	// Return documents and error from our hook
	return { documents, error };
};
