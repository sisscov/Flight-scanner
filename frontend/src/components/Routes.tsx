import { Redirect, Route, Switch } from "react-router-dom";
import Flights from "./Flights";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/flights">
        <Flights />
      </Route>
      <Route path="*">
        <Redirect to="flights" />
      </Route>
    </Switch>
  );
};

export default Routes;
