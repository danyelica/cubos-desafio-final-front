import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ChargesProvider } from "../Contexts/ChargesContexts";
import { ClientsProvider } from "../Contexts/ClientsContexts";
import { FormProvider } from "../Contexts/FormContexts";
import { UserProvider } from "../Contexts/UserContexts";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ListClients from "../pages/ListClients";
import { getItem } from "../utils/storage";
import NotFound from "../pages/NotFound";
import ListCharges from "../pages/ListCharges";
import ClientDetails from "../components/ClientDetails";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function VerifyLoginUser({ redirectTo }) {
  const isAuthenticated = getItem("token");
  return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />;
}

function Routers() {
  return (
    <UserProvider>
      <ClientsProvider>
        <ChargesProvider>
          <FormProvider>
            <Routes>
              <Route element={<VerifyLoginUser redirectTo='/home' />}>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
              </Route>
              <Route element={<ProtectedRoutes redirectTo='/sign-in' />}>
                <Route path='/home/' element={<Home />} />
                <Route path='/home/clients' element={<ListClients />} />
                <Route
                  path={`/home/clients/client`}
                  element={<ClientDetails />}
                />
                <Route path='/home/charges' element={<ListCharges />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </FormProvider>
        </ChargesProvider>
      </ClientsProvider>
    </UserProvider>
  );
}

export default Routers;
