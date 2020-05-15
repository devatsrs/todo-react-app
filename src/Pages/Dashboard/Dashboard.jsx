import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userActions } from "../../Redux/Actions";

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
      <div>
        <h1>Dashboard</h1>
        <p>
          <button type="button" name="logout" onClick={(e) => this.handleLogout(e)}>Logout</button>
        </p>
      </div>
    );
  }
}


//map action to props
const mapAction = (dispatch) => {
  return {

    user_logout: () => dispatch(userActions.user_logout()),

  }
}

export default connect(null, mapAction)(Dashboard);
