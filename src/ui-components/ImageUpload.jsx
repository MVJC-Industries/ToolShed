import React, { useState, useEffect, useRef } from "react";
// import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router";

const ImageUpload = () => {
  // const [cookies, setCookie] = useCookies();
  const [images, setImages] = useState();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  //current saved in an array on local storage > look at how is it saved in action -CC

  const showImg = async () => {
    try {
      const data = await fetch(`/api/images/getImages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // params: currentUser.email,
      });
      const json = await data.json();
      const images = [];
      json.forEach((image) => {
        images.push(<img src={image.image}></img>);
      });
      setImages(images);
    } catch (err) {
      return err;
    }
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    if (files.length > 6) {
      return alert("You've reached the maximum number of files");
    }
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const temp = files.slice();
      temp.push(e.dataTransfer.files[0]);
      setFiles(temp);
      console.log(files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    // while (files.length < 6) {
    if (files.length > 6) {
      return alert("You've reached the maximum number of files");
    }
    if (e.target.files && e.target.files[0]) {
      const temp = files.slice();
      temp.push(e.target.files[0]);
      setFiles(temp);
      console.log(files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  // handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file);
    });
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ' - ' + pair[1]);
    // }
    try {
      await fetch(`/images/upload-file-to-cloud-storage/${currentUser.email}`, {
        method: "POST",
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // },
        body: formData,
      });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      return alert("Issue uploading your images. Please try again later.");
    }
  };
  // const removeImage = (e)
  const preview = [];
  files.forEach((file, i) => {
    console.log(file);
    preview.push(
      <div>
        <img
          className="image_preview"
          key={`img-${i}`}
          src={URL.createObjectURL(file)}
        />
        <button className="deleteImage">x</button>
      </div>
    );
  });

  return (
    <div>
      <label>Share the Moments from Your Outdoor Adventures!</label>
      <form
        encType="multipart/form-data"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          name="image"
          accept="image/*"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {/* <button type='submit' className='profile-order-button'>
          Upload
        </button> */}
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <button onClick={(e) => handleFileUpload(e)} id="image_upload">
          Upload
        </button>
      </form>
      <div id="preview_container">
        {preview}
        <label>{files.length}/6 Images Selected</label>
      </div>
    </div>
  );
};
export default ImageUpload;
