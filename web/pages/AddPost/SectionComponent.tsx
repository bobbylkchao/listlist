import styled from "styled-components";
import Hline from "../../src/components/Hline";

const SectionComponent = (params: { no: number, title: string, children: any }) => {
  const SectionWrapper = styled.div`
    background-color: #ffffff;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
  `;

  const SectionOrderIcon = styled.span`
    background-color: #ececee;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 2px 10px;
    margin-right: 10px;
    font-size: 13px;
  `;

  return(
    <SectionWrapper>
      <div>
        <SectionOrderIcon>{ params.no }</SectionOrderIcon>
        <span>{ params.title }</span>
      </div>
      <Hline marginTop="15px" marginBottom="15px"/>
      <div>{ params.children }</div>
    </SectionWrapper>
  );
};

export default SectionComponent;
