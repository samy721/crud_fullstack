import { Route, Switch } from "react-router";
import { AllUsers } from "./pages/allusers";
import { EditPage } from "./pages/editpage";
import { UserDetails } from "./pages/userDetails";



function App() {
  return (
   <div>
     <Switch>
      <Route exact path="/">
        <AllUsers/>
      </Route>
      <Route exact path="/userDetails/:id">
        <UserDetails/>
      </Route>
      <Route exact path="/updateUser/:id">
        <EditPage/>
      </Route>
     </Switch>
   </div>
  );
}

export default App;
