import React, { useEffect } from 'react'
import "tailwindcss/tailwind.css"
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout"
import ClientList from "./components/client-list/client-list"
import AddClientForm from "./components/form-new-client/form-new-client";

const App:React.FC = () => {
    useEffect(() => {
        M.AutoInit();
    });
  return (
      <BrowserRouter>
              <Layout>
                  <Switch>
                      <Route path='/client-explain' exact component={ ClientList }/>
                      <Route path='/new-client' exact component={ AddClientForm }/>
                      <Route component={ ClientList } />
                  </Switch>
              </Layout>
      </BrowserRouter>
  )
}
export default App