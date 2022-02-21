import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/config";
export const AuthContext = createContext();

// Auth Context Reducer Function; Function is being exported just in case we decide to use this function in another file later on.
export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOG_IN":
			return { ...state, user: action.payload };
		case "LOG_OUT":
			return { ...state, user: null };
		case "AUTH_IS_READY":
			return { ...state, user: action.payload, authIsReady: true };
		default:
			return state;
	}
};

// Auth Context Provider Component
export const AuthProvider = ({ children }) => {
	// State for Auth Context Reducer
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false,
	});

	// useEffect fires as soon as our app loads, which then fires the "onAuthStateChanged" function on projectAuth, which checks to see if the user is currently logged in or not
	useEffect(() => {
		// Inside of the projectAuth's onAuthStateChanged function, we pass in the user object and dispatch the "AUTH_IS_READY" action.
		const unsub = projectAuth.onAuthStateChanged((user) => {
			dispatch({ type: "AUTH_IS_READY", payload: user });
			// We then unsubscribe from the projectAuth.onAuthStateChanged listener
			unsub();
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
