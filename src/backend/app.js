const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//Settings
const port = process.env.PORT || 3001;
const storageCovers = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, __dirname + "./../frontend/common/img/covers");
  }
});
const storageWallpapers = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, __dirname + "./../frontend/common/img/wallpapers");
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

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const uploadPhoto = multer({
  storage: storageCovers
});
const uploadWallpaper = multer({
  storage: storageWallpapers
});

//MongoDB
const db = require("./db");
db.connect().then(db => {
  //Static
  app.use(express.static(path.join(__dirname, "./../../build")));

  // @route   GET /
  // @desc    Send index.html
  // @access  Public
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../../build/", "index.html"));
  });

  // @route   GET /rest/shows
  // @desc    Send All the movies in the server
  // @access  Public
  app.get("/rest/shows", (req, res) => {
    let collection = db.collection("shows");
    collection.find({}).toArray(function(err, result) {
      err
        ? res.send(err)
        : result.length
        ? res.send(result)
        : res.send("No documents found");
    });
  });

  // @route   POST /rest/shows/add/photo
  // @desc    Create a new movie, adding title, description, trailerUrl and a movie cover image;
  // @access  Public
  app.post(
    "/rest/shows/add/photo",
    uploadPhoto.fields(filesToBeUpload),
    (req, res) => {
      const originalname = req.files.photo[0].originalname;
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
      const oldPath =
        __dirname + `./../frontend/common/img/covers/${originalname}`;
      const newPath =
        __dirname + `./../frontend/common/img/covers/${idMovie}.jpg`;

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
  app.post(
    "/rest/shows/add/wallpaper",
    uploadWallpaper.fields(wallpaperToBeUpload),
    (req, res) => {
      const wallpaperName = req.files.wallpaper[0].originalname;
      const wallpaperNewName = req.body.name;
      const oldPath =
        __dirname + `./../frontend/common/img/wallpapers/${wallpaperName}`;
      const newPath =
        __dirname +
        `./../frontend/common/img/wallpapers/${wallpaperNewName}.jpg`;

      fs.rename(oldPath, newPath, err => {
        if (err) {
          console.log(err);
          res.send({ err });
        } else {
          res.json({ message: "ok" });
        }
      });
    }
  );

  // @route   GET /rest/shows/:movie
  // @desc    Send the Movie searched by ID
  // @access  Public
  app.get("/rest/shows/:movie", (req, res) => {
    let collection = db.collection("shows");
    let movieIdReq = req.params.movie;
    collection.findOne({ id: movieIdReq }, (err, result) => {
      err ? res.send(err) : res.send(result);
    });
  });

  // @route   PATCH /rest/shows/edit/cover/:movieId
  // @desc    update cover image (if there is) and update title, description, and trailerUrl (if there is)
  // @access  Public
  app.patch(
    "/rest/shows/edit/photo/:movieId",
    uploadPhoto.fields(filesToBeUpload),
    (req, res) => {
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
          __dirname + `./../frontend/common/img/covers/${movieId}.jpg`;
        fs.unlink(oldPhotoPath, err => {
          if (err) throw err;
          console.log(`successfully deleted ${oldPhotoPath}`);
        });

        //Then change that image name with the Id
        const oldPath =
          __dirname + `./../frontend/common/img/covers/${originalName}`;
        const newPath =
          __dirname + `./../frontend/common/img/covers/${movieId}.jpg`;
        fs.rename(oldPath, newPath, err => {
          if (err) {
            console.log(err);
            res.send({ err });
          } else {
            console.log(`successfully renamed ${newPath}`);
          }
        });
      }
      //Update information in database
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
            res.send(result);
          }
        }
      );
    }
  );

  // @route   PATCH /rest/shows/edit/wallpaper/:movieId
  // @desc    update wallpaper image with a new image;
  // @access  Public
  app.patch(
    "/rest/shows/edit/wallpaper/:movieId",
    uploadWallpaper.fields(wallpaperToBeUpload),
    (req, res) => {
      const movieId = req.params.movieId;
      const originalName = req.files.wallpaper[0].originalname;
      //Delete image before
      const oldPhotoPath =
        __dirname + `./../frontend/common/img/wallpapers/${movieId}.jpg`;
      fs.unlink(oldPhotoPath, err => {
        if (err) throw err;
        console.log(`successfully deleted ${oldPhotoPath}`);
      });
      //Rename new Image
      const oldPath =
        __dirname + `./../frontend/common/img/wallpapers/${originalName}`;
      const newPath =
        __dirname + `./../frontend/common/img/wallpapers/${movieId}.jpg`;
      fs.rename(oldPath, newPath, err => {
        if (err) {
          console.log(err);
          res.send({ err });
        } else {
          console.log(`successfully renamed ${newPath}`);
        }
      });
    }
  );

  // @route   PATCH /rest/shows/delete/:idMovie
  // @desc    delete one tv show with id idMovie
  // @access  Public
  app.delete("/rest/shows/delete/:idMovie", (req, res) => {
    const idMovie = req.params.idMovie;
    const collection = db.collection("shows");
    const oldPhotoPath =
      __dirname + `./../frontend/common/img/covers/${idMovie}.jpg`;
    const oldWallpaperPath =
      __dirname + `./../frontend/common/img/wallpapers/${idMovie}.jpg`;

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
      err ? res.send(err) : res.send(result);
    });
  });

  // @route   POST /rest/user/sign/in
  // @desc    Sign in using email and password
  // @access  Public
  app.post("/rest/user/sign/in", (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    const collection = db.collection("users");
    collection.findOne({ email }, (err, result) => {
      if (err) throw err;
      result.password === password
        ? res.json({ message: "Correct Credentials" })
        : res.json({ error: "Error! User or Password incorrect!" });
    });
  });

  //Server Run
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
