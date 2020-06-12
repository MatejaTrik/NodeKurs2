console.log('Before')
// Async function
getUser(1, function(user) {
    console.log('User:', user);

    // Get the repos // Async function in async function
    getRepositories(user.gitHubUserName, (repos) => {
        console.log('Repos', displayCommits)

        //Ako ubacimo jos neku async funkciu to nazivamo

        //CALBACK HELL 
    })
})
console.log('After')

function displayCommits(commits) {
    console.log(commits)
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUserName: 'mosh'})
    }, 2000)
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GithUb api....');
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000)
    
}