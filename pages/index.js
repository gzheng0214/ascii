import React, { useEffect, useState, useRef } from "react";
import ImageDrop from "../components/ImageDrop/ImageDrop";
import * as styles from "../styles/Home.module.css";

const HomePage = ({ user }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    document.title = `Welcome, ${user.name.split(" ")[0]}`;
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setImage(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };
  return (
    <div className={styles.home}>
      <ImageDrop
        preview={preview}
        setPreview={setPreview}
        setImage={setImage}
        inputRef={inputRef}
        highlight={highlight}
        setHighlight={setHighlight}
        handleChange={handleChange}
      />
    </div>
  );
};

export default HomePage;
