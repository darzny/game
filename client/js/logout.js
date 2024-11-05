import { logout } from "./api/auth.js";

(function () {
	"use strict";

	const handleLogout = async (event) => {
		event.preventDefault();

		try {
			const response = await logout();
			if (response.ok) {
				window.location.href = "/";
			} else {
				const result = await response.json();
				alert(result.message || "Logout failed");
			}
		} catch (error) {
			alert(error.message);
		}
	};

	document.getElementById("logout")?.addEventListener("click", handleLogout);
})();
