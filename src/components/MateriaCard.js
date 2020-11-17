import React from "react";
import GenericListCard from "./GenericListCard";

export default function MateriaCard({ materia }) {
  return (
    <GenericListCard
      cardText={materia.name}
      buttonText="Detalles"
      url={`/materias/${materia.name}`}
    />
  );
}
