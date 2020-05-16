import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userActions } from "../../Redux/Actions";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";
import TodoContainer from "../../Containers/Todo/TodoContainer";

class Dashboard extends PureComponent {


  constructor(props) {

    super(props);

    this.handleLogout = this.handleLogout.bind(this);

  }


  handleLogout = (e) => {

    e.preventDefault();

    this.props.user_logout();

    return this.props.history.push("/login");

  }
  render() {

    return (

      <div className="dashboard h-100" >

        <Header />

        <TodoContainer />

      </div>

    );
  }
}

//map state to props
function mapState(state) {


  return {
    user: state.authentication.user

  };

}

//map action to props
const mapAction = (dispatch) => {
  return {

    user_logout: () => dispatch(userActions.user_logout()),

  }
}

export default connect(mapState, mapAction)(Dashboard);
