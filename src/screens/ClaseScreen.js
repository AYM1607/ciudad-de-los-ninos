import React, { useCallback, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Button, FlexboxGrid, Input, Loader, Modal } from "rsuite";
import AttendanceCard from "../components/AttendanceCard";
import Expanded from "../components/Expanded";
import MainContentContainer from "../components/MainContentContainer";
import Navbar from "../components/Navbar";
import { firebaseQueries } from "../firebase/firebaseQueries";

export default function ClaseScreen(_) {
  const [materia, setMateria] = useState(null);
  const [attendances, setAttendances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(true);
  const match = useRouteMatch();

  const { materiaId, claseName } = match.params;

  const updateMateria = useCallback(
    (doc) => {
      setMateria(doc.data());

      // Extract only the attendance for the current class.
      const { attendance: newAttendances } = doc
        .data()
        .classes.find((clase) => clase.name === claseName);

      // Put the unverified attendances first.
      newAttendances.sort((a, b) => {
        return !b.verified && a.verified ? 1 : -1;
      });

      setAttendances(newAttendances);
    },
    [claseName]
  );

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
    }
  }, [materia]);

  const verifyAttendance = async (attendanceId) => {
    // Find index of the class.
    const claseIndex = materia.classes.findIndex(
      (clase) => clase.name === claseName
    );

    // Find index of the attendance.
    const attendanceIndex = materia.classes[claseIndex].attendance.findIndex(
      (attendance) => attendance.id === attendanceId
    );

    const classesCopy = JSON.parse(JSON.stringify(materia.classes));
    classesCopy[claseIndex].attendance[attendanceIndex].verified = true;

    await firebaseQueries.updateMateriaFromId(materiaId, {
      classes: classesCopy,
    });
  };

  const constructAttendanceLink = () => {
    return new URL(
      `https://unruffled-hamilton-b133c3.netlify.app/asistencia?materia=${materiaId}&clase=${claseName}`
    ).toString();
  };

  const renderAttendanceCards = () => {
    return attendances && attendances.length > 0 ? (
      attendances.map((attendance) => (
        <AttendanceCard
          attendanceObj={attendance}
          key={attendance.id}
          onVerify={() => verifyAttendance(attendance.id)}
        />
      ))
    ) : (
      <h4 style={{ color: "salmon" }}>Aun no se registran asistencias</h4>
    );
  };

  const renderLinkModal = () => {
    return (
      <Modal show={isLinkModalOpen} onHide={() => setIsLinkModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Link para los padres</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input componentClass="textarea" value={constructAttendanceLink()} />
        </Modal.Body>
        <Modal.Footer>
          <Button color="green" onClick={() => setIsLinkModalOpen(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader size="lg" center />;
    }

    return (
      <MainContentContainer>
        <h2>{materia.name}</h2>
        <FlexboxGrid align="middle" style={{ marginBottom: "20px" }}>
          <h2>Asistencias:</h2>
          <Expanded />
          <Button
            color="blue"
            size="lg"
            onClick={() => setIsLinkModalOpen(true)}
          >
            Generar link para asistencia
          </Button>
        </FlexboxGrid>
        {renderAttendanceCards()}
        {renderLinkModal()}
      </MainContentContainer>
    );
  };

  return (
    <div>
      <Navbar />
      {renderContent()}
    </div>
  );
}
