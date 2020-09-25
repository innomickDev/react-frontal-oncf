import React, { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import mainLogo from "../../../assets/img/svg/LOGO-W.svg";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { userLogout } from "../../../actions/accountAction";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { showSuccess} from "../../Helpers/utils";
import {
  Link,
  animateScroll as scroll,
} from "react-scroll";
const LANG_CODES = {
  french: "fr-FR",
  english: "en-US",
  arabic: "ar-MA",
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
    if (localStorage.getItem("lang") === "ar-MA") {
      document.body.className += " rtl-active";
      document.getElementById("mainBody").dir = "rtl";
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem("lang")) {
      localStorage.setItem("lang", localStorage.getItem("lang"));
      if (localStorage.getItem("langName")) {
        document.getElementById("activeLang").innerHTML = localStorage.getItem(
          "langName"
        );
      } else {
        document.getElementById("activeLang").innerHTML = "Français";
      }

    } else {
      localStorage.setItem("lang", "fr-FR");
      localStorage.setItem("langName", "Français");
      document.getElementById("activeLang").innerHTML = "Français";
    }
  };

  // Scroll to top
  componentWillReceiveProps(nextProps) {
    
    const {
      location,
      history: { action },
    } = nextProps;
    if (location !== this.props.location && action === "PUSH") {
      // new navigation - scroll to top
      window.scrollTo(0, 0);
    }

   
  }
  /**
   * call this function to close the popup
   */
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  /**
   * Logout fuction
   */
  frontUserLogout = () => {
    const userProfile = JSON.parse(localStorage.getItem("foUserProfile"));
    const reqData = {
      code: userProfile.data.codeClient,
      email: userProfile.data.email,
    };
    this.props.dispatch(userLogout(reqData));
    showSuccess(this.props.t("Common.LOGOUT_MSG"));
    // removing data from local storage
    localStorage.removeItem("foUserDetails");
    localStorage.removeItem("foAuthToken");
    localStorage.removeItem("foUserProfile");
    localStorage.removeItem("trainDetails");
    localStorage.removeItem("claimData");
    localStorage.removeItem("claimId");
    this.props.history.push("/frontOffice/home");
  };
  // setting laguage on click
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
    window.location.reload();
  };
  render() {

    const userProfile = JSON.parse(localStorage.getItem("foUserDetails"))
      ? JSON.parse(localStorage.getItem("foUserDetails")).data
      : null;
    const userData = JSON.parse(localStorage.getItem("foUserProfile"))
      ? JSON.parse(localStorage.getItem("foUserProfile")).data
      : null;

    
    const showLinks =
      window.location.href.includes("login");

    return (
      <Fragment>
        <Navbar
          id="hide-navigation"
          className="navbar-primary fixed-top"
          light
          expand="md"
        >
          <Container>
            <NavbarBrand href="/">
              <img src={mainLogo} alt="ONCF2255.ma" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav
                className={
                  document.body.classList.contains("rtl-active")
                    ? "mr-auto"
                    : "ml-auto"
                }
                navbar
              >
                {!showLinks && (
                  <NavItem>
                    

                    <Link
                      activeClass="active"
                      className="nav-link"
                      to="howItWork"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-70}
                    >
                      {this.props.t("Navigation.HIW")}
                    </Link>

                    <Link
                      activeClass="active"
                      className="nav-link"
                      to="claim360"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-100}
                    >
                      {this.props.t("Navigation.CLAIM360")}
                    </Link>

                    <Link
                      activeClass="active"
                      className="nav-link"
                      to="oncfFigure"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-100}
                    >
                      {this.props.t("Navigation.IN_FIGURE")}
                    </Link>

                    <Link
                      activeClass="active"
                      className="nav-link"
                      to="lostObject"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-100}
                    >
                      {this.props.t("Navigation.LOST_OBJECT")}
                    </Link>

                    <Link
                      activeClass="active"
                      className="nav-link"
                      to="faq"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-100}
                    >
                      {this.props.t("Navigation.FAQ")}
                    </Link>
                  </NavItem>
                )}
                {showLinks && (
                  <NavItem>
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/frontOffice/home"
                    >
                      {this.props.t("Navigation.HOME")}
                    </NavLink>
                  </NavItem>
                )}
                {!showLinks && !localStorage.getItem("foAuthToken") && (
                  <NavItem>
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/frontOffice/login"
                    >
                      {this.props.t("Navigation.LOGIN")}
                    </NavLink>
                  </NavItem>
                )}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <span className="" id="activeLang">
                      {this.props.t("Navigation.LANGUAGE")}{" "}
                      {/* <i className="fa fa-globe"></i> */}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    
                    <DropdownItem
                      onClick={() =>
                        this.setLang("fr-FR", this.props.t("Navigation.FR"))
                      }
                    >
                      {this.props.t("Navigation.FR")}
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        this.setLang("ar-MA", this.props.t("Navigation.AR"))
                      }
                    >
                      {this.props.t("Navigation.AR")}
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                {userProfile ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>

                      {userData.prenom + " " + userData.nom}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        onClick={(e) =>
                          this.props.history.push(
                            "/frontOffice/change-password"
                          )
                        }
                      >
                        {this.props.t("Common.CHANGE_PASSWORD")}
                      </DropdownItem>
                      <DropdownItem onClick={(e) => this.frontUserLogout()}>
                        {this.props.t("Common.LOGOUT")}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                    ""
                  )}
                
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    profileData: state.Login.profileData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(NavigationBar);
