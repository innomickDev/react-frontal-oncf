import React, { Fragment, Component } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  FormGroup,
} from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { activateAccount } from "../../../actions/accountAction";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import Logo from "../../../assets/img/svg/LOGO.svg";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { showSuccess, showError } from "../../Helpers/utils";
const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ActivateAccount extends Component {
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
      if(userProfile){
        this.props.history.push("/frontOffice/login")
      }
  };
  componentWillReceiveProps = (nextProps, props) => {
    if (
      nextProps.activatioError &&
      nextProps.activatioError !== this.props.activatioError
    ) {
      this.setState({ loading: false });
      showError(nextProps.activatioError);
    }
    if (
      nextProps.activationSuccess &&
      nextProps.activationSuccess !== this.props.activationSuccess
    ) {
      this.setState({ loading: false });
      showSuccess(this.props.t("Common.ACTIVATION_SUCCESS"));
      this.props.history.push("/frontOffice/login");
    }
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
    if (this.state.emailValidation && this.state.validateConfirmCode) {
      this.props.dispatch(activateAccount(formProps));
      this.setState({
        loading: true,
      });
    }
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
                          label={this.props.t("Login.ACTIVATE")}
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
ActivateAccount = reduxForm({
  form: "Activation form",
  //validate,
  // asyncValidate,
})(ActivateAccount);
function mapStateToProps(state) {
  return {
    activationSuccess: state.Account.activationSuccess,
    activatioError: state.Account.activatioError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ActivateAccount);
