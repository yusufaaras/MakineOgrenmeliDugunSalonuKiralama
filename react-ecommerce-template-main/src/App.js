import { Switch, Route, useLocation } from "react-router-dom";
import Template from "./template/Template";
import AdminTemplate from "./AdminTemplate/AdminTemplate";
import ProductDetail from "./products/detail/ProductDetail";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AuthPage from "./Login/AuthPage";
import ProfilePage from "./Profile/ProfilePage";

// Sayfanın yolunu almak için useLocation kullanıyoruz
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? (
        // Eğer admin sayfasındaysak AdminTemplate kullan
        <AdminTemplate>
          <Switch>
            <Route path="/admin/dashboard" exact>
              <h1>Admin Dashboard</h1>
            </Route>
            <Route path="/admin/users" exact>
              <h1>Admin User Management</h1>
            </Route>
            {/* Buraya başka admin sayfaları eklenebilir */}
          </Switch>
        </AdminTemplate>
      ) : (
        // Eğer normal kullanıcı sayfasındaysak Template kullan
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
          </Switch>
        </Template>
      )}
    </>
  );
}

export default App;
