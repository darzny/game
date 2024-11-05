import { getUserResults } from "./api/results.js";

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", async () => {
		const resultsContainer = document.getElementById("my-results");

		try {
			const data = await getUserResults();

			resultsContainer.innerHTML = "";

			if (data.length > 0) {
				const table = document.createElement("table");
				table.innerHTML = `
						<thead>
							<tr>
								<th>Результат</th>
								<th>Дата</th>
								<th>Время</th>
								<th>Итог</th>
							</tr>
						</thead>
					`;
				const tbody = document.createElement("tbody");

				data.forEach((entry) => {
					const row = document.createElement("tr");

					const duration = entry.endTime
						? `${Math.round(
								(new Date(entry.endTime) - new Date(entry.createdAt)) / 1000
						  )}s`
						: "-";

					const result = entry.isWin ? "Победа" : "Поражение";

					row.innerHTML = `
							<td>${entry.score || 0}</td>
							<td>${new Date(entry.createdAt).toLocaleDateString()}</td>
							<td>${duration}</td>
							<td>${result}</td>
						`;
					tbody.appendChild(row);
				});

				table.appendChild(tbody);
				resultsContainer.appendChild(table);
			} else {
				resultsContainer.innerHTML = "<p>Результаты недоступны</p>";
			}
		} catch (error) {
			console.error("Error fetching user results:", error);
			resultsContainer.innerHTML =
				"<p>Произошла ошибка. Попробуйте перезагрузить страницу</p>";
		}
	});
})();
