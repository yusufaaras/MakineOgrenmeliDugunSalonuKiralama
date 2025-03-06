import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AuthPage from "./Login/AuthPage";
import ProfilePage from "./Profile/ProfilePage";
import BookingList from "./Booking/BookingList";
function App() {
  return (
    <Template>
      <Switch>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/products/:slug">
          <ProductDetail />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/AuthPage" exact>
          <AuthPage />
        </Route>
        <Route path="/Profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/booking">
        <BookingList />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
