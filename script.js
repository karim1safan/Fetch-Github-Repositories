document.querySelector(".get-button").onclick = function () {
  const input = document.querySelector("input");
  const username = input.value.trim();
  const showData = document.querySelector(".show-data");

  if (username === "") {
    showData.innerHTML = `<span class="error">Please enter a username</span>`;
    return;
  }

  showData.innerHTML = "Loading...";

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then((repos) => {
      if (repos.length === 0) {
        showData.innerHTML = `<span class="error">No public repositories found</span>`;
        return;
      }

      showData.innerHTML = ""; // Clear previous data

      repos.forEach((repo) => {
        showData.innerHTML += `
          <div class="repo-box">
            <div class="repo-name">${repo.name}</div>
            <div class="repo-actions">
              <a href="${repo.html_url}" target="_blank">Visit</a>
              <span>⭐ ${repo.stargazers_count}</span>
            </div>
          </div>
        `;
      });
    })
    .catch((error) => {
      showData.innerHTML = `<span class="error">${error.message}</span>`;
    });
};
