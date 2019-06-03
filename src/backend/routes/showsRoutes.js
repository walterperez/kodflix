const { getDB } = require("../db");
const fs = require("fs");
const multer = require("multer");
const showsRoutes = require("express").Router();

//Settings
const storageCovers = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, __dirname + "./../../../movies/covers");
  }
});
const storageWallpapers = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, __dirname + "./../../../movies/wallpapers");
  }
});

const filesToBeUpload = [
  { name: "photo", maxCount: 1 },
  { name: "title", maxCount: 1 },
  { name: "description", maxCount: 1 },
  { name: "trailer", maxCount: 1 }
];
const wallpaperToBeUpload = [
  { name: "wallpaper", maxCount: 1 },
  { name: "name", maxCount: 1 }
];

const uploadPhoto = multer({
  storage: storageCovers
});
const uploadWallpaper = multer({
  storage: storageWallpapers
});

// @route   GET /rest/shows
// @desc    Send All the movies in the server
// @access  Public
showsRoutes.get("/", (req, res) => {
  let db = getDB();
  let collection = db.collection("shows");
  collection.find({}).toArray(function(err, result) {
    err
      ? res.send(err)
      : result.length
      ? res.send(result)
      : res.send("No documents found");
  });
});

// @route   GET /rest/shows/:movie
// @desc    Send the Movie searched by ID
// @access  Public
showsRoutes.get("/:movie", (req, res) => {
  let db = getDB();
  let collection = db.collection("shows");
  let movieIdReq = req.params.movie;
  collection.findOne({ id: movieIdReq }, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

// @route   POST /rest/shows/add/photo
// @desc    Create a new movie, adding title, description, trailerUrl and a movie cover image;
// @access  Public
showsRoutes.post(
  "/add/photo",
  uploadPhoto.fields(filesToBeUpload),
  (req, res) => {
    let db = getDB();
    const originalname = req.files.photo[0].originalname;
    const contentType = req.files.photo[0].mimetype;
    const { title, description, trailer } = req.body;
    const idMovie = title.split(" ").join("-");
    const newUrl = trailer.replace(/watch\?v=/gi, "embed/");
    let collection = db.collection("shows");

    //Add to the db the form information
    let document = {
      id: idMovie,
      title,
      synopsis: description,
      movieUrl: newUrl
    };

    collection.insert(document, { w: 1 });
    //Change cover name to the Id
    const oldPath = __dirname + `./../../../movies/covers/${originalname}`;
    const newPath = __dirname + `./../../../movies/covers/${idMovie}.jpg`;

    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.log(err);
        res.send({ err });
      } else {
        res.json({ id: idMovie });
      }
    });
  }
);

// @route   POST /rest/shows/add/wallpaper
// @desc    Add wallpaper image with the name (the id movie);
// @access  Public
showsRoutes.post(
  "/add/wallpaper",
  uploadWallpaper.fields(wallpaperToBeUpload),
  (req, res) => {
    const wallpaperName = req.files.wallpaper[0].originalname;
    const wallpaperNewName = req.body.name;
    const oldPath = __dirname + `./../../../movies/wallpapers/${wallpaperName}`;
    const newPath =
      __dirname + `./../../../movies/wallpapers/${wallpaperNewName}.jpg`;

    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.log(err);
        res.send({ err });
      } else {
        res.json({ message: "TV show added correctly! :-)" });
      }
    });
  }
);

// @route   PATCH /rest/shows/edit/cover/:movieId
// @desc    update cover image (if there is) and update title, description, and trailerUrl (if there is)
// @access  Public
showsRoutes.patch(
  "/edit/photo/:movieId",
  uploadPhoto.fields(filesToBeUpload),
  (req, res) => {
    let db = getDB();
    let collection = db.collection("shows");
    let movieId = req.params.movieId;
    const { title, description, trailer } = req.body;
    const originalName = req.files.photo
      ? req.files.photo[0].originalname
      : null;
    //Check if the user load a new cover image
    if (originalName) {
      //First Delete the img that was before
      const oldPhotoPath =
        __dirname + `./../../../movies/covers/${movieId}.jpg`;
      fs.unlink(oldPhotoPath, err => {
        if (err) throw err;
        console.log(`successfully deleted ${oldPhotoPath}`);
      });
      //Then change that image name with the Id
      const oldPath = __dirname + `./../../../movies/covers/${originalName}`;
      const newPath = __dirname + `./../../../movies/covers/${movieId}.jpg`;
      fs.rename(oldPath, newPath, err => {
        if (err) {
          console.log(err);
          res.send({ err });
        } else {
          console.lg(`successfully renamed ${newPath}`);
        }
      });
    }
    collection.updateOne(
      { id: movieId },
      {
        $set: {
          title: title,
          synopsis: description,
          movieUrl: trailer
        }
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send({ message: "Movie successfully updated!" });
        }
      }
    );
  }
);

// @route   PATCH /rest/shows/edit/wallpaper/:movieId
// @desc    update wallpaper image with a new image;
// @access  Public
showsRoutes.patch(
  "/edit/wallpaper/:movieId",
  uploadWallpaper.fields(wallpaperToBeUpload),
  (req, res) => {
    const movieId = req.params.movieId;
    const originalName = req.files.wallpaper[0].originalname;
    //Delete image before
    const oldPhotoPath =
      __dirname + `./../../../movies/wallpapers/${movieId}.jpg`;
    fs.unlink(oldPhotoPath, err => {
      if (err) throw err;
      console.log(`successfully deleted ${oldPhotoPath}`);
    });
    //Rename new Image
    const oldPath = __dirname + `./../../../movies/wallpapers/${originalName}`;
    const newPath = __dirname + `./../../../movies/wallpapers/${movieId}.jpg`;
    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.log(err);
        res.send({ err });
      } else {
        console.log(`successfully renamed ${newPath}`);
        res.send({ message: "Movie successfully updated!" });
      }
    });
  }
);

// @route   DELETE /rest/shows/delete/:idMovie
// @desc    delete one tv show with id idMovie
// @access  Public
showsRoutes.delete("/delete/:idMovie", (req, res) => {
  const db = getDB();
  const idMovie = req.params.idMovie;
  const collection = db.collection("shows");
  const oldPhotoPath = __dirname + `./../../../movies/covers/${idMovie}.jpg`;
  const oldWallpaperPath =
    __dirname + `./../../../movies/wallpapers/${idMovie}.jpg`;

  //Delete two images: cover & wallpaper
  fs.unlink(oldPhotoPath, err => {
    if (err) throw err;
    console.log(`successfully deleted ${oldPhotoPath}`);
  });
  fs.unlink(oldWallpaperPath, err => {
    if (err) throw err;
    console.log(`successfully deleted ${oldWallpaperPath}`);
  });
  //Delete all data from DB
  collection.deleteOne({ id: idMovie }, (err, result) => {
    err ? res.send(err) : res.send({ message: "Movie Successfully deleted!" });
  });
});

// @route   GET /rest/shows/cover/:idMovie
// @desc    get one cover tv show with id idMovie
// @access  Public
showsRoutes.get("/cover/:idMovie", (req, res) => {
  const db = getDB();
  const idMovie = req.params.idMovie;
  const collection = db.collection("shows");

  //Send only cover from DB
  collection.findOne({ id: idMovie }, (err, result) => {
    if (err) res.send(err);
    res.setHeader("content-type", result.cover.contentType);
    res.send(result.cover.img.buffer);
  });
});

module.exports = showsRoutes;
