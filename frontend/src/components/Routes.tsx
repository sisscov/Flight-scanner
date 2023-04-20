import { Redirect, Route, Switch } from "react-router-dom";
import Flights from "./Flights";
import ConfirmationPage from "./ConfirmationPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/flights">
        <Flights />
      </Route>
      <Route exact path="/confirmationpage">
        <ConfirmationPage />
      </Route>
      <Route path="*">
        <Redirect to="flights" />
      </Route>
    </Switch>
  );
};

export default Routes;
