import React, { Fragment, Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  renderTextField,
  renderSelectField,
} from "../../Common/RenderTextField";
import {
  showSuccess,
  showError,
  required,
  EMAIL_REGEX,
} from "../../Helpers/utils";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
} from "reactstrap";
import { clientsRegistration } from "../../../actions/accountAction";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.registerSuccess &&
      nextProps.registerSuccess !== this.props.registerSuccess
    ) {
      this.setState({
        loading: false,
      });
      showSuccess(this.props.t("Registration.CONFIRMATION_CODE"));

      this.props.history.push("/frontOffice/activate-account");
    }
    if (
      nextProps.registerErrorStatus &&
      nextProps.registerErrorStatus !== this.props.registerErrorStatus
    ) {
      showError(nextProps.registerErrorStatus);
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.registerNetworkErrorStatus &&
      nextProps.registerNetworkErrorStatus !==
        this.props.registerNetworkErrorStatus
    ) {
      showError(this.props.t("Common.SOMETHING_WENT_WRONG"));
      this.setState({
        loading: false,
      });
    }
  };

  onSubmit = (formProps) => {
    if (
      formProps.firstName &&
      formProps.lastName &&
      formProps.mobileNumber &&
      formProps.email &&
      formProps.password === formProps.confirm_password &&
      formProps.city
    ) {
      if (formProps.terms) {
        const formData = {
          firstName: formProps.firstName,
          lastName: formProps.lastName,
          mobileNumber: formProps.mobileNumber,
          email: formProps.email,
          password: formProps.password,
          city: formProps.city,
          title: formProps.title,
        };
        this.props.dispatch(clientsRegistration(formData));

        this.setState({
          loading: true,
        });
      } else {
        showError(this.props.t("ErrorMsg.TERMS_ERROR"));
      }
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
    }
  };

  /**
   * call this function to validate password
   */
  clearField = (e) => {
    // document.getElementById("confirmPass").value = ;
    this.props.dispatch(change("RegisterForm", "confirm_password", null));
  };
  render() {
    const { handleSubmit } = this.props;
    const Checkbox = ({ input, meta: { touched, error } }) => (
      <div style={{ border: touched && error ? "1px solid red" : "none" }}>
        <input type="checkbox" {...input} /> &nbsp;
        <a
          href="#/frontOffice/terms-and-conditions"
          target="_blank"
          className="text-decoration-none text-dark font-weight-bold"
        >
          {this.props.t("Registration.TERMS_TEXT")}
        </a>
      </div>
    );
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
          <Container fluid className="login-block c-h">
            <Row className="">
              <Col md={8} className="mx-auto">
                <Card className="main-card mb-3  mt-5">
                  <CardBody>
                    <div className="text-center p-2"></div>
                    <AvForm
                      className="px-5"
                      noValidate
                      onSubmit={handleSubmit(this.onSubmit)}
                    >
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label>{this.props.t("Registration.TITLE")}</Label>
                            <Field
                              type="select"
                              name="title"
                              component={renderSelectField}
                              label={this.props.t("Registration.TITLE")}
                              required
                              className="form-control"
                            >
                              <option value="">
                                {this.props.t("Registration.SELECT")}
                              </option>
                              <option value="1">
                                {this.props.t("Registration.MR")}
                              </option>
                              <option value="2">
                                {this.props.t("Registration.MS")}
                              </option>
                              <option value="3">
                                {this.props.t("Registration.MRS")}
                              </option>
                            </Field>
                          </FormGroup>
                          <FormGroup>
                            <AvField
                              name="firstName"
                              tag={Field}
                              component={renderTextField}
                              label={this.props.t("Registration.F_NAME")}
                              type="text"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.FIRST_NAME_ERROR"
                                  ),
                                },

                                maxLength: {
                                  value: 20,
                                },
                                minLength: {
                                  value: 3,
                                  errorMessage: this.props.t(
                                    "Common.MIN_LENGTH"
                                  ),
                                },
                              }}
                            />
                          </FormGroup>

                          <FormGroup>
                            <AvField
                              name="lastName"
                              tag={Field}
                              component={renderTextField}
                              label={this.props.t("Registration.L_NAME")}
                              type="text"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.LAST_NAME_ERROR"
                                  ),
                                },

                                maxLength: {
                                  value: 20,
                                },
                                minLength: {
                                  value: 3,
                                  errorMessage: this.props.t(
                                    "Common.MIN_LENGTH"
                                  ),
                                },
                              }}
                            />
                          </FormGroup>

                          <FormGroup>
                            <AvField
                              name="mobileNumber"
                              tag={Field}
                              component={renderTextField}
                              label={this.props.t("Registration.MOBILE")}
                              type="text"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.MOBILE_ERROR"
                                  ),
                                },
                                pattern: {
                                  value: "^[0-9]+$",
                                  errorMessage: this.props.t("Common.ONLY_NUM"),
                                },
                                maxLength: {
                                  value: 10,
                                },
                                minLength: {
                                  value: 10,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.ACCEPT_NUM"
                                  ),
                                },
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <AvField
                              name="email"
                              tag={Field}
                              component={renderTextField}
                              label={this.props.t("Registration.EMAIL")}
                              type="email"
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
                            />
                          </FormGroup>
                          <FormGroup>
                            <AvField
                              name="password"
                              tag={Field}
                              component={renderTextField}
                              label={this.props.t("Registration.PASSWORD")}
                              type="password"
                              onKeyUp={(e) => this.clearField(e)}
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.PASSWORD_ERROR"
                                  ),
                                },
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <AvField
                              name="confirm_password"
                              tag={Field}
                              value="password"
                              id="confirmPass"
                              component={renderTextField}
                              label={this.props.t("Registration.C_PASS")}
                              type="password"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.CONFIRM_PASS_ERROR"
                                  ),
                                },
                                match: {
                                  value: "password",
                                  errorMessage: this.props.t(
                                    "ErrorMsg.C_PASS_ERROR"
                                  ),
                                },
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <AvField
                              name="city"
                              tag={Field}
                              component={renderTextField}
                              label={this.props.t("Registration.CITY")}
                              type="text"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.CITY_ERROR"
                                  ),
                                },
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Field
                              label={this.props.t("Registration.TERMS_TEXT")}
                              type="checkbox"
                              name="terms"
                              component={Checkbox}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <SubmitBtnLoader
                          label={this.props.t("Registration.REGISTER")}
                          className="btn btn-lg btn-primary p-3 home-btn-width btn-pill mt-1"
                          loading={this.state.loading}
                          submitting={""}
                          type="submit"
                        />
                      </div>
                    </AvForm>
                  </CardBody>
                  <div className="text-center text-white p-ab">
                    <p className="c-bg p-3 ">
                      <a
                        onClick={(e) =>
                          this.props.history.push("/frontOffice/login")
                        }
                      >
                        <u className="fx">
                          {this.props.t("Registration.REDIRECT_LOGIN")}
                        </u>
                      </a>
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

Register = reduxForm({
  form: "RegisterForm",
  //validate,
  // asyncValidate,
})(Register);
function mapStateToProps(state) {
  return {
    registerSuccess: state.Account.registerSuccess,
    registerErrorStatus: state.Account.registerErrorStatus,
    registerNetworkErrorStatus: state.Account.registerNetworkErrorStatus,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(Register);
