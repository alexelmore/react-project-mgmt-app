import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout = () => {
	// State for isCancelled, error and pending
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	// Destructure Auth Context Hook
	const { dispatch, user } = useAuthContext();

	// Funtion that gets invoked whenever user wants to logout.
	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			/* 
			Before the user is signed out, we need to set the user's document online property to false.
			We are setting the document's online property to false before the user signs out because we are going to lock down our DB and only allow logged-in users the ability to edit their own document.
			*/
			const { uid } = user;
			await projectFirestore.collection("users").doc(uid).update({
				online: false,
			});

			// Try to sign the user out
			await projectAuth.signOut();

			// Dispatch logout action
			dispatch({ type: "LOG_OUT" });

			// Before we update any state, we make sure that the component has not unmounted
			if (!isCancelled) {
				// Re-set state values
				setIsPending(false);
				setError(null);
			}

			// Catch any errors if there are any
		} catch (err) {
			// Before we update any state, we make sure that the component has not unmounted
			if (!isCancelled) {
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	// useEffect hook that returns a clean up function to prevent errors when the component unmounts
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);
	return { logout, error, isPending };
};
