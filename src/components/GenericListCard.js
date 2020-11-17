import React from "react";
import { useHistory } from "react-router-dom";
import { Button, FlexboxGrid } from "rsuite";
import styled from "styled-components";
import Expanded from "./Expanded";

const Card = styled.div`
  border-radius: 10px;

  height: 80px;
  margin-bottom: 10px;
  padding: 10px;

  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.63);
  -webkit-box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.63);
  -moz-box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.63);
`;

const CardText = styled.span`
  display: inline-block;
  font-size: 1.5em;
`;

export default function GenericListCard({ cardText, buttonText, url }) {
  const history = useHistory();
  return (
    <Card>
      <FlexboxGrid style={{ height: "100%" }} align="middle">
        <CardText>{cardText}</CardText>
        <Expanded />
        <Button size="lg" color="blue" onClick={() => history.push(url)}>
          {buttonText}
        </Button>
      </FlexboxGrid>
    </Card>
  );
}
