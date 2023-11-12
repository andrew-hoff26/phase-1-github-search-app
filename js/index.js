const form = document.querySelector('#github-form');
const searchInput = document.querySelector('#search');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

form.addEventListener('submit', event => {
  event.preventDefault();

  const username = searchInput.value.trim();

  if (username === '') {
    // Handle empty search input
    return;
  }

  // Clear previous search results
  userList.innerHTML = '';
  reposList.innerHTML = '';

  // Make request to GitHub User Search API
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then(response => response.json())
    .then(data => {
      if (data.items.length === 0) {
        // Handle no search results found
        return;
      }

      // Display user information
      const user = data.items[0];
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <img src="${user.avatar_url}" alt="${user.login}" width="100">
      `;
      userList.appendChild(userItem);

      // Make request to GitHub User Repos API
      fetch(`https://api.github.com/users/${user.login}/repos`)
        .then(response => response.json())
        .then(reposData => {
          // Display user repositories
          reposData.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            `;
            reposList.appendChild(repoItem);
          });
        })
        .catch(error => {
          console.error('Error fetching user repositories:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching user:', error);
    });
});
