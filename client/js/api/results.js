export const getUserResults = () => {
	return fetch("/api/results")
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			throw error;
		});
};
