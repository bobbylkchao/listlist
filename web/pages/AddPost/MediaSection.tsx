import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// listlist
import webConfig from '../../src/web.config';
import styles from './styles.module.scss';
import { getImageBase64 } from '../../src/utils';

const AddImageWrapper = styled.div`
  height: 150px;
  width: 150px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 10px;
  margin-bottom: 20px;
  overflow: hidden;

  > span{
    font-size: 80px;
    font-weight: lighter;
    color: #ced4da;
  }

  > svg{
    font-size: 50px;
    color: white;
  }

  > img{
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
`;

const AddPostFileUploadPureBtn = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -moz-opacity: 0.0;
  -khtml-opacity: 0.0;
  opacity: 0.0;

  &:hover{
    cursor: pointer;
  }
`;

const Title = styled.div`
  color: #999999;
  font-size: 13px;
  margin: 5px 0 20px 0;
  padding-left: 0;
  word-break: break-word;
`;

const RemoveBtn = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5px;
  background-color: #fff;
  border-top: 1px solid #ced4da;

  >svg{
    font-size: 13px;
    color: #2681db;
  }

  &:hover{
    cursor: pointer;
  }
`;

const MainPhoto = styled.div`
  position: absolute;
  height: 20px;
  line-height: 20px;
  width: 100%;
  text-align: center;
  background-color: #2681db;
  color: #fff;
  font-size: 13px;
  top: 0;
`;

const MediaSection = () => {
  const [images, setImages] = React.useState<any>([]);

  const getUploadFiles = async(e: any) => {
    console.log(e);
    if(images.length >= webConfig.maxUploadPhotos) return alert('Maximum 10 photos');

    if(e.files){
      for(let i = 0; i < webConfig.maxUploadPhotos; i++) {
        const base64Result = await getImageBase64(e.files[i]);
        setImages((preImages: any) => ([...preImages, base64Result]));
      }
    }
  };
  
  const removeAFile = (index: number) => {
    console.log(`removed...${index}`);
    console.log(images);
    setImages((preImages: any) => ([...preImages.splice(index, 1)]));
  };
  
  return(
    <Form.Group
      as={Row}
      className={`${styles.add_post_media_form_wrapper} mb-3`}
      controlId="addPost_media"
    >
      <Title>
        Include pictures with different angles and details. You can upload a maximum of { webConfig.maxUploadPhotos } photos, that are at least 300px wide or tall (we recommend at least 1000px).
        Drag and drop to change the order of your pictures.
      </Title>
      <AddImageWrapper
        style={{display: images.length >= webConfig.maxUploadPhotos ? 'none' : 'flex'}}
      >
        <span>+</span>
        <AddPostFileUploadPureBtn
          type="file"
          accept="image/*"
          multiple
          onChange={(e: any) => getUploadFiles(e.target)}
          title="upload your images"
        />
      </AddImageWrapper>

      {
        images ? images.map((item: string, key: number) => (
          <AddImageWrapper key={key}>
            { key===0 ? <MainPhoto>Main</MainPhoto> : null }
            <img src={item}/>
            <RemoveBtn onClick={() => removeAFile(key)}>
              <FontAwesomeIcon icon="times"/>
            </RemoveBtn>
          </AddImageWrapper>
        )) : null
      }
      
    </Form.Group>
  );
};

export default MediaSection;
