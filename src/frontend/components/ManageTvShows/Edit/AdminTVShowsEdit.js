import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './AdminTVShowsEdit.scss';

class AdminTVShowsEdit extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      description: '',
      trailer: '',
      file: '',
      wallpaper: '',
      error: ''
    };
  }

  handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handlePhotoLoad(e) {
    const file = e.target.files[0];
    this.setState({
      file
    });
  }

  handleWallpaperLoad(e) {
    const wallpaper = e.target.files[0];
    this.setState({
      wallpaper
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { title, description, trailer, file, wallpaper } = this.state;

    const myBody = new FormData();
    myBody.append('photo', file);
    myBody.append('title', title);
    myBody.append('description', description);
    myBody.append('trailer', trailer);

    const myWallpapper = new FormData();
    myWallpapper.append('wallpaper', wallpaper);
    fetch(`/rest/shows/edit/photo/${this.state.id}`, {
      method: 'PATCH',
      body: myBody
    })
      .then(response => response.json())
      .then(json => {
        const name = json.id;
        myWallpapper.append('name', name);
        if (this.state.wallpaper) {
          fetch(`/rest/shows/edit/wallpaper/${this.state.id}`, {
            method: 'PATCH',
            body: myWallpapper
          })
            .then(response => response.json())
            .then(data => {
              this.setState({
                id: '',
                title: '',
                description: '',
                trailer: '',
                file: '',
                wallpaper: '',
                message: data.message
              });
              setTimeout(() => {
                this.props.history.push('/manage/tv-shows/list');
              }, 3000);
            })
            .catch(err => console.log(err));
        } else {
          this.setState({
            id: '',
            title: '',
            description: '',
            trailer: '',
            file: '',
            wallpaper: '',
            message: json.message
          });
          setTimeout(() => {
            this.props.history.push('/manage/tv-shows/list');
          }, 2000);
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    fetch(`/rest/shows/${this.props.match.params.idMovie}`)
      .then(response => response.json())
      .then(data => {
        const { id, movieUrl, synopsis, title } = data;
        this.setState({
          id,
          title,
          description: synopsis,
          trailer: movieUrl
        });
      });
  }

  render() {
    let { title, description, trailer, message } = this.state;
    return (
      <div className="AdminTVShowsAdd">
        {message && (
          <div className="confirmation__message">
            <div className="confirmation__message__box">
              <h3>{message}</h3>
            </div>
          </div>
        )}
        <h3 className="AdminTVShowsAdd__Title">Edit a TV show</h3>
        <div className="AdminTVShowsAdd__Form__Container">
          <form onSubmit={e => this.handleFormSubmit(e)}>
            <h5 className="AdminTVShowsAdd__Form_Item--Text">
              Add a new movie title:
            </h5>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => this.handleTextChange(e)}
              className="AdminTVShowsAdd__Form_Item"
              name="title"
            />
            <h5 className="AdminTVShowsAdd__Form_Item--Text">
              Add a new movie description:
            </h5>
            <textarea
              placeholder="Description"
              type="text"
              className="AdminTVShowsAdd__Form_Item--Description"
              onChange={e => this.handleTextChange(e)}
              value={description}
              name="description"
              rows="8"
              cols="40"
            />
            <h5 className="AdminTVShowsAdd__Form_Item--Text">
              Add a new movie cover:
            </h5>
            <input
              className="AdminTVShowsAdd__Form_Item--File"
              type="file"
              onChange={e => this.handlePhotoLoad(e)}
              name="photo"
            />
            <h5 className="AdminTVShowsAdd__Form_Item--Text">
              Add a new movie wallpaper:
            </h5>
            <input
              className="AdminTVShowsAdd__Form_Item--File"
              type="file"
              onChange={e => this.handleWallpaperLoad(e)}
              name="wallpaper"
            />
            <input
              type="text"
              placeholder="Trailer URL"
              className="AdminTVShowsAdd__Form_Item"
              name="trailer"
              value={trailer}
              onChange={e => this.handleTextChange(e)}
            />
            <br />
            <button
              className="AdminTVShowsAdd__Form__Button--Submit"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminTVShowsEdit);
