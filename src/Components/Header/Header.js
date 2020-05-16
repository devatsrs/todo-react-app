import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userActions } from "../../Redux/Actions";
import { withRouter } from "react-router-dom";


class Header extends PureComponent {

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

            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-sm-6 col-md-6 d-flex flex-row">
                            <img src="https://www.w3schools.com/howto/img_avatar.png" className="rounded-circle mr-3" alt="Avatar" width="50" />
                            <h5 className="my-2 font-weight-normal">{this.props.user.firstName}</h5>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 d-flex flex-row-reverse">
                            <nav className="my-2">
                                <a className="font-weight-normal color-gray" href="/logout" onClick={(e) => this.handleLogout(e)}>Logout</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
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

export default withRouter(connect(mapState, mapAction)(Header));
