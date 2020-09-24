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
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import Logo from "../../../assets/img/svg/LOGO.svg";
import SubmitBtnLoader from "../../Common/ButtonLoader";

import {
  changePassword,
  confirmForgottenPassword,
} from "../../../actions/accountAction";
import queryString from "query-string";
import { showSuccess, showError, EMAIL_REGEX } from "../../Helpers/utils";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount = () => {
    this.isBackOffice = queryString.parse(
      this.props.location.search
    ).isBackOffice;
    //console.log(urlParams);
  };

  componentWillReceiveProps = (nextProps, props) => {
    if (
      nextProps.changePasswordData &&
      nextProps.changePasswordData !== this.props.changePasswordData
    ) {
      showSuccess(this.props.t("ErrorMsg.CHANGE_PASSWORD"));
      if (!localStorage.getItem("foAuthToken")) {
        this.props.history.push("/frontOffice/login");
      } else {
        this.props.history.push("/frontOffice/home");
      }
    }
    if (
      nextProps.errorStatus &&
      nextProps.errorStatus !== this.props.errorStatus
    ) {
      // showError(this.props.t("ErrorMsg.WRONG_ERROR"));
       showError(nextProps.errorStatus);
      this.setState({ loading: false });
    }
    if (
      nextProps.isRedirect &&
      nextProps.isRedirect !== this.props.isRedirect
    ) {
      this.setState({
        loading: false,
      });
    }
  };

  onSubmit = (formProps) => {
    if (!localStorage.getItem("foAuthToken")) {
      if (
        this.state.emailValidation &&
        this.state.passwordValidation &&
        this.state.validateConfirmCode
      ) {
        const formData = {
          email: formProps.Email,
          confirmationCode: formProps.ConfirmationCode,
          newPassword: formProps.newPassword,
          isBackOfficeUser: this.isBackOffice ? true : false,
        };
        // console.log(formData);
        this.props.dispatch(confirmForgottenPassword(formData));
        this.setState({ loading: true });
      }
    } else {
      if (
        this.state.emailValidation &&
        this.state.passwordValidation &&
        formProps.newPassword
      ) {
        const formData = {
          email: formProps.Email,
          oldPassword: formProps.oldPassword,
          newPassword: formProps.newPassword,
          isBackOfficeUser: this.isBackOffice ? true : false,
        };
        this.props.dispatch(changePassword(formData));
        this.setState({ loading: true });
      }
    }
  };
  validateConfirmCode = e => {
    if (e.target.value.length <= 20) {
      this.setState({
        validateConfirmCode: true,
      });
    } else {
      this.setState({
        validateConfirmCode: false,
      });
    }
  };
  validateEmail = (e) => {
    if (EMAIL_REGEX.test(e.target.value)) {
      this.setState({
        emailValidation: true,
      });
    } else {
      this.setState({
        emailValidation: false,
      });
    }
  };
  validatePassword = (e) => {
    if (e.target.value.length > 3) {
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
        {/* Login */}
        <Container fluid className="bg-box c-h h-max">
          <Row className="p-4">
            <Col md={4} className="mx-auto mt-5">
              <Card className="main-card mb-3">
                <CardBody>
                  <div className="text-center p-2">
                    <img
                      src={Logo}
                      alt="logo"
                      className="img-fluid"
                      width="30%"
                    />
                  </div>
                  <p className="text-center fy">
                    {this.props.t("ChangePassword.TITLE_TEXT")}
                  </p>
                  <AvForm
                    className="px-5"
                    noValidate
                    onSubmit={handleSubmit(this.onSubmit)}
                  >
                    <FormGroup>
                      <AvField
                        name="Email"
                        tag={Field}
                        component={renderTextField}
                        label={this.props.t("ChangePassword.EMAIL")}
                        type="text"
                        validate={{ email: true }}
                        onChange={(e) => this.validateEmail(e)}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: this.props.t("ErrorMsg.EMAIL_ERROR"),
                          },
                          pattern: {
                            value: EMAIL_REGEX,
                            errorMessage: this.props.t("Common.WRONG_EMAIL"),
                          },
                        }}
                        required
                      />
                    </FormGroup>
                    {!localStorage.getItem("foAuthToken") ? (
                      <FormGroup>
                        <AvField
                          name="ConfirmationCode"
                          tag={Field}
                          component={renderTextField}
                          label={this.props.t("ChangePassword.CODE")}
                          onChange={(e) => this.validateConfirmCode(e)}
                          type="text"
                          minLength={3}
                          maxLength={14}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: this.props.t("ErrorMsg.CODE_ERROR"),
                            },
                          }}
                          required
                        />
                      </FormGroup>
                    ) : (
                        <FormGroup>
                          <AvField
                            name="oldPassword"
                            tag={Field}
                            component={renderTextField}
                            label={this.props.t("ChangePassword.OLD_PASS")}
                            type="password"
                            minLength={3}
                            maxLength={14}
                            onChange={(e) => this.validatePassword(e)}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: this.props.t(
                                  "ErrorMsg.OLD_PASSWORD_ERROR"
                                ),
                              },
                            }}
                            required
                          />
                        </FormGroup>
                      )}
                    <FormGroup>
                      <AvField
                        name="newPassword"
                        tag={Field}
                        component={renderTextField}
                        label={this.props.t("ChangePassword.NEW_PASS")}
                        type="password"
                        minLength={3}
                        maxLength={14}
                        onChange={(e) => this.validatePassword(e)}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: this.props.t(
                              "ErrorMsg.NEW_PASSWORD_ERROR"
                            ),
                          },
                        }}
                        required
                      />
                    </FormGroup>
                    <div className="text-center">
                      <SubmitBtnLoader
                        label={this.props.t("ChangePassword.SUBMIT")}
                        className="btn btn-lg btn-primary home-btn-width p-3  btn-pill"
                        loading={this.state.loading}
                        type="submit"
                      />
                    </div>
                  </AvForm>
                </CardBody>
                <div className="text-center text-white p-ab">
                  <p className="c-bg p-3 "></p>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
ChangePassword = reduxForm({
  form: "ChangePassword",
  //validate,
  // asyncValidate,
})(ChangePassword);
function mapStateToProps(state) {
  console.log(state.Account.changePasswordData)
  return {
    isRedirect: state.Account.isRedirect,
    changePasswordData: state.Account.changePasswordData,
    errorStatus: state.Account.errorStatus,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ChangePassword);
