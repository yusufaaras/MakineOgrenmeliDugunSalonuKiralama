import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Template from "./template/Template";
import AdminTemplate from "./AdminTemplate/AdminTemplate";
import ProductDetail from "./products/detail/ProductDetail";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AuthPage from "./Login/AuthPage";
import ProfilePage from "./Profile/ProfilePage";
import Dashboard from "./Admin/Dashboard/Dashboard";
import HallList from "./Admin/Hall/HallList";
import AddHall from "./Admin/Hall/AddHall";
import Reservation from "./Admin/Reservation/Reservation";
import AddReservation from "./Admin/Reservation/AddReservation";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

function RoutesWithTemplate() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? (
    <AdminTemplate>
      <Switch>
        <ProtectedAdminRoute exact path="/admin" component={Dashboard} />
        <ProtectedAdminRoute exact path="/admin/dashboard" component={Dashboard} />
        <ProtectedAdminRoute exact path="/admin/Hall" component={HallList} />
        <ProtectedAdminRoute exact path="/admin/Hall/AddHall" component={AddHall} />
        <ProtectedAdminRoute exact path="/admin/Reservation" component={Reservation} />
        <ProtectedAdminRoute exact path="/admin/Reservation/AddReservation" component={AddReservation} />
        <ProtectedAdminRoute exact path="/admin/users" render={() => <h1>Admin User Management</h1>} />

      </Switch>
    </AdminTemplate>
  ) : (
    <Template>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:slug" component={ProductDetail} />
        <Route exact path="/AuthPage" component={AuthPage} />
        <Route exact path="/Profile" component={ProfilePage} />
      </Switch>
    </Template>
  );
}

function App() {
  return (
    <Router>
      <RoutesWithTemplate />
    </Router>
  );
}

export default App;
