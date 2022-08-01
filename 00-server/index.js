const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const PORT = process.PORT || 5000;

const app = express();

app.use(fileUpload({
  createParentPath: true
}));
app.use(cors());

app.post("/uploads", (req, res) => {
  if (req.files?.Image === undefined) {
    res.status(400).send({ message: "Please upload a file!" });
    return;
  }
  const Image = req.files.Image;

  Image.mv(`./uploads/${Image.name}`, (err) => {
    if(err) return res.status(500).send({ message: "Couldn't save the image", err });
  });

  return res.status(200).send({
    message: `${req.files.Image.name}: Uploaded the file successfully`,
    url: `http://localhost:${PORT}/uploads/${Image.name}`,
    path: `${__dirname}/uploads/${ Image.name}`,
  });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
