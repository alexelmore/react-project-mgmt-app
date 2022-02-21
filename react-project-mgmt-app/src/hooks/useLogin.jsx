import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
	// State for isCancelled, error and pending
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	// Destructure Auth Context Hook
	const { dispatch } = useAuthContext();

	// Funtion that gets invoked whenever user wants to login.
	const login = async (email, password) => {
		setError(null);
		setIsPending(true);

		try {
			// Try to sign the user in
			const response = await projectAuth.signInWithEmailAndPassword(
				email,
				password
			);

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
