import React, { useState, useCallback, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  AutoComplete,
  Button,
  FlexboxGrid,
  Loader,
  Radio,
  RadioGroup,
} from "rsuite";
import styled from "styled-components";

import MainContentContainer from "../components/MainContentContainer";
import NavBar from "../components/Navbar";

import { firebaseQueries } from "../firebase/firebaseQueries";

const FormLabel = styled.span`
  font-size: 1.7em;
`;

export default function AttendanceScreen(_) {
  const [materia, setMateria] = useState(null);
  const [familias, setFamilias] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [attendanceType, setAttendanceType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const match = useRouteMatch();

  const { materiaId, claseName } = match.params;

  const updateMateria = useCallback((doc) => {
    setMateria(doc.data());
    setFamilias(doc.data().registeredFamilies);
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseQueries.subscribeToMateriaFromId(
      materiaId,
      updateMateria
    );
    return unsubscribe;
  }, [materiaId, updateMateria]);

  useEffect(() => {
    if (materia) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [materia]);

  const onSubmit = async () => {
    // Validation.
    if (!selectedFamily || !attendanceType) {
      alert("Por favor escribe tus apellidos y selecciona quien asiste");
      return;
    }

    if (
      familias.findIndex((familia) => familia.name === selectedFamily) === -1
    ) {
      alert(
        "Los apellidos proporcionados no coincided con ninguna familia registrada, revisa que estén escritos correctamente"
      );
      return;
    }

    // Make sure that the attendance hasn't been sent for this family.
    const claseIndex = materia.classes.findIndex(
      (clase) => clase.name === claseName
    );

    if (
      materia.classes[claseIndex].attendance.findIndex(
        (attendanceObj) => attendanceObj.name === selectedFamily
      ) !== -1
    ) {
      alert(
        "Ya se tiene registrada una asistencia para esta familia, recibiras una confirmación en tu correo una vez que sea confirmada"
      );
      return;
    }

    const { id: familyId } = materia.registeredFamilies.find(
      (family) => family.name === selectedFamily
    );
    const classesCopy = JSON.parse(JSON.stringify(materia.classes));

    const confirmed = window.confirm(
      "La información proporcionada será verificada por uno de nuestros colaboradoes, y recibiras una confirmación en tu correo. Seguro que deseas registrar tu asistencia?"
    );

    if (!confirmed) {
      return;
    }

    classesCopy[claseIndex].attendance.push({
      id: familyId,
      name: selectedFamily,
      type: attendanceType,
      verified: false,
    });

    setIsLoading(true);
    firebaseQueries.updateMateriaFromId(materiaId, { classes: classesCopy });
    // Give time to propagate so the user doesn't submit twice.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    alert("Listo! recibiras un correo en cuanto tu asistencia sea confirmada");
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader center size="lg" />;
    }
    return (
      <MainContentContainer>
        <h3>{materiaId}</h3>
        <h4>{`Asistencia ${claseName}:`}</h4>
        <FlexboxGrid align="middle" style={{ marginBottom: "20px" }}>
          <FormLabel>Familia: </FormLabel>
          <AutoComplete
            onChange={(v) => setSelectedFamily(v)}
            placeholder="Appellidos"
            data={familias.map((family) => family.name)}
            style={{ marginLeft: "10px" }}
          />
        </FlexboxGrid>
        <FormLabel>Quién asiste?</FormLabel>
        <RadioGroup onChange={(v) => setAttendanceType(v)}>
          <Radio value={1}>Solo papá</Radio>
          <Radio value={2}>Solo mamá</Radio>
          <Radio value={3}>Ambos padres</Radio>
        </RadioGroup>
        <Button
          color="green"
          size="lg"
          style={{ marginTop: "20px" }}
          onClick={onSubmit}
        >
          Registrar asistencia
        </Button>
      </MainContentContainer>
    );
  };

  return (
    <div>
      <NavBar />
      {renderContent()}
    </div>
  );
}
