import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/slidebar/sidebar";
import Websolexadmin from "./pages/websolexadmin";
import Header from "./components/header/header";
import Crm from "./pages/crmadmin";
import Markating from "./pages/markatingadmin";
import Valuedclientadd from "./pages/websolex/valuedclientadd";
import Latestworkadd from "./pages/websolex/latestworkadd";
import Notfound from "./pages/notfound";
import { GridLoader } from "react-spinners";
import Clienttest from "./pages/websolex/clienttest";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import Profile from "./pages/user/profile";
import Servicepage from "./pages/websolex/servicepage";
import Userallchats from "./components/websolex/userallchats";
import Teampage from "./pages/websolex/teampage";
import Blogpage from "./pages/websolex/blogpage";
import Contactdetails from "./pages/websolex/contactdetails";
import Contactform from "./pages/websolex/contactform";
import UnauthorizedPage from "./pages/websolex/unauthorizedPage";
import Userlogied from "./pages/user/userlogied";
import { UserProvider } from "./pages/user/userrolecontext";
import Emmangement from "./pages/websolex/emmangement";
import Userchat from "./pages/user/userchat";
import Pagetitle from "./components/pagetitle";

const Layout = ({ children }) => {
  const [isopensidebar, setisopensidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const toogleslidebar = () => {
    setisopensidebar(!isopensidebar);
  };

  const closeslidebar = () => {
    setisopensidebar(false);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-screen sm:w-full h-full lg:h-screen bg-[#f1f5f9]">
      {loading ? (
        <div className="flex items-center justify-center w-screen h-screen ">
          <GridLoader color="#007bff" />
        </div>
      ) : (
        <>
          <Sidebar
            closeslidebar={closeslidebar}
            isopensidebar={isopensidebar}
          />
          <div className="flex flex-col flex-1">
            <Header toogleslidebar={toogleslidebar} />
            <div className="w-screen overflow-x-hidden sm:w-full">
              <main className="pl-0">{children}</main>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <div className="bg-[#f1f5f9] w-full ">
        <Router>
          <Routes>
            <Route
              path="/websolex"
              element={
                <Layout>
                  <Pagetitle title={"Home"} />
                  <Websolexadmin />
                </Layout>
              }
            />
            <Route
              path="/websolex/valuedclient"
              element={
                <Layout>
                  <Pagetitle title={"Valuedclient"} />
                  <Valuedclientadd />
                </Layout>
              }
            />
            <Route
              path="/websolex/latestworkadd"
              element={
                <Layout>
                  <Pagetitle title={"latestworkadd"} />
                  <Latestworkadd />
                </Layout>
              }
            />
            <Route
              path="/websolex/clientrate"
              element={
                <Layout>
                  <Pagetitle title={"clientrate"} />
                  <Clienttest />
                </Layout>
              }
            />
            <Route
              path="/websolex/servicepage"
              element={
                <Layout>
                  <Pagetitle title={"servicepage"} />
                  <Servicepage />
                </Layout>
              }
            />
            <Route
              path="/websolex/teampage"
              element={
                <Layout>
                  <Pagetitle title={"teampage"} />
                  <Teampage />
                </Layout>
              }
            />
            <Route
              path="/websolex/blogpage"
              element={
                <Layout>
                  <Pagetitle title={"blogpage"} />
                  <Blogpage />
                </Layout>
              }
            />
            <Route
              path="/websolex/contactdetails"
              element={
                <Layout>
                  <Pagetitle title={"contactdetails"} />
                  <Contactdetails />
                </Layout>
              }
            />
            <Route
              path="/websolex/contactform"
              element={
                <Layout>
                  <Pagetitle title={"contactform"} />
                  <Contactform />
                </Layout>
              }
            />
            <Route
              path="/websolex/emmangement"
              element={
                <Layout>
                  <Pagetitle title={"employe"} />
                  <Emmangement />
                </Layout>
              }
            />

            <Route
              path="/userlogined"
              element={
                <Layout>
                  <Pagetitle title={"userlogined"} />
                  <Userlogied />
                </Layout>
              }
            />

            <Route
              path="/crm"
              element={
                <Layout>
                  <Pagetitle title={"crm"} />
                  <Crm />
                </Layout>
              }
            />

            <Route
              path="/marketing"
              element={
                <Layout>
                  <Pagetitle title={"marketing"} />
                  <Markating />
                </Layout>
              }
            />

            <Route
              path="*"
              element={
                <>
                  <Pagetitle title={"marketing"} />
                  <Notfound />
                </>
              }
            />
            <Route
              path="/unauthorizedPage"
              element={
                <>
                  <Pagetitle title={"unauthorizedPage"} />
                  <UnauthorizedPage />
                </>
              }
            />

            <Route path="/" element={
              <>
                <Pagetitle title={"login"} />
                <Login />
              </>
            } />
            <Route path="/register" element={
              <>
                <Pagetitle title={"register"} />
                <Register />
              </>
            } />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Pagetitle title={"profile"} />
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/websolex/userschat"
              element={
                <Layout>
                  <Pagetitle title={"Userallchats"} />
                  <Userchat />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
