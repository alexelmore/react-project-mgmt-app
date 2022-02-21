import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import Temple from "../assets/temple.svg";
// Styles
import "./Navbar.css";

export default function Navbar() {
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
