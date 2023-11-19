document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#github-form').addEventListener('submit', function(event) {
document.querySelector('#github-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const searchValue = document.querySelector('#search').value; 

  fetch(`https://api.github.com/search/users?q=${searchValue}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); 

      const userList = document.querySelector('#user-list');

      userList.innerHTML = '';

      data.items.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userList.appendChild(li);

        li.addEventListener('click', function() {
          getUserRepos(user.login);
        });
      });
    })
    .catch(error => console.error(error));
});

function getUserRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
      console.log(data); 

      const reposList = document.querySelector('#repos-list');

      reposList.innerHTML = '';

      data.forEach(repo => {
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p>${repo.description}</p>
        `;
        reposList.appendChild(li);
      });
    })
    .catch(error => console.error(error));
}
});
});