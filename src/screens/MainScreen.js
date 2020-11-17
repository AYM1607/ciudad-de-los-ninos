import React, { useEffect, useState } from "react";
import { FlexboxGrid, Icon, Input, InputGroup, Loader } from "rsuite";
import styled from "styled-components";

import { firebaseQueries } from "../firebase/firebaseQueries";

import MainContentContainer from "../components/MainContentContainer";
import Expanded from "../components/Expanded";
import MateriaCard from "../components/MateriaCard";
import Navbar from "../components/Navbar";

const PageTitle = styled.h1`
  display: inline-block;
`;

export default function MainScreen(_) {
  const [materias, setMaterias] = useState(null);
  const [filteredMaterias, setFilteredMaterias] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitialMaterias = async () => {
    const materias = await firebaseQueries.getAllMaterias();
    setMaterias(materias);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInitialMaterias();
  }, []);

  // Filter materias based on the value entered by the user in the input.
  // If no value is provided (emptry string) all the materias are shown.
  useEffect(() => {
    if (searchValue === "") {
      setFilteredMaterias(materias);
    } else {
      const newFilteredMaterias = materias.filter((materia) =>
        materia.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredMaterias(newFilteredMaterias);
    }
  }, [materias, searchValue]);

  const renderHeading = () => {
    return (
      <FlexboxGrid align="middle" style={{ marginBottom: "20px" }}>
        <PageTitle>Materias</PageTitle>
        <Expanded>
          <InputGroup inside style={{ paddingLeft: "30px" }}>
            <Input
              value={searchValue}
              onChange={(v) => setSearchValue(v)}
              placeholder="Buscar materias"
            />
            {searchValue ? (
              <InputGroup.Button onClick={() => setSearchValue("")}>
                <Icon icon="close" />
              </InputGroup.Button>
            ) : (
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            )}
          </InputGroup>
        </Expanded>
      </FlexboxGrid>
    );
  };

  const renderMateriasList = () => {
    if (isLoading) {
      return <Loader size="lg" center />;
    }
    return filteredMaterias
      ? filteredMaterias.map((materia) => (
          <MateriaCard key={materia.name} materia={materia} />
        ))
      : "";
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Content */}
      <MainContentContainer>
        {renderHeading()}
        {renderMateriasList()}
      </MainContentContainer>
    </div>
  );
}
