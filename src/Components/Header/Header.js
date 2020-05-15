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
                <h5 className="my-0 mr-md-auto font-weight-normal">{this.props.user.firstName}</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="font-weight-normal color-gray" href="/logout" onClick={(e) => this.handleLogout(e)}>Logout</a>
                </nav>
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
