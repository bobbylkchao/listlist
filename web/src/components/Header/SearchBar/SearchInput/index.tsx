import React from "react";
import styled from 'styled-components';

const Input = styled.input`
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  color: #979797;
  font-weight: 300;
  border: 1px solid #D1D2D6;
  border-right: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  
  ::placeholder {
    color: #979797;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #979797;
  }

  ::-ms-input-placeholder {
    color: #979797;
  }

  &:focus{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

const SearchInput = (props:{width?: number, getData: (v: string) => void}) => {
  const [searchKey, updateSearchKey] = React.useState<string | undefined>("");

  const onKeyUp = (v: string) => {
    updateSearchKey(v);
    props.getData(v);
  };

  return(
    <Input
      placeholder="Search for anything..."
      value={searchKey}
      onChange={e => onKeyUp(e.target.value)}
      style={{flex: props.width ? props.width : 1}}
    />
  );
};

export default SearchInput;
