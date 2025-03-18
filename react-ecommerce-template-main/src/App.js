import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Template from "./template/Template";
import AdminTemplate from "./AdminTemplate/AdminTemplate";
import ProductDetail from "./products/detail/ProductDetail";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AuthPage from "./Login/AuthPage";
import ProfilePage from "./Profile/ProfilePage";
import Dashboard from "./Admin/Dashboard/Dashboard";

function RoutesWithTemplate() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? (
    <AdminTemplate>
      <Switch>        
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/dashboard" component={Dashboard} />
        <Route exact path="/admin/users" render={() => <h1>Admin User Management</h1>} />
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
