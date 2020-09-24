import React, { Fragment } from "react";

import Ionicon from "react-ionicons";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/utils/images/avatars/User_ring.png";
const LANG_CODES = {
  french: "fr-FR",
  english: "en-US",
  arabic: "ar-MA",
};
class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      userData: JSON.parse(localStorage.getItem("user")),
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("lang")) {
      localStorage.setItem("lang", localStorage.getItem("lang"));
      if (localStorage.getItem("langName"))
        document.getElementById("activeLang").innerHTML = localStorage.getItem(
          "langName"
        );
    } else {
      localStorage.setItem("lang", "fr-FR");
      document.getElementById("activeLang").innerHTML = "Français - fr";
    }
  };
  setLang = (langCode, langName) => {
    document.getElementById("activeLang").innerHTML = langName;
    if (langCode === LANG_CODES.arabic) {
      document.body.className += " rtl-active";
      document.getElementById("mainBody").dir = "rtl";
    } else {
      document.body.classList.remove("rtl-active");
      document.getElementById("mainBody").dir = "ltr";
    }
    localStorage.setItem("lang", langCode);
    localStorage.setItem("langName", langName);
    //window.location.reload();
    window.location.reload();
  };
  // componentWillReceiveProps(nextProps){
  //
  //     if(nextProps.user){
  //         this.setState({
  //             userData: nextProps.user.AdministrativeUnit
  //         });
  //     }
  // }
  notify2 = () =>
    (this.toastId = toast(
      "You don't have any new items in your calendar for today! Go out and play!",
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "success",
      }
    ));

  logOut = () => {
    localStorage.removeItem("foUserDetails");
    localStorage.removeItem("foAuthToken");
    localStorage.removeItem("foUserProfile");
    localStorage.removeItem("trainDetails");
    localStorage.removeItem("claimData");
    localStorage.removeItem("claimId");
    this.props.history.push("/frontOffice/home");
    window.location.reload();
  };

  render() {
    const userProfile = JSON.parse(localStorage.getItem("foUserDetails"));
    // console.log(userProfile.data.userName);

    // console.log(userProfile);
    return (
      <Fragment>
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left" id="backoffice-nav">
                <UncontrolledButtonDropdown>
                  <DropdownToggle>
                    <span className="" id="activeLang">
                      {this.props.t("Navigation.LANGUAGE")}{" "}
                      {/* <i className="fa fa-globe"></i> */}
                    </span>
                    <FontAwesomeIcon
                      className="ml-2 opacity-8"
                      icon={faAngleDown}
                    />
                  </DropdownToggle>
                  <DropdownMenu right>
                    {/* <DropdownItem
                      onClick={() =>
                        this.setLang("en-US", this.props.t("Navigation.EN"))
                      }
                    >
                      {this.props.t("Navigation.EN")}
                    </DropdownItem> */}
                    <DropdownItem
                      onClick={() =>
                        this.setLang("fr-FR", this.props.t("Navigation.FR"))
                      }
                    >
                      {this.props.t("Navigation.FR")}
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>

                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                    {userProfile.data ? userProfile.data.userName : ""}
                    <FontAwesomeIcon
                      className="ml-2 opacity-8"
                      icon={faAngleDown}
                    />
                  </DropdownToggle>

                  <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                    <div className="dropdown-menu-header">
                      <div className="dropdown-menu-header-inner bg-info">
                        <div
                          className="menu-header-image opacity-2"
                          style={{
                            backgroundImage: "url(" + city3 + ")",
                          }}
                        />
                        <div className="menu-header-content text-left">
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              {/* <div className="widget-content-left mr-3">
                                <img
                                  width={42}
                                  className="rounded-circle"
                                  src={avatar1}
                                  alt=""
                                />
                              </div> */}
                              <div className="widget-content-left">
                                <div className="widget-heading c-text-m">
                                  {/* User name */}
                                  {userProfile.data
                                    ? userProfile.data.userName
                                    : ""}
                                </div>
                                <div className="widget-subheading opacity-8"></div>
                              </div>
                              <div className="widget-content-right mr-2">
                                <Button
                                  className="btn-pill btn-shadow btn-shine"
                                  onClick={(e) => {
                                    this.logOut();
                                  }}
                                  color="focus"
                                >
                                  {this.props.t("Common.LOGOUT")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <PerfectScrollbar>
                        <Nav vertical>
                          <NavItem>
                            <NavLink
                              onClick={(e) =>
                                this.props.history.push(
                                  "/dashboards/change-password-backoffice"
                                )
                              }
                              className="pull-right"
                            >
                              {this.props.t("Common.CHANGE_PASSWORD")}
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </PerfectScrollbar>
                    </div>

                    {/*<div className="scroll-area-xs" style={{
                                            height: '150px'
                                        }}>
                                            <PerfectScrollbar>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Activity
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="javascript:void(0);">
                                                            Chat
                                                            <div className="ml-auto badge badge-pill badge-info">8</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="javascript:void(0);">Recover Password</NavLink>
                                                    </NavItem>
                                                    <NavItem className="nav-item-header">
                                                        My Account
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="javascript:void(0);">
                                                            Settings
                                                            <div className="ml-auto badge badge-success">New</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="javascript:void(0);">
                                                            Messages
                                                            <div className="ml-auto badge badge-warning">512</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="javascript:void(0);">
                                                            Logs
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </PerfectScrollbar>
                                    </div>*/}
                    {/* <Nav vertical>
                                            <NavItem className="nav-item-divider mb-0"/>
                                        </Nav>
                                        <div className="grid-menu grid-menu-2col">
                                            <Row className="no-gutters">
                                                <Col sm="6">
                                                    <Button
                                                        className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                                                        outline color="warning">
                                                        <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"> </i>
                                                        Message Inbox
                                                    </Button>
                                                </Col>
                                                <Col sm="6">
                                                    <Button
                                                        className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                                                        outline color="danger">
                                                        <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2"> </i>
                                                        <b>Support Tickets</b>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Nav vertical>
                                            <NavItem className="nav-item-divider"/>
                                            <NavItem className="nav-item-btn text-center">
                                                <Button size="sm" className="btn-wide" color="primary">
                                                    Open Messages
                                                </Button>
                                            </NavItem>
                                        </Nav> */}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <div className="widget-content-left  ml-3 header-user-info">
                <div className="widget-heading">
                  {/* {this.state.userData
                    ? this.state.userData.Username
                    : "Username"} */}
                </div>
                <div className="widget-subheading"></div>
              </div>

              {/* <div className="widget-content-right header-user-info ml-3">
                                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
                                        id="Tooltip-1">
                                    <Ionicon color="#ffffff" fontSize="20px" icon="ios-calendar-outline"/>
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Click for Toastify Notifications!
                                </UncontrolledTooltip>
                                    </div>*/}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
UserBox = reduxForm({
  form: "UserBox",

  //validate,
  // asyncValidate,
})(UserBox);

const mapStateToProps = (state) => {
  return {
    user: state.Login.user,
  };
};

export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(UserBox);
