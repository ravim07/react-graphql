import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import RouteFiles from ".";
import PrivateRoutes from "./PrivateRoutes";
import SessionRoute from "./SessionRoute";

const RoutesData = () => {
  return (
    <React.Fragment>
      <Router>
        {/* <Suspense fallback={<div>loding</div>}> */}
        <Routes>
          {RouteFiles.map((item, key) =>
            item.private ? (
              <Route exact element={<PrivateRoutes />} key={key}>
                <Route
                  key={key}
                  exact={item.exact}
                  path={item.path}
                  name={item.name}
                  element={item.element}
                />
              </Route>
            ) : (
              <Route exact element={<SessionRoute />} key={key}>
              <Route
                key={key}
                exact={item.exact}
                path={item.path}
                name={item.name}
                element={item.element}
              />
              </Route>
            )
          )}
        </Routes>
        {/* </Suspense> */}
      </Router>
    </React.Fragment>
  );
};

export default RoutesData;
