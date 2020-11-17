import React from "react";
import { FlexboxGrid, Button } from "rsuite";
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

export default function AttendanceCard({ attendanceObj, onVerify }) {
  const { name, type, verified } = attendanceObj;

  const textFromAttendanceType = (type) => {
    switch (type) {
      case 1:
        return "Solo papá";
      case 2:
        return "Solo mamá";
      case 3:
        return "Ambos padres";
      default:
        return "Error";
    }
  };

  return (
    <Card>
      <FlexboxGrid style={{ height: "100%" }} align="middle">
        <CardText>{`${name} - ${textFromAttendanceType(type)}`}</CardText>
        <Expanded />
        <Button
          size="lg"
          color={verified ? "green" : "red"}
          onClick={onVerify}
          disabled={verified}
        >
          {verified ? "Verificado" : "Verificar"}
        </Button>
      </FlexboxGrid>
    </Card>
  );
}
