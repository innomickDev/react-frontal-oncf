import React, { Fragment, Component } from "react";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import {
  renderTextField,
  renderSelectField,
} from "../../Common/RenderTextField";
import { AvForm, AvField } from "availity-reactstrap-validation";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  FormGroup,
  Label,
  Button,
} from "reactstrap";

import {
  getClaimsDetailsById,
  updateTicketAttachment,
  updateClaimAttachment,
  updateClaim,
} from "../../../actions/claimAction";
import {
  getBase64,
  showError,
  getLangBasedStations,
  PHONE_REGEX,
  getLangBasedItems,
  showSuccess,
} from "../../Helpers/utils";
import Footer from "../HomeComponent/Footer";
import MainLoader from "../../Common/Loader";
import qString from "query-string";
import SubmitBtnLoader from "../../Common/ButtonLoader";

class UpdateClaimComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mainLoader: true,
    };
  }

  componentDidMount = () => {
    const params = qString.parse(this.props.location.search);
    this.props.dispatch(getClaimsDetailsById(params.code));

    // this.props.initilize({ claimDetails: "hello " });
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.getClaimsDataById &&
      nextProps.getClaimsDataById !== this.props.getClaimsDataById
    ) {
      this.setState({
        mainLoader: false,
      });
    }
    if (
      nextProps.updateClaim &&
      nextProps.updateClaim !== this.props.updateClaim
    ) {
      showSuccess(this.props.t("Claim.UPDATE_C_SUCCESS"));
      this.setState({ loading: false });
      setTimeout(
        function() {
          this.props.history.push("/frontOffice/claim-status");
        }.bind(this),
        2000
      );
    }
    if (
      nextProps.updateClaimFail &&
      nextProps.updateClaimFail !== this.props.updateClaimFail
    ) {
      showError(nextProps.updateClaimFail);
      this.setState({ loading: false });
    }
    // ticket update
    // if (
    //   nextProps.updateTicketAttachmentData &&
    //   nextProps.updateTicketAttachmentData !==
    //     this.props.updateTicketAttachmentData
    // ) {
    //   showSuccess(this.props.t("Common.UPLOAD_SUCCESS"));
    //   this.setState({ loading: false });
    // }
    // Claim update
    // if (
    //   nextProps.updateClaimAttachmentData &&
    //   nextProps.updateClaimAttachmentData !==
    //     this.props.updateClaimAttachmentData
    // ) {
    //   showSuccess(this.props.t("Common.UPLOAD_SUCCESS"));
    //   this.setState({ loading: false });
    // }

    // ticket update
    if (
      nextProps.updateTicketAttachmentErrorStatus &&
      nextProps.updateTicketAttachmentErrorStatus !==
        this.props.updateTicketAttachmentErrorStatus
    ) {
      showError(nextProps.updateTicketAttachmentErrorStatus);
      this.setState({ loading: false });
    }
    // Claim update
    if (
      nextProps.updateClaimAttachmentErrorStatus &&
      nextProps.updateClaimAttachmentErrorStatus !==
        this.props.updateClaimAttachmentErrorStatus
    ) {
      showError(nextProps.updateClaimAttachmentErrorStatus);
      this.setState({ loading: false });
    }
  };

  /**call this function to click file input */
  handleClick = () => {
    this.refs.fileInput.click();
  };
  /**call this function to select file (upload file) */
  handleFileChange = (e) => {
    this.currentFile = e.target.files[0].name;
    const extensions = ["jpg", "jpeg", "bmp", "gif", "png", "pdf"];
    const fileExtension = e.target.files[0].name.split(".").pop();
    const fileSize = e.target.files[0].size;
    if (
      fileSize < 2200000 &&
      extensions.includes(fileExtension.toLowerCase())
    ) {
      getBase64(e.target.files[0], (result) => {
        this.setState({ currentTicketPath: result });
      });
    } else {
      showError(this.props.t("Common.FILE_ERROR"));
    }
  };
  // For update claim
  handleRefs = () => {
    this.refs.claimFileInput.click();
  };

  handleClaimFileChange = (e) => {
    this.currentClaimFile = e.target.files[0].name;
    const extensions = ["jpg", "jpeg", "bmp", "gif", "png", "pdf"];
    const fileExtension = e.target.files[0].name.split(".").pop();
    const fileSize = e.target.files[0].size;
    if (
      fileSize < 2200000 &&
      extensions.includes(fileExtension.toLowerCase())
    ) {
      getBase64(e.target.files[0], (result) => {
        this.setState({ currentClaimPath: result });
      });
    } else {
      showError(this.props.t("Common.FILE_ERROR"));
    }
  };

  onSubmit = (formProps) => {
    console.log(formProps);
    const params = qString.parse(this.props.location.search);
    const requestData = {
      code: params.code ? parseInt(params.code) : "",
      claimDetails: formProps.claimDetails,
    };
    console.log(requestData);
    // claimDetails update
    if (this.props.initialValues) {
      console.log(formProps);
      console.log(this.props.initialValues, formProps);
      this.props.dispatch(updateClaim(requestData));
    }

    // ticket update
    const ticketUpdateRequest = {
      code: params.code ? parseInt(params.code) : "",
      attachment: this.state.currentTicketPath
        ? this.state.currentTicketPath.split(",")[1]
        : "",
    };
    if (this.state.currentTicketPath) {
      this.props.dispatch(updateTicketAttachment(ticketUpdateRequest));
    }
    console.log(ticketUpdateRequest);

    // claim update
    const claimUpdateRequest = {
      code: params.code ? parseInt(params.code) : "",
      attachment: this.state.currentClaimPath
        ? this.state.currentClaimPath.split(",")[1]
        : "",
    };
    if (this.state.currentClaimPath) {
      this.props.dispatch(updateClaimAttachment(claimUpdateRequest));
    }
    console.log(claimUpdateRequest);
    // loader button
    this.setState({ loading: true });
  };

  render() {
    console.log(this.state.initialValues);
    console.log(this.props);
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <MainLoader className="text-center" loading={this.state.mainLoader} />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Container fluid className="claim-block c-h h-max">
            <Row className="mt-5">
              <Col md={5} className="mx-auto">
                <Card className="main-card claim-card card-shadow">
                  <CardHeader className="c-header">
                    <Row className="text-center w-100 text-light">
                      <Col className="col-md-auto">
                        <i
                          className="float-left fas fa-arrow-circle-left fa-2x py-3"
                          title="Back"
                          onClick={(e) => this.props.history.goBack()}
                        ></i>
                        &nbsp;
                      </Col>
                      <Col className="col-md-auto">
                        <h5 className=" text-canter py-3  font-weight-bold rounded">
                          {this.props.t("Claim.UPDATE_CLAIM")}
                        </h5>
                      </Col>
                      <Col md={3} />
                    </Row>
                  </CardHeader>

                  <AvForm
                    className="p-4"
                    noValidate
                    onSubmit={handleSubmit(this.onSubmit)}
                    model={this.props.initialValues}
                  >
                    <Row>
                      <Col md={10} className="mx-auto">
                        <FormGroup>
                          <AvField
                            name="claimDetails"
                            tag={Field}
                            component={"textarea"}
                            label={this.props.t("Category.CLAIM_BODY")}
                            type="textarea"
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="lb-right">
                            {this.props.t("Claim.FILE_ATTACH_X_LABEL")}
                          </Label>
                          <div>
                            <label
                              className="file-upload__label"
                              onClick={() => this.handleClick()}
                            >
                              <i className="fa fa-paperclip text-dark"></i>
                              <span className=" text-dark">
                                &nbsp; {this.props.t("Claim.FILE_ATTACH_X")}
                              </span>
                            </label>
                            <input
                              //component={CustomInput}
                              type="file"
                              name="updateTicket"
                              id="updateTicket"
                              ref="fileInput"
                              multiple
                              className="CiList-inputs form-control-file"
                              onChange={(e) => this.handleFileChange(e)}
                              style={{ display: "none" }}
                            />{" "}
                          </div>
                          <span className="text-dark">{this.currentFile}</span>
                        </FormGroup>
                        <FormGroup>
                          <Label className="lb-right">
                            {this.props.t("Claim.FILE_ATTACH_Y_LABEL")}
                          </Label>
                          <div>
                            <label
                              className="file-upload__label"
                              onClick={() => this.handleRefs()}
                            >
                              <i className="fa fa-paperclip text-dark"></i>
                              <span className=" text-dark">
                                &nbsp; {this.props.t("Claim.FILE_ATTACH_Y")}
                              </span>
                            </label>
                            <input
                              //component={CustomInput}
                              type="file"
                              name="updateClaim"
                              id="updateClaim"
                              ref="claimFileInput"
                              multiple
                              className="CiList-inputs form-control-file"
                              onChange={(e) => this.handleClaimFileChange(e)}
                              style={{ display: "none" }}
                            />{" "}
                          </div>
                          <span className="text-dark">
                            {this.currentClaimFile}
                          </span>
                          <br />
                          <small className="text-danger">
                            {this.props.t("Claim.MAX_SIZE")}
                          </small>
                        </FormGroup>
                      </Col>
                      <Col md={12} className=" text-center mb-2">
                        <SubmitBtnLoader
                          label={this.props.t("Claim.UPDATE_CLAIM")}
                          className="btn btn-lg btn-primary px-5 btn-pill"
                          loading={this.state.loading}
                          submitting={""}
                          type="submit"
                        />
                        <br />
                      </Col>
                    </Row>
                  </AvForm>
                </Card>
              </Col>
            </Row>
            <section className="mb-5">
              <Container>
                <Row></Row>
              </Container>
            </section>
          </Container>
        </ReactCSSTransitionGroup>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

UpdateClaimComponent = reduxForm({
  form: "UpdateClaim",
  // enableReinitialize: true,
})(UpdateClaimComponent);
function mapStateToProps(state) {
  // console.log(state.Claim.getClaimsDataById);
  return {
    initialValues: state.Claim.getClaimsDataById,
    getClaimsDataById: state.Claim.getClaimsDataById,
    updateClaim: state.Claim.updateClaim,
    updateClaimFail: state.Claim.updateClaimFail,

    updateTicketAttachmentData: state.Claim.updateTicketAttachmentData,
    updateTicketAttachmentErrorStatus:
      state.Claim.updateTicketAttachmentErrorStatus,

    updateClaimAttachmentData: state.Claim.updateClaimAttachmentData,
    updateClaimAttachmentErrorStatus:
      state.Claim.updateClaimAttachmentErrorStatus,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(UpdateClaimComponent);
