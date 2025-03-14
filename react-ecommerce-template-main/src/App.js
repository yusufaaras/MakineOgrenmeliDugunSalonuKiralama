import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AuthPage from "./Login/AuthPage";
import ProfilePage from "./Profile/ProfilePage";
<<<<<<< Updated upstream


=======
import BookingList from "./Booking/BookingList";
import BookingButton from "./Booking/BookingButton";
>>>>>>> Stashed changes
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
        </Route >
        <Route path="/BookingButton">
        <BookingButton />
        </Route>
        <Route path="/AuthPage" exact>
          <AuthPage />
        </Route>
        <Route path="/Profile" exact>
          <ProfilePage />
        </Route>
<<<<<<< Updated upstream

=======
    
        
>>>>>>> Stashed changes
      </Switch>
    </Template>
  );
}

export default App;
