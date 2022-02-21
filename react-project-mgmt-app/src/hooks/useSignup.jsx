import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
	// State for isCancelled, error and pending
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	// Destructure Auth Context Hook
	const { dispatch } = useAuthContext();

	// Funtion that gets invoked whenever we want to sign a user up.
	const signup = async (email, password, displayName) => {
		setError(null);
		setIsPending(true);
		try {
			// Sign up user with the email & password they entered in
			// projectAuth has a method to sign the user up called "createUserWithEmailAndPassword", which takes two arguments: email and password. It sends back a response.
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);
			// If the response is bad, throw an error
			if (!res) {
				throw new Error("Could not complete signup");
			}

			// Add display name to user object that is returned.
			await res.user.updateProfile({ displayName });

			// Dispatch LOG_IN action
			dispatch({
				type: "LOG_IN",
				payload: res.user,
			});
			// Before we update any state, we make sure that the component has not unmounted
			if (!isCancelled) {
				// Re-set state values
				setIsPending(false);
				setError(null);
			}
			// Catch error if there is one and reset error and pending states
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
	return { signup, error, isPending };
};
