// Hooks
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
// Styles
import "./SignUp.css";
export default function SignUp() {
	// Component Level State
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbnailError, setThumbnailError] = useState(null);

	// Destructure signup,isPending and error properties from custom useSignup hook
	const { signup, isPending, error } = useSignup();

	// Function that handles form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		signup(email, password, displayName, thumbnail);
	};

	// Function that handles file upload
	const handleFileChange = (e) => {
		let selected = e.target.files[0];
		console.log(selected);
		if (!selected) {
			setThumbnailError("Plese Select a file");
			return;
		}
	};
	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<label>
				<span>Email:</span>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Password:</span>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>

			<label>
				<span>Display Name:</span>
				<input
					type="text"
					onChange={(e) => setDisplayName(e.target.value)}
					value={displayName}
				/>
			</label>

			<label>
				<span>Profile thumbnail:</span>
				<input required type="file" onChange={handleFileChange} />
				{thumbnailError && <div className="error">{thumbnailError}</div>}
			</label>

			{isPending ? (
				<button className="btn" disabled>
					loading
				</button>
			) : (
				<button className="btn">Sign Up</button>
			)}
			{error && <p>{error}</p>}
		</form>
	);
}
