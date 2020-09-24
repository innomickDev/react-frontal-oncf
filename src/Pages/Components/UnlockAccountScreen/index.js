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
import { unlockAccount } from "../../../actions/accountAction";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import Logo from "../../../assets/img/svg/LOGO.svg";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import FooterComponent from "../HomeComponent/Footer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { showSuccess, showError } from "../../Helpers/utils";
const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class UnlockAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {},
      isAuthenticating: false,
      loading: false,
    };
  }

   componentWillMount = () => {
    const userProfile = JSON.parse(localStorage.getItem("foAuthToken"));
    console.log(userProfile)
      if(userProfile){
        this.props.history.push("/frontOffice/login")
      }
  };
  componentWillReceiveProps = (nextProps, props) => {
    if (
      nextProps.unlockError &&
      nextProps.unlockError !== this.props.unlockError
    ) {
      this.setState({ loading: false });
      showError(nextProps.unlockError);
    }
    if (
      nextProps.unlockSuccess &&
      nextProps.unlockSuccess !== this.props.unlockSuccess
    ) {
      this.setState({ loading: false });
      showSuccess(this.props.t("Common.UNLOCK_SUCCESS"));
      this.props.history.push("/frontOffice/login");
    }
    // if (
    //   nextProps.isAuthenticated &&
    //   nextProps.isAuthenticated !== this.props.isAuthenticated
    // ) {
    //   this.setState({
    //     isShowLoader: false,
    //     errorText: null,
    //     isShowError: false,
    //     loading: false
    //   });
    //   if (nextProps.loginData.IsTempPassword) {
    //     this.props.history.push("/frontOffice/change-password");
    //   } else {
    //     setTimeout(
    //       function() {
    //         this.props.history.push("/frontOffice/home");
    //       }.bind(this),
    //       1000
    //     );
    //   }
    //   this.props.dispatch(myProfile());
    // }
    // if (
    //   nextProps.loginErrorStatus &&
    //   nextProps.loginErrorStatus !== this.props.loginErrorStatus
    // ) {
    //   this.setState({ isAuthenticating: false });
    //   showError(nextProps.loginErrorStatus);
    //   this.setState({
    //     loading: false
    //   });
    // }
  };

  // Validating code
  validateConfirmCode = (e) => {
    if (e.target.value.length <= 8 && e.target.value.length >= 3 ) {
      this.setState({
        validateConfirmCode: true,
      });
    } else {
      this.setState({
        validateConfirmCode: false,
      });
    }
  };

  // Validating email
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
  onSubmit = (formProps) => {
    console.log(formProps);
    if (this.state.emailValidation && this.state.validateConfirmCode) {
      this.props.dispatch(unlockAccount(formProps));
      this.setState({
        loading: true,
      });
    }
    // else {
    //   showError(this.props.t(
    //     "Common.REQUIRED_FIELDS"
    //   ))
    // }
  };
  // Render function
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
          <Container fluid className="login-block c-h h-max-claim">
            <Row className="">
              <Col md={4} className="mx-auto">
                <Card className="main-card mb-3 mt-5">
                  <CardBody>
                    <div className="text-center p-2">
                      <a
                        href="javascript:void(0);"
                        // onClick={e =>
                        //   this.props.history.push("/frontOffice/home")
                        // }
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
                      className="px-5"
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
                              value: emailRex,
                              errorMessage: this.props.t(
                                "ErrorMsg.EMAIL_NOT_VALID"
                              ),
                            },
                          }}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <AvField
                          name="code"
                          tag={Field}
                          component={renderTextField}
                          label={this.props.t("Login.CODE")}
                          type="text"
                          minLength={3}
                          maxLength={8}
                          onChange={(e) => this.validateConfirmCode(e)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: this.props.t("ErrorMsg.CODE_ERROR"),
                            },
                          }}
                          required
                        />
                      </FormGroup>
                      <div className="text-center">
                        <SubmitBtnLoader
                          label={this.props.t("Login.UNLOCK")}
                          className="btn btn-lg btn-primary px-5 btn-pill"
                          loading={this.state.loading}
                          submitting={""}
                          type="submit"
                        />
                      </div>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}
UnlockAccount = reduxForm({
  form: "Unlock form",
  //validate,
  // asyncValidate,
})(UnlockAccount);
function mapStateToProps(state) {
  return {
    unlockSuccess: state.Account.unlockSuccess,
    unlockError: state.Account.unlockError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(UnlockAccount);
