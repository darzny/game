import { getLeaderboardData } from "./api/leaderboard.js";

document.addEventListener("DOMContentLoaded", async () => {
	const leaderboardContainer = document.getElementById("leaderboard");

	try {
		const data = await getLeaderboardData();

		leaderboardContainer.innerHTML = "";

		console.log(data);

		if (data.length > 0) {
			const table = document.createElement("table");
			table.innerHTML = `
						<thead>
							<tr>
								<th>Rank</th>
								<th>Username</th>
								<th>Score</th>
								<th>Date</th>
							</tr>
						</thead>
					`;
			const tbody = document.createElement("tbody");

			data.forEach((entry, index) => {
				const row = document.createElement("tr");
				row.innerHTML = `
							<td>${index + 1}</td>
							<td>${entry.username}</td>
							<td>${entry.score}</td>
							<td>${new Date(entry.createdAt).toLocaleDateString()}</td>
						`;
				tbody.appendChild(row);
			});

			table.appendChild(tbody);
			leaderboardContainer.appendChild(table);
		} else {
			leaderboardContainer.innerHTML = "<p>No results available</p>";
		}
	} catch (error) {
		console.error("Error fetching leaderboard data:", error);
		leaderboardContainer.innerHTML =
			"<p>An error occurred while fetching data.</p>";
	}
});
