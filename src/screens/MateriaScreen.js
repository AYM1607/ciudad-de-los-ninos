import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Button, FlexboxGrid, Input, Loader } from "rsuite";
import styled from "styled-components";

import { firebaseQueries } from "../firebase/firebaseQueries";

import Navbar from "../components/Navbar";
import MainContentContainer from "../components/MainContentContainer";
import ClassCard from "../components/ClassCard";

const DetailLabel = styled.span`
  font-size: 1.7em;
`;

const StyledInput = styled(Input)`
  width: 200px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

// TODO: Implement the queries to update the materia.
export default function MateriaScreen(_) {
  const [isloading, setIsLoading] = useState(true);
  const [materia, setMateria] = useState(null);
  const [classesCount, setClassesCount] = useState(0);
  const [passingAttendance, setPassingAttendance] = useState(0);
  // True if the user has modified any of the updatable fields.
  const [pendingChanges, setPendingChanges] = useState(false);
  const match = useRouteMatch();

  const fetchMateria = async () => {
    const materia = await firebaseQueries.getMateriaFromId(
      match.params.materiaId
    );
    setMateria(materia);
    setClassesCount(materia.classesCount);
    setPassingAttendance(materia.passingAttendance);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMateria();
  }, []);

  // Sets pending changes ever time the user modifies any of the inputs.
  useEffect(() => {
    if (!materia) {
      return;
    }
    setPendingChanges(
      classesCount !== materia.classesCount ||
        passingAttendance !== materia.passingAttendance
    );
  }, [classesCount, passingAttendance, materia]);

  const onUpdateMateria = async () => {
    // No need to update if the values didn't change.
    if (
      classesCount === materia.classesCount &&
      passingAttendance === materia.passingAttendance
    ) {
      return;
    }

    // Validate the
    if (!Number.isInteger(classesCount) || classesCount < 0) {
      alert(
        "El número de clases totales tiene que ser entero y positivo. Ejemplo: 10, 24 ó 6"
      );
      return;
    }

    if (passingAttendance > 1 || passingAttendance < 0) {
      alert(
        "El porcentaje para aprobación tiene que ser una fracción entre 0 y 1. Ejemplo: 0.5, 0.75 ó 0.9"
      );
      return;
    }

    alert("Validation successfull");
  };

  const renderButtonsRow = () => {
    return (
      <FlexboxGrid align="middle">
        <Button color="green" size="lg" onClick={() => onUpdateMateria()}>
          Guardar
        </Button>
        <Button
          color="blue"
          size="lg"
          style={{ marginLeft: "10px" }}
          onClick={() =>
            alert("Esta funcionalidad está pendiente, intentalo más tarde")
          }
        >
          Generar reporte
        </Button>
        {pendingChanges ? (
          <span
            style={{ color: "salmon", marginLeft: "10px", fontSize: "1.3em" }}
          >
            Tienes cambios sin guardar
          </span>
        ) : (
          ""
        )}
      </FlexboxGrid>
    );
  };

  const renderMateriaDetails = () => {
    return (
      <>
        <h3>Detalles:</h3>
        <FlexboxGrid>
          <DetailLabel>Clases totales: </DetailLabel>
          <StyledInput
            type="number"
            value={classesCount}
            onChange={(v) => setClassesCount(Number(v))}
          />
        </FlexboxGrid>
        <FlexboxGrid>
          <DetailLabel>Porcentaje para aprobación: </DetailLabel>
          <StyledInput
            type="number"
            value={passingAttendance}
            onChange={(v) => setPassingAttendance(Number(v))}
          />
        </FlexboxGrid>
      </>
    );
  };

  const renderAttendanceCards = () => {
    return (
      <>
        <h3 style={{ marginTop: "20px" }}>Asistencia:</h3>
        {materia.classes.map((clase) => (
          <ClassCard clase={clase} materia={materia} key={clase.name} />
        ))}
      </>
    );
  };

  const renderContent = () => {
    if (isloading || !materia) {
      return <Loader size="lg" center />;
    }
    return (
      <div>
        <h2>{materia.name}</h2>
        {renderMateriaDetails()}
        {renderButtonsRow()}
        {renderAttendanceCards()}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <MainContentContainer>{renderContent()}</MainContentContainer>
    </div>
  );
}
