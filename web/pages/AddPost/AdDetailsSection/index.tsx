import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import CloseButton from 'react-bootstrap/CloseButton';

// listlist
import styles from '../styles.module.scss';
import Button from '../../../src/components/Button';
import Link from '../../../src/components/Link';
import CategoryModal from '../../../src/components/CategoryModal';
import { regexLetterNumberSpace } from '../../../src/utils';
import { AdDetailsSectionWrapper, Gap, TagsWrapper } from './styled';
import {
  categoryCallback,
  adTitleCallback,
  adTypeCallback,
  forSaleByCallback,
  adDescriptionCallback,
  fulfillmentCallback,
  cashlessCallback,
  conditionCallback,
  tagsCallback,
} from './callback';// these callbacks are used to pass this form elements' value to main form hook state

const AdDetailsSection = (params: {callback: (res: any) => void}) => {
  // values
  const [adTypeCheckedValue, setAdTypeCheckedValue] = React.useState<number>(1);
  const [forSaleByCheckedValue, setForSaleByCheckedValue] = React.useState<number>(1);
  const [fulfillmentCheckedValue, setFulfillmentCheckedValue] = React.useState<[string]>(['']);

  // validation
  const [formValid, setFormValid] = React.useState<{
    title: { valid: boolean, message: string },
    description: { valid: boolean, message: string },
  }>({
    title: { valid: true, message: '' },
    description:  { valid: true, message: '' },
  });

  // tags
  const [tags, setTags] = React.useState<[]>([]);
  const [tagTyping, setTagTyping] = React.useState<string | number | null | undefined>('');

  // category
  const [currentCategory, setCurrentCategory] = React.useState<{
    one: {
      id?: string,
      index?: string,
      title?: string,
    },
    two: {
      id?: string,
      index?: string,
      title?: string,
    },
    three: {
      id?: string,
      index?: string,
      title?: string,
    },
  }>({
    one: {},
    two: {},
    three: {},
  });
  
  // categroy modal
  const CategoryModalRef = React.createRef<any>();

  const categoryModalCallback = (res: any) => {
    setCurrentCategory(res);
    categoryCallback(res, params);
  };

  // after render show category selection modal
  React.useEffect(() => {
    CategoryModalRef.current.show();
  }, []);

  return(
    <AdDetailsSectionWrapper>
      {/**category */}
      <CategoryModal onRef={CategoryModalRef} callback={categoryModalCallback}/>
      <Form.Group as={Row} className="mb-3" controlId="addPost_category">
        <Form.Label column sm={3}>
          Select Category
        </Form.Label>
        <Col sm={9} className={styles.add_post_form_category_flex}>
          <span>{ currentCategory.one ? currentCategory.one.title : '' }</span>
          <span>{ currentCategory.two.title ? '>' : '' }</span>
          <span>{ currentCategory.two ? currentCategory.two.title : '' }</span>
          <span>{ currentCategory.three.title ? '>' : '' }</span>
          <span>{ currentCategory.three ? currentCategory.three.title : '' }</span>
          <Link onClick={() => CategoryModalRef.current.show()}>Change category</Link>
        </Col>
      </Form.Group>

      <Gap/>

      {/**ad title */}
      <Form.Group as={Row} className="mb-3" controlId="addPost_adtitle">
        <Form.Label column sm={3}>
          Ad title
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder=""
            onBlur={(e:any) => {

              // init variables
              let validationMessage: string = '';
              let validStatus: boolean = true;

              // validate
              if(!e.target.value){
                validationMessage = 'Please input your ad title';
                validStatus = false;
              }else if(e.target.value.length <= 4){
                validationMessage = 'Your ad title length is too short';
                validStatus = false;
              }

              // update state
              setFormValid((previousData:any) => ({
                ...previousData,
                title: {
                  valid: validStatus,
                  message: validationMessage,
                }
              }));

              // form data callback
              if(validStatus){
                adTitleCallback(e.target.value, params);
              }

            }}
            isInvalid={!formValid.title.valid}
            required
          />
          <Form.Control.Feedback type="invalid">{ formValid.title.message }</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Gap/>

      {/**ad type */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            Ad Type
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="I'm offering"
              name="addPost_adtype"
              id="addPost_adtype_offering"
              value={1}
              className={styles.add_post_form_adtype_o1}
              onChange={(e:any) => {
                if(e.target.checked){
                  adTypeCallback(e.target.value, params);
                }
                if(e.target.checked && e.target.value !== 1){
                  setAdTypeCheckedValue(1);
                }
              }}
              checked={adTypeCheckedValue===1 ? true : false}
            />
            <Form.Check
              type="radio"
              label="I want to find"
              name="addPost_adtype"
              id="addPost_adtype_buy"
              value={2}
              className={styles.add_post_form_adtype_o2}
              onChange={(e:any) => {
                if(e.target.checked){
                  adTypeCallback(e.target.value, params);
                }
                if(e.target.checked && e.target.value !== 2){
                  setAdTypeCheckedValue(2);
                }
              }}
              checked={adTypeCheckedValue===2 ? true : false}
            />
          </Col>
        </Form.Group>
      </fieldset>
      
      <Gap/>

      {/**for sale by */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            For Sale By
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="Owner"
              name="addPost_forsaleby"
              id="addPost_forsaleby_owner"
              value={1}
              onChange={(e:any) => {
                if(e.target.checked){
                  forSaleByCallback(e.target.value, params);
                }
                if(e.target.checked && e.target.value !== 1){
                  setForSaleByCheckedValue(1);
                }
              }}
              checked={forSaleByCheckedValue===1 ? true : false}
            />
            <Form.Check
              type="radio"
              label="Business"
              name="addPost_forsaleby"
              id="addPost_forsaleby_business"
              value={2}
              onChange={(e:any) => {
                if(e.target.checked){
                  forSaleByCallback(e.target.value, params);
                }
                if(e.target.checked && e.target.value !== 2){
                  setForSaleByCheckedValue(2);
                }
              }}
              checked={forSaleByCheckedValue===2 ? true : false}
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Gap/>

      {/**description */}
      <Form.Group as={Row} className="mb-3" controlId="addPost_description">
        <Form.Label column sm={3}>
          Description
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            as="textarea"
            type="text"
            placeholder=""
            size="lg"
            style={{ height: 180 }}
            isInvalid={!formValid.description.valid}
            required
            onBlur={(e:any) => {

              // init variables
              let validationMessage: string = '';
              let validStatus: boolean = true;

              // validate
              if(!e.target.value){
                validationMessage = 'Please input your ad description';
                validStatus = false;
              }else if(e.target.value.length <= 10){
                validationMessage = 'Description must be 10 or more characters';
                validStatus = false;
              }

              // update state
              setFormValid((previousData:any) => ({
                ...previousData,
                description: {
                  valid: validStatus,
                  message: validationMessage,
                }
              }));

              // form data callback
              if(validStatus){
                adDescriptionCallback(e.target.value, params);
              }

            }}
          />
          <Form.Control.Feedback type="invalid">{ formValid.description.message }</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Gap/>

      {/**fulfillment */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            <div>Fulfillment</div>
            <div className={styles.add_post_form_optional_title}>(optional)</div>
          </Form.Label>
          <Col
            sm={9}
            className={styles.add_post_form_row_v_center}
          >
            <Form.Check
              type="checkbox"
              label="Willing to drop-off / deliver"
              name="addPost_fulfillment"
              id="addPost_fulfillment_1"
              value={1}
              onChange={(e:any) => {
                // get array set except e.target.value
                let newArray = fulfillmentCheckedValue.filter((item: any) => item !== e.target.value);

                if(e.target.checked){
                  // if checked, add value to array set
                  if(newArray.length === 1 && newArray[0] === ''){
                    // if array set with nothing
                    setFulfillmentCheckedValue([e.target.value]);
                    fulfillmentCallback(JSON.stringify([e.target.value]), params);
                    return;
                  }
                  newArray = [...newArray, e.target.value];
                }

                // update
                setFulfillmentCheckedValue(newArray);
                fulfillmentCallback(JSON.stringify(newArray), params);
              }}
            />
            <Form.Check
              type="checkbox"
              label="Willing to ship the item"
              name="addPost_fulfillment"
              id="addPost_fulfillment_2"
              value={2}
              onChange={(e:any) => {
                // get array set except e.target.value
                let newArray = fulfillmentCheckedValue.filter((item: any) => item !== e.target.value);

                if(e.target.checked){
                  // if checked, add value to array set
                  if(newArray.length === 1 && newArray[0] === ''){
                    // if array set with nothing
                    setFulfillmentCheckedValue([e.target.value]);
                    fulfillmentCallback(JSON.stringify([e.target.value]), params);
                    return;
                  }
                  newArray = [...newArray, e.target.value];
                }

                // update
                setFulfillmentCheckedValue(newArray);
                fulfillmentCallback(JSON.stringify(newArray), params);
              }}
            />
            <Form.Check
              type="checkbox"
              label="Offer curbside pick up"
              name="addPost_fulfillment"
              id="addPost_fulfillment_3"
              value={3}
              onChange={(e:any) => {
                // get array set except e.target.value
                let newArray = fulfillmentCheckedValue.filter((item: any) => item !== e.target.value);

                if(e.target.checked){
                  // if checked, add value to array set
                  if(newArray.length === 1 && newArray[0] === ''){
                    // if array set with nothing
                    setFulfillmentCheckedValue([e.target.value]);
                    fulfillmentCallback(JSON.stringify([e.target.value]), params);
                    return;
                  }
                  newArray = [...newArray, e.target.value];
                }

                // update
                setFulfillmentCheckedValue(newArray);
                fulfillmentCallback(JSON.stringify(newArray), params);
              }}
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Gap/>

      {/**payment */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            <div>Payment</div>
            <div className={styles.add_post_form_optional_title}>(optional)</div>
          </Form.Label>
          <Col
            sm={9}
            className={styles.add_post_form_row_v_center}
          >
            <Form.Check
              type="checkbox"
              label="Offer cashless payment"
              name="addPost_payment"
              id="addPost_payment"
              value={1}
              onChange={(e:any) => {
                if(e.target.checked){
                  cashlessCallback(1, params);
                }else{
                  cashlessCallback(null, params);
                }
              }}
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Gap/>

      {/**condition */}
      <Form.Group as={Row} className="mb-3" controlId="addPost_condition">
        <Form.Label column sm={3}>
          <div>Condition</div>
          <div className={styles.add_post_form_optional_title}>(optional)</div>
        </Form.Label>
        <Col
          sm={9}
          className={styles.add_post_form_row_v_center}
        >
          <Form.Control
            as="select"
            style={{ width: 180 }}
            onChange={(e:any) => {
              conditionCallback(e.target.value === "" ? null : e.target.value, params);
            }}
          >
            <option value="">- Select -</option>
            <option value={1}>New</option>
            <option value={2}>Used - Like new</option>
            <option value={3}>Used - Good</option>
            <option value={4}>Used - Fair</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Gap/>

      {/**tags */}
      <Form.Group as={Row} className={`mb-3 ${styles.alignTopWithoutGap}`} controlId="addPost_tags">
        <Form.Label column sm={3}>
          <div>Tags</div>
          <div className={styles.add_post_form_optional_title}>(optional)</div>
        </Form.Label>
        <Col sm={9}>
          <div className={styles.add_post_form_tags_remark}>
            Increase your ad exposure. Enter up to 5 keywords someone could search to find your ad.
          </div>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                disabled={tags.length === 5 ? true : false}
                maxLength="30"
                placeholder={tags.length === 5 ? 'Maximum 5 tags reached' : ''}
                onChange={(e:any) => setTagTyping(e.target.value)}
                value={tagTyping}
                onKeyPress={(e:any) => {
                  if(e.charCode === 13){
                    e.preventDefault();
                    e.stopPropagation();
                    const newValue = regexLetterNumberSpace(e.target.value);
                    if(newValue){
                      setTags((tags: []) => {
                        const newArraySet = [...tags, newValue];
                        tagsCallback(JSON.stringify(newArraySet), params);
                        return newArraySet;
                      });
                      setTimeout(() => e.target.value='', 100);
                    }else{
                      e.target.value=''
                    }
                    setTagTyping('');
                  }
                }}
              />
            </Col>
            <Col xs="auto">
              <Button
                height="100%"
                width="60px"
                onClick={(e:any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if(tagTyping){
                    const newValue = regexLetterNumberSpace(tagTyping);
                    if(newValue){
                      setTags((tags: []) => {
                        const newArraySet = [...tags, newValue];
                        tagsCallback(JSON.stringify(newArraySet), params);
                        return newArraySet;
                      });
                    }
                    setTagTyping('');
                  }
                }}
              >Add</Button>
            </Col>
          </Row>

          {
            tags ? <TagsWrapper>
              {
                tags ? tags.map((item: string | number, key: number) => (
                  <Badge
                    key={key}
                    className={`bg-secondary ${styles.tagsItem}`}
                  >
                    <span>{ item }</span>
                    <a className="closeInline" onClick={() => setTags((tags: []) => {
                      const newArraySet = tags.filter((item: any, index: number) => index !== key);
                      tagsCallback(JSON.stringify(newArraySet), params);
                      return newArraySet;
                    })}></a>
                  </Badge>
                )) : null
              }
            </TagsWrapper> : null
          }

        </Col>
      </Form.Group>  

    </AdDetailsSectionWrapper>
  );
};

export default AdDetailsSection;
