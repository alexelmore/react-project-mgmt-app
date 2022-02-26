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
		console.log({
			email: email,
			password: password,
			displayName: displayName,
			thumbnail: thumbnail,
		});
		signup(email, password, displayName, thumbnail);
	};

	// Function that handles file upload
	const handleFileChange = (e) => {
		// setThumbnail to null
		setThumbnail(null);
		// init file upload
		let selected = e.target.files[0];
		// Check file upload's existence,type and size
		if (!selected) {
			setThumbnailError("Plese Select a file");
			return;
		}

		if (!selected.type.includes("image")) {
			setThumbnailError("Selected file must be an image");
			return;
		}

		if (selected.size > 120000) {
			setThumbnailError("Image size must be less that 120kb");
			return;
		}
		// If file upload passes checks, re-set setThumbnailError and setThumbnail hooks
		setThumbnailError(null);
		setThumbnail(selected);
		console.log("Thumbnail updated");
	};
	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<label>
				<span>Email:</span>
				<input
					required
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Password:</span>
				<input
					required
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>

			<label>
				<span>Display Name:</span>
				<input
					required
					type="text"
					onChange={(e) => setDisplayName(e.target.value)}
					value={displayName}
				/>
			</label>

			<label>
				<span>Profile Thumbnail:</span>
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
