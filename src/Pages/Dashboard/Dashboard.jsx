import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userActions } from "../../Redux/Actions";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";

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
      <div className="dashboard" >

        <Header />
        <div className="container">
          <div class="card">
            <div class="card-body">
              You have no task.
          </div>
            <button className="btn btn-lg btn-primary" data-toggle="modal" data-target="#newTaskModal">+ New Task</button>
          </div>


          {/* <!-- Modal --> */}


          <div class="modal fade" id="newTaskModal" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">



            <div class="modal-dialog modal-dialog-centered ">
              <div class="modal-content">

                <div class="modal-body">
                  <form className="form-signin  m-t-5"  >
                    <h1 className="h3 mb-3 font-weight-normal">+ New Task</h1>
                    <div className="form-group">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder="Email address"
                        autoFocus
                      />
                    </div>

                    <button className="btn btn-lg btn-primary btn-block loading" type="submit">+ New Task</button>

                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
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
