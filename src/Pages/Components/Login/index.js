import React, { Fragment, Component } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  Button,
  FormGroup,
} from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { userLogin } from "../../../actions/loginAction";
import { myProfile } from "../../../actions/accountAction";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import Logo from "../../../assets/img/svg/LOGO-W.svg";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import FooterComponent from "../HomeComponent/Footer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { showSuccess, showError, EMAIL_REGEX } from "../../Helpers/utils";
import { DEV_ENV_URL } from "../../Helpers/utils";
const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {},
      isAuthenticating: false,
      loading: false,
    };
  }

 
  componentWillReceiveProps = (nextProps, props) => {
    if (
      nextProps.isAuthenticated &&
      nextProps.isAuthenticated !== this.props.isAuthenticated
    ) {
      this.setState({
        isShowLoader: false,
        errorText: null,
        isShowError: false,
        loading: false,
      });
      if (nextProps.loginData.IsTempPassword) {
        this.props.history.push("/frontOffice/change-password");
      } else {
        this.props.dispatch(myProfile());
        setTimeout(
          function () {
            this.props.history.push("/frontOffice/home");
          }.bind(this),
          1000
        );
      }

    }

    if (
      nextProps.loginErrorStatus &&
      nextProps.loginErrorStatus !== this.props.loginErrorStatus
    ) {
      this.setState({ isAuthenticating: false });
      //showError(nextProps.loginErrorStatus);
      if (nextProps.loginErrorStatus == 8 ||nextProps.loginErrorStatus == 9) {
        // showError(this.props.t("Common.UNLOCK_ACCOUNT_ERROR"));
        showError(nextProps.loginErrorStatus);
        this.props.history.push("/frontOffice/unlock-account");
      } else {
        showError(this.props.t("Common.AUTH_ERROR"));
      }
      this.setState({
        loading: false,
      });
    }


    // if (
    //   nextProps.loginErrorStatus &&
    //   nextProps.loginErrorStatus !== this.props.loginErrorStatus
    // ) {
    //   // this.setState({ isAuthenticating: false });
    //   // //showError(nextProps.loginErrorStatus);
    //   // showError(this.props.t("Common.AUTH_ERROR"));
    //   // this.setState({
    //   //   loading: false,
    //   // });
    //   // if (
    //   //   nextProps.loginErrorCode &&
    //   //   nextProps.loginErrorCode !== this.props.loginErrorCode
    //   // ) {
    //     if(nextProps.loginErrorCode ==8)
    //     {
    //       this.setState({ isAuthenticating: false }); 
    //       showError(this.props.t("Common.UNLOCK_ACCOUNT_ERROR"));
    //       this.setState({
    //         loading: false,
    //       });
    //       this.props.history.push("/frontOffice/unlock-account");
    //     }
    //     else {
    //       this.setState({ isAuthenticating: false });
    //       //showError(nextProps.loginErrorStatus);
    //       showError(this.props.t("Common.AUTH_ERROR"));
    //       this.setState({
    //         loading: false,
    //       });
    //     }
      
    // }

    
    // if (
    //   nextProps.loginNetworkErrorStatus &&
    //   nextProps.loginNetworkErrorStatus !== this.props.loginNetworkErrorStatus
    // ) {
    //   showError(nextProps.loginNetworkErrorStatus);
    //   this.setState({
    //     loading: false,
    //   });
    // }
  };

  onSubmit = (formProps) => {
    if (this.state.emailValidation && this.state.passwordValidation) {
      if (window.location.href.includes(DEV_ENV_URL)) {
        formProps.isBackOffice = true;
      }
      this.props.dispatch(userLogin(formProps));

      this.setState({
        loading: true,
      });
    }
  };

  validateEmail = (e) => {
    if (emailRex.test(e.target.value)) {
      this.setState({
        emailValidation: true,
      });
    } else {
      this.setState({
        emailValidation: false,
      });
    }
  };
  /**
   * call this function to validate password
   */
  validatePassword = (e) => {
    if (e.target.value) {
      this.setState({
        passwordValidation: true,
      });
    } else {
      this.setState({
        passwordValidation: false,
      });
    }
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          {/* Login */}
          <section id="s-one">
            <Container fluid className="mt-5 h-max-claim">
              {/* <Container fluid className="login-block c-h"> */}
              <Row className="">
                <Col md={5} className="mt-5">
                  <Card className="main-card mb-3 bg-dark-x">
                    <CardBody className="material-form" id="login-form">
                      <div className="text-center p-2">
                        <a
                          href="javascript:void(0);"
                          onClick={(e) =>
                            this.props.history.push("/frontOffice/home")
                          }
                        >
                          <img
                            src={Logo}
                            alt="logo"
                            className="img-fluid"
                            width="30%"
                          />
                        </a>
                      </div>

                      <AvForm
                        className="px-5 py-5 login-av"
                        noValidate
                        onSubmit={handleSubmit(this.onSubmit)}
                      >
                        <FormGroup>
                          <AvField
                            name="email"
                            tag={Field}
                            component={renderTextField}
                            label={this.props.t("Login.EMAIL")}
                            type="text"
                            validate={{ email: true }}
                            onChange={(e) => this.validateEmail(e)}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: this.props.t(
                                  "ErrorMsg.EMAIL_ERROR"
                                ),
                              },
                              pattern: {
                                value: EMAIL_REGEX,
                                errorMessage: this.props.t(
                                  "Common.WRONG_EMAIL"
                                ),
                              },
                            }}
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <AvField
                            name="password"
                            tag={Field}
                            component={renderTextField}
                            label={this.props.t("Login.PASSWORD")}
                            type="password"
                            // minLength={3}
                            maxLength={14}
                            onChange={(e) => this.validatePassword(e)}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: this.props.t(
                                  "ErrorMsg.PASSWORD_ERROR"
                                ),
                              },
                              minLength: {
                                value: 3,
                                errorMessage: this.props.t(
                                  "ErrorMsg.PASSWORD_LENGTH"
                                ),
                              },
                            }}
                            required
                          />
                        </FormGroup>
                        <div className="text-center mt-5">
                          <SubmitBtnLoader
                            label={this.props.t("Login.SUBMIT")}
                            className="btn p-3 btn-primary  btn-pill home-btn-width"
                            loading={this.state.loading}
                            submitting={""}
                            type="submit"
                          />

                          <Button
                            className="btn btn-primary btn-pill p-3 c-px home-btn-width"
                            onClick={(e) =>
                              this.props.history.push("/frontOffice/register")
                            }
                          >
                            {this.props.t("Login.REGISTER")}
                          </Button>
                        </div>
                      </AvForm>
                      <div className="text-center  font-weight-bold ">
                        <a
                          href="javascript:void(0);"
                          onClick={(e) =>
                            this.props.history.push(
                              "/frontOffice/forgot-password"
                            )
                          }
                        >
                          <span className="text-light text-underline pull-right">
                            <u> {this.props.t("Login.FORGOT_PASS")}</u>
                          </span>
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="ft-fix"></div>
                </Col>
              </Row>
            </Container>
          </section>
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}
Login = reduxForm({
  form: "LoginPage",
  //validate,
  // asyncValidate,
})(Login);
function mapStateToProps(state) {
  console.log(state.Login.loginErrorStatus);
  return {
    success: true,
    isAuthenticated: state.Login.isAuthenticated,
    isAuthenticating: state.Login.isAuthenticating,
    loginErrorText: state.Login.statusText,
    user: state.Login.user,
    loginData: state.Login.loginData,
    // loginNetworkErrorStatus: state.Login.loginNetworkErrorStatus,
    loginErrorStatus: state.Login.loginErrorStatus,
    loginErrorCode:state.Login.loginErrorCode,
    loginErrorDescription:state.Login.loginErrorDescription,
    // loginNetworkError: state.Login.loginNetworkError,
  };
}
export default compose(translate, withRouter, connect(mapStateToProps))(Login);
