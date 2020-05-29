import React, { PureComponent } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { userActions, alertActions } from "../../Redux/Actions";
import { withRouter, Link } from 'react-router-dom'

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.props.resetRegistered();


    this.state = {
      username: "",
      password: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearAlerts();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (username && password) {

      this.props.login(username, password).then(() => {

        this.props.history.push("/dashbord");

      }).catch(error => this.props.logout());

    }

  }

  render() {
    const { loggingIn, alert, } = this.props;
    const { username, password, submitted } = this.state;


    const user_error_class =
      submitted && !username ? "form-control border-danger" : "form-control";
    const pass_error_class =
      submitted && !password ? "form-control border-danger" : "form-control";

    const user_error_text =
      submitted && !username
        ? (<div className="text-danger">Username is required</div>)
        : "";
    const pass_error_text =
      submitted && !password
        ? (<div className="text-danger">Password is required</div>)
        : "";

    return (

      <form className="form-signin" onSubmit={this.handleSubmit}>

        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <h3 className="h3 mb-4  font-weight-normal">Login</h3>

        <div className="form-group">
          <label className="sr-only">Email address</label>
          <input
            type="text"
            name="username"
            id="username"
            className={user_error_class}
            placeholder="Email address"
            autoFocus
            onChange={(e) => {
              this.setState({ username: e.target.value });
            }}
          />
          {user_error_text}
        </div>
        <div className="form-group">
          <label className="sr-only">Password</label>

          <input
            type="password"
            id="password"
            className={pass_error_class}
            placeholder="Password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          {pass_error_text}
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          {loggingIn ? (
            <span>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
                Loading...
            </span>
          ) : "Sign In"
          }
        </button>
        <div className="text-center">
          <Link to="/register" className="btn align-center btn-link">Register</Link>
        </div>

      </form>

    );
  }
}

function mapState(state) {

  const { loggingIn, loggedIn } = state.authentication;

  const { alert } = state;

  return { loggingIn, loggedIn, alert };

}
const mapAction = {

  login: userActions.login,

  logout: userActions.user_logout,

  clearAlerts: alertActions.clear,

  resetRegistered: userActions.resetRegistered,

};


export default withRouter(connect(mapState, mapAction)(Login));
