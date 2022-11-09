const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
			apiUrl: "https://swapi.dev/api",
			characters: [],
			planets: [],
			favorites: []
		},

		actions: {
			// Use getActions to call a function within a fuction
			getCharacters: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${store.apiUrl}/people`);
					if (!response.ok) {
						alert("We have a problem with the GetCharacters");
						return;
					}
					const body = await response.json();
					setStore({
						characters: body.results
					})
					return body;
				} catch (error) {
					console.log(error);
				}
			},
			getPlanets: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${store.apiUrl}/planets`)
					if (!response.ok) {
						alert("We have a problem with the GetPlanets");
					}
					const body = await response.json();
					setStore({
						planets: body.results
					})
					return body;
				} catch (error) {
					console.log(error);
				}
			},
			getCardDetails: async (id, type) => {
				const store = getStore();
				try {
					const response = await fetch(`${store.apiUrl}/${type}/${id}`);
					if (!response.ok) {
						alert("We have a problem with the GetCardDetails");
					}
					const body = await response.json();
					return body;
				} catch (error) {
					console.log(error);
				}
			},
			isFavorite: (item) => {
				const store = getStore();
				return store.favorites.find(
					(favorite, index) => favorite.name === item.name)
			},
			toggleFavorites: (item) => {
				const store = getStore();
				const actions = getActions();

				if (actions.isFavorite(item)) {
					setStore({
						favorites: store.favorites.filter(
							(favorite) => favorite.name !== item.name
						)
					})
				} else {
					setStore({
						favorites: [
							...store.favorites,
							item
						]
					}
					)
				}
			},
			deleteFavorite: (item) => {
				const store = getStore();
				const isFavorite = store.favorites.find(
					(favorite, index) => favorite.name === item.name)

				if (isFavorite) {
					setStore({
						favorites: store.favorites.filter(
							(favorite) => favorite.name !== isFavorite.name
						)
					})
				}
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
		},
	};
};

export default getState;
