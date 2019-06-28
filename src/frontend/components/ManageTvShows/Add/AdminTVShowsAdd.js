import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './AdminTVShowsAdd.scss';

class AdminTVShowsAdd extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      trailer: '',
      file: '',
      wallpaper: '',
      message: '',
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

    if (!title || !description || !trailer || !file || !wallpaper) {
      this.setState({
        error: "You haven't edited nothing yet!"
      });
    }

    const myBody = new FormData();
    myBody.append('photo', file);
    myBody.append('title', title);
    myBody.append('description', description);
    myBody.append('trailer', trailer);

    const myWallpapper = new FormData();
    myWallpapper.append('wallpaper', wallpaper);

    fetch('/rest/shows/add/photo', {
      method: 'POST',
      body: myBody
    })
      .then(response => response.json())
      .then(json => {
        console.log('My answer before second post: ', json);
        const name = json.id;
        myWallpapper.append('name', name);
        fetch('/rest/shows/add/wallpaper', {
          method: 'POST',
          body: myWallpapper
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
              title: '',
              description: '',
              trailer: '',
              file: '',
              wallpaper: '',
              message: data.message
            });
            setTimeout(() => {
              this.props.history.push('/');
            }, 2000);
          })
          .catch(err => {
            this.setState({
              error: err
            });
          });
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
  }

  render() {
    let { title, description, trailer, message, error } = this.state;
    return (
      <div className="AdminTVShowsAdd">
        {message && (
          <div className="confirmation__message">
            <div className="confirmation__message__box">
              <h3>{message}</h3>
            </div>
          </div>
        )}
        {error && (
          <div className="confirmation__error">
            <div className="confirmation__error__box">
              <h3>{error}</h3>
            </div>
          </div>
        )}
        <h3 className="AdminTVShowsAdd__Title">Add a TV show</h3>
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
              required
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
              required
            />
            <h5 className="AdminTVShowsAdd__Form_Item--Text">
              Add a new movie cover:
            </h5>
            <input
              className="AdminTVShowsAdd__Form_Item--File"
              type="file"
              onChange={e => this.handlePhotoLoad(e)}
              name="photo"
              required
            />
            <h5 className="AdminTVShowsAdd__Form_Item--Text">
              Add a new movie wallpaper:
            </h5>
            <input
              className="AdminTVShowsAdd__Form_Item--File"
              type="file"
              onChange={e => this.handleWallpaperLoad(e)}
              name="wallpaper"
              required
            />
            <input
              type="text"
              placeholder="Trailer URL"
              className="AdminTVShowsAdd__Form_Item"
              name="trailer"
              value={trailer}
              onChange={e => this.handleTextChange(e)}
              required
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
export default withRouter(AdminTVShowsAdd);
