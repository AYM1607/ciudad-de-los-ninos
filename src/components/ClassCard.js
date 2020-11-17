import React from "react";
import GenericListCard from "./GenericListCard";

export default function ClassCard({ clase, materia }) {
  return (
    <GenericListCard
      cardText={clase.name}
      buttonText={"Detalles"}
      url={`/materias/${materia.name}/clases/${clase.name}`}
    />
  );
}
