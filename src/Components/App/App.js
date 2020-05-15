import React, { Suspense, lazy } from 'react';
import "./App.css";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
//import { PrivateRoute } from './Components/PrivateRoute';
import { connect } from "react-redux";
import Loading from '../Loading/Loading';


const Login = lazy(() => import("../../Pages/Login/Login"));
const Register = lazy(() => import("../../Pages/Register/Register"));
const Dashboard = lazy(() => import("../../Pages/Dashboard/Dashboard"));


class App extends React.Component {

  render() {



    let routes = (

      <div className="container h-100">
        <div className="row h-100">
          <div className="my-auto mx-auto col-sm-12 col-lg-4 col-12">
            <div className="shadow p-3  bg-white todo_round ">

              <Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/register" component={Register}></Route>
                  <Redirect to="/login"></Redirect>
                </Switch>
              </Suspense>
            </div>
          </div>
        </div>
      </div>

    );

    if (this.props.loggedIn) {

      routes = (
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/dashbord" component={Dashboard}></Route>
            <Redirect to="/dashbord"></Redirect>

          </Switch>
        </Suspense>
      );
    }


    return routes;


  }
}


function mapState(state) {



  return { loggedIn: state.authentication.loggedIn };

}


export default withRouter(connect(mapState, null)(App));