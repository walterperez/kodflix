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
    cb(null, __dirname + "./../frontend/common/img/covers"); //This is giving the path
  }
});
const storageWallpapers = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, __dirname + "./../frontend/common/img/wallpapers"); //This is giving the path
  }
});

//Middlewares
const uploadPhoto = multer({
  storage: storageCovers
  // dest: "./../frontend/common/img/covers" //This doesn't work apparently
});
const uploadWallpaper = multer({
  storage: storageWallpapers
  // dest: "./../frontend/common/img/covers" //This doesn't work apparently
});

//MongoDB
const db = require("./db");
db.connect().then(db => {
  //Static
  app.use(express.static(path.join(__dirname, "./../../build")));

  //Routes
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../../build/", "index.html"));
  });

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

  app.post(
    "/rest/shows/add/photo",
    uploadPhoto.fields(filesToBeUpload),
    (req, res) => {
      const originalname = req.files.photo[0].originalname;
      const { title, description, trailer } = req.body;
      let collection = db.collection("shows");
      const newUrl = trailer.replace(/watch\?v=/gi, "embed/");
      const newName = originalname.replace(/.jpg/, "");
      let document = {
        id: newName,
        title,
        synopsis: description,
        movieUrl: newUrl
      };
      collection.insert(document, { w: 1 });
      res.json({ id: newName });
    }
  );

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

  app.get("/rest/shows/:movie", (req, res) => {
    let collection = db.collection("shows");
    let movieIdReq = req.params.movie;
    collection.findOne({ id: movieIdReq }, (err, result) => {
      err ? res.send(err) : res.send(result);
    });
  });

  //Server Run
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
