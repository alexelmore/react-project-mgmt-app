// Link
import { Link } from "react-router-dom";
// custom useLogout hook
import { useLogout } from "../hooks/useLogout";
// Temple svg
import Temple from "../assets/temple.svg";
// Styles
import "./Navbar.css";

export default function Navbar() {
	// Destructure and pull out logout and isPending from our custom useLogout hook
	const { logout, isPending } = useLogout();
	return (
		<nav className="navbar">
			<ul>
				<li className="logo">
					<img src={Temple} alt="Project MGMT Logo" />
					<span>Project Manager</span>
				</li>

				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/signup">Sign Up</Link>
				</li>
				<li>
					{!isPending && (
						<button className="btn" onClick={logout}>
							Logout
						</button>
					)}
					{isPending && (
						<button className="btn" disabled>
							Logging out...
						</button>
					)}
				</li>
			</ul>
		</nav>
	);
}
