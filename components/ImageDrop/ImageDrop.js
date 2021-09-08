import React from "react";
import * as styles from "./imageDrop.module.css";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

const ImageDrop = ({
  handleChange,
  inputRef,
  preview,
  setPreview,
  setImage,
  highlight,
  setHighlight,
}) => {
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setHighlight(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setHighlight(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setHighlight(true);
        const image = Array.from(e.dataTransfer.files);
        setImage(image[0]);
        setPreview(URL.createObjectURL(image[0]));
      }}
    >
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={handleChange}
        name="image"
        ref={inputRef}
      />
      <div
        className={`${styles.imgContainer} ${
          highlight ? styles.highlight : ""
        }`}
      >
        {!preview ? (
          <div
            className={styles.content}
            onClick={() => inputRef.current.click()}
          >
            <ImageOutlinedIcon />
            <span>Select Image</span>
          </div>
        ) : (
          <div
            className={styles.content}
            onClick={() => inputRef.current.click()}
          >
            <img src={preview} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDrop;
