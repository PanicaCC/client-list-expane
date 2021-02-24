import React from 'react'
import "tailwindcss/tailwind.css"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout"
import ClientList from "./components/client-list/client-list"
import AddClientForm from "./components/form-new-client/form-new-client";

const App:React.FC = () => {
  return (
      <BrowserRouter>
              <Layout>
                  <Switch>
                      <Route path='/' exact component={ ClientList }/>
                      <Route path='/new-client' component={ AddClientForm }/>
                  </Switch>
              </Layout>
      </BrowserRouter>
  )
}

export default App