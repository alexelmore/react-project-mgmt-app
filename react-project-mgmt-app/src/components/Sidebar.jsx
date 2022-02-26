import { NavLink } from "react-router-dom";
// Icons
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

// Styles
import "./Sidebar";

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">{/* Avatar for user */} Hey User</div>
				<nav className="links">
					<ul>
						<li>
							<NavLink exact to="/">
								<img src={DashboardIcon} alt="dashboard icon" />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink exact to="/create">
								<img src={AddIcon} alt="add project icon" />
								<span>New Project</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default Sidebar;
