import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img
						height="75px"
						src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG43.png"
						className="navbar-brand mb-0 h1"
					/>
				</Link>
				<div className="dropdown">
					<button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu">
						{store.favorites.map((favorite, index) => {
							return <li key={index}>
								<a
									className="dropdown-item d-flex justify-content-between align-items-center"
									href="#">
									{favorite.name}
									<i className="btn btn-danger btn-sm fas fa-trash ms-3" onClick={(event) => actions.deleteFavorite(favorite)}></i>
								</a>
							</li>
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
};
