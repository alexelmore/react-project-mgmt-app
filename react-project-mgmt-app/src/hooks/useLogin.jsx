import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
	// State for isCancelled, error and pending
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	// Destructure Auth Context Hook
	const { dispatch, user } = useAuthContext();

	// Funtion that gets invoked whenever user wants to login.
	const login = async (email, password) => {
		setError(null);
		setIsPending(true);
		console.log(user);
		try {
			// Try to sign the user in
			const response = await projectAuth.signInWithEmailAndPassword(
				email,
				password
			);

			/* 
			After the user is signed in, we need to set the user's document online property to true.
			We are setting the document's online property to true after the user signs in because so that we can have access to the user's uid.
			*/
			const { uid } = user;
			await projectFirestore.collection("users").doc(uid).update({
				online: true,
			});

			// Dispatch login action
			dispatch({ type: "LOG_IN", payload: response.user });

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

	return { login, error, isPending };
};
