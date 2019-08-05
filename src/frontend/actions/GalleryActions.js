export function getAllMoviesShows() {
    return fetch('/rest/shows')
      .then(response => response.json())
      .then(shows => {
        this.setState({
          movies: shows
        });
      })
      .catch(err => {
        console.log(err);
      });
}