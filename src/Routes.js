import React from "react";
import { Route, Switch } from "react-router-dom";

import AttendanceScreen from "./screens/AttendanceScreen";
import ClaseScreen from "./screens/ClaseScreen";
import MainScreen from "./screens/MainScreen";
import MateriaScreen from "./screens/MateriaScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

export default function Routes(_) {
  return (
    <Switch>
      <Route path="/" exact component={MainScreen} />
      <Route
        path="/materias/:materiaId/clases/:claseName"
        component={ClaseScreen}
      />
      <Route path="/materias/:materiaId" component={MateriaScreen} />
      <Route
        path="/asistencia/:materiaId/:claseName"
        component={AttendanceScreen}
      />
      {/* Catch all */}
      <Route component={NotFoundScreen} />
    </Switch>
  );
}
