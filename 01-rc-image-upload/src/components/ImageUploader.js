import { useState, useRef } from "react";
import axios from "axios";

const UPLOAD_URL = "http://localhost:5000/uploads";

const ImageUploader = () => {
  const [images, setImages] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef();

  const handleChange = (event) => {
    setImages(event.target.files);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('Image', images[0]);

      // const res = await fetch(UPLOAD_URL, {
      //   method: "POST",
      //   body: formData
      // });

      // const data = await res.json();
      // console.log(data);

      const { data: { message } } = await axios.post(UPLOAD_URL, formData);
      alert(message);
      
      setImages(undefined);
      inputRef.current.value = "";

    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }

  };

  return (
    <>
      <h1>Image Uploader</h1>
      <input
        type="file"
        onChange={handleChange}
        accept="image/*"
        ref={inputRef}
        multiple
        disabled={isUploading}
      />
      {images?.length ? (
        <>
          <div className="img-preview">
            {Array.from(images).map((image, index) => (
              <img alt="" src={URL.createObjectURL(image)} key={index}/>
            ))}
          </div>
          <div className="action-buttons">
            <button onClick={handleClick} disabled={isUploading}>Change</button>
            <button onClick={handleUpload} disabled={isUploading}>Upload</button>
          </div>
        </>
      ) : (
        <button onClick={handleClick}>Chose Images</button>
      )}
    </>
  );
};

export default ImageUploader;
