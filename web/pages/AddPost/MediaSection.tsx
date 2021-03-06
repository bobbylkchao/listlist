import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// listlist
import webConfig from '../../src/web.config';
import styles from './styles.module.scss';
import {
  getImageBase64,
  urlValidation,
  compressionImage,
  thumbnailImage,
} from '../../src/utils';
import {
  AddImageWrapper,
  AddPostFileUploadPureBtn,
  Title,
  RemoveBtn,
  RemoveBtnIcon,
  SetMainBtn,
  MainPhoto,
  YoutubeVideoRemarkWrapper,
} from '../../src/styled/MediaSectionStyled';
import {
  uploadImagesCallback,
  youtubeCallback,
  websitelinkCallback,
} from '../../src/utils/callbacks/MediaSectionCallback';

const MediaSection = (params: {onRef: any, callback: (res: any) => void}) => {
  const [images, setImages] = React.useState<any>([]);
  const [youtubeValidation, setYoutubeValidation] = React.useState<boolean>(true);
  const [websiteURLValidation, setWebsiteURLValidation] = React.useState<boolean>(true);

  // create interfaces to main form component to set validation via ref
  React.useImperativeHandle(params.onRef, () => {
    return{
      valid: {
        validYoutubeURL: (valid: boolean) => {
          setYoutubeValidation(valid);
        },
        validWebsiteURL: (valid: boolean) => {
          setWebsiteURLValidation(valid);
        },
      }
    }
  });

  const getUploadFiles = async(e: any) => {
    if(images.length >= webConfig.maxUploadPhotos) return alert('Maximum 10 photos');

    if(e.files){
      for(let i = 0; i < webConfig.maxUploadPhotos; i++) {
        if(e.files[i]){
          const compressedFile = await compressionImage(e.files[i]);// create compressed file
          const base64Result = await getImageBase64(compressedFile);// compressed file to base64

          const thumbnailFile = await thumbnailImage(compressedFile);// create thumnnail file based on compressed file
          const thumbnailBase64Result = await getImageBase64(thumbnailFile);// thumnnail file to base64
          
          setImages((preImages: any) => {
            const newArraySet:any = [...preImages, {
              img: base64Result,
              thumbnail: thumbnailBase64Result,
              main: images.length === 0 && i === 0 ? true : false,// if no image, then set first image as the main
            }];
            uploadImagesCallback(newArraySet, params);
            return newArraySet;
          });
        }
      }
    }
  };
  
  const removeAFile = (index: number) => {
    setImages((preImages: any) => {
      // if the `main` image to be deleted, replace the `main` to first image
      if(preImages[index].main === true){
        preImages[0].main = true;
      }

      // if the item to be deleted is first image, and it is the `main`, replace the `main` to next image
      if(index === 0 && preImages[index].main === true && preImages.length > 1){
        preImages[index+1].main = true;
      }

      const newArraySet = preImages.filter((item: any, key: number) => key !== index);

      uploadImagesCallback(newArraySet, params);

      return newArraySet;
    });
  };

  const setImageAsMain = (key: number) => {
    setImages((preImages: any) => {
      preImages.map((item:any) => item.main = false);
      preImages[key].main = true;
      uploadImagesCallback([...preImages], params);
      return [...preImages];
    });
  };
  
  return(
    <>
      <Form.Group
        as={Row}
        className={`${styles.add_post_media_form_wrapper} mb-3`}
        controlId="addPost_media"
      >
        <Title>
          Include pictures with different angles and details. You can upload a maximum of { webConfig.maxUploadPhotos } photos, that are at least 300px wide or tall (we recommend at least 1000px). Drag and drop to change the order of your pictures.
        </Title>
        <AddImageWrapper
          style={{display: images.length >= webConfig.maxUploadPhotos ? 'none' : 'flex'}}
          id="AddImageWrapper"
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
          images ? images.map((item: any, key: number) => (
            <AddImageWrapper key={key}>
              { item.main ? <MainPhoto>Main</MainPhoto> : null }
              <img src={item.img}/>
              <RemoveBtn>
                { item.main ? null : <SetMainBtn onClick={() => setImageAsMain(key)}>Set as Main</SetMainBtn> }
                <RemoveBtnIcon>
                  <FontAwesomeIcon icon="times" onClick={() => removeAFile(key)}/>
                </RemoveBtnIcon>
              </RemoveBtn>
            </AddImageWrapper>
          )) : null
        }
      </Form.Group>

      <Form.Group as={Row} className={`mb-3 ${styles.add_post_media_input_wrapper} ${styles.alignTopWithoutGap}`} controlId="addPost_youtubelink">
        <Form.Label column sm={3}>
          <div>YouTube Video</div>
          <div className={styles.add_post_form_optional_title}>(optional)</div>
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder=""
            onChange={(e:any) => {
              youtubeCallback(e.target.value, params);
              if(e.target.value){
                setYoutubeValidation(urlValidation(e.target.value));
              }else{
                setYoutubeValidation(true);
              }
            }}
            onBlur={(e:any) => {
              if(e.target.value){
                setYoutubeValidation(urlValidation(e.target.value));
              }else{
                setYoutubeValidation(true);
              }
            }}
            isInvalid={!youtubeValidation}
          />
          <Form.Control.Feedback type="invalid">Please enter a valid URL</Form.Control.Feedback>
          <YoutubeVideoRemarkWrapper>
            <div>Add a YouTube video to your ad.</div>
            <div>Example: http://www.youtube.com/watch?v=&lt;your video id&gt;</div>
          </YoutubeVideoRemarkWrapper>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className={`mb-3 ${styles.add_post_media_input_wrapper}`} controlId="addPost_websitelink">
        <Form.Label column sm={3}>
          <div>Website URL</div>
          <div className={styles.add_post_form_optional_title}>(optional)</div>
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder=""
            onChange={(e:any) => {
              websitelinkCallback(e.target.value, params)
              if(e.target.value){
                setWebsiteURLValidation(urlValidation(e.target.value));
              }else{
                setWebsiteURLValidation(true);
              }
            }}
            onBlur={(e:any) => {
              if(e.target.value){
                setWebsiteURLValidation(urlValidation(e.target.value));
              }else{
                setWebsiteURLValidation(true);
              }
            }}
            isInvalid={!websiteURLValidation}
          />
          <Form.Control.Feedback type="invalid">Please enter a valid URL</Form.Control.Feedback>
        </Col>
      </Form.Group>
    </>
  );
};

export default MediaSection;
