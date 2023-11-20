document.addEventListener("DOMContentLoaded", () => {
// One function to fetch https://api.github.com/users/octocat/repos
document.getElementById('github-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const searchValue = document.getElementById('search').value;

  fetch(`https://api.github.com/search/users?q=${searchValue}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      const userList = document.getElementById('user-list');
      userList.innerHTML = ''; 

      const users = data.items; 
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.login;
        userList.appendChild(listItem);
      });
    })
    .catch(error => {
    });
});



// Second fucntion to create the elements and render it to the DOM






})