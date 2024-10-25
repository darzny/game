export const getLeaderboardData = () => {
	return fetch("/api/leaderboard/top")
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			throw error;
		});
};
