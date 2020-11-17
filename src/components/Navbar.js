import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Icon } from "rsuite";
import styled from "styled-components";

const NavBrand = styled.span`
  display: inline-block;

  padding-left: 10px;

  height: 56px;
  line-height: 56px;

  font-size: 1.8em;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
export default function NavBar(_) {
  const history = useHistory();

  return (
    <Navbar>
      <Navbar.Header>
        <NavBrand onClick={() => history.push("/")}>
          Ciudad de los niños
        </NavBrand>
      </Navbar.Header>
      <Navbar.Body>
        <Nav pullRight>
          <Nav.Item icon={<Icon icon="sign-in" />}>Iniciar sesión</Nav.Item>
          <Nav.Item>Registrarse</Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
}
