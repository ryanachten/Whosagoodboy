import { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";
import ClassificationImage from "./ClassificationImage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 500px;
`;

const FileUpload = () => {
  const [image, setImage] = useState("");

  const onFileChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.files && target.files[0]) {
        const url = URL.createObjectURL(target.files[0]);
        setImage(url);
      }
    },
    []
  );

  return (
    <Wrapper>
      <label htmlFor="file-upload">Choose dog image to classify</label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      {image && <ClassificationImage imageUri={image} />}
    </Wrapper>
  );
};

export default FileUpload;
