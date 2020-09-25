/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component, Fragment } from "react";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import {
  dateTimeFormat,
  simpleDateFormat,
  getLangBasedDataLabel,
  getLangBasedStationLabel,
  getFileExtension,
  getTarifLabel,
} from "../../Helpers/utils";

import { reduxForm } from "redux-form";
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Collapse,
  CardHeader,
} from "reactstrap";
import {
  getMyClaims,
  getTicketAttachment,
  getClaimAttachment,
} from "../../../actions/claimAction";
import { showSuccess, showError, getBase64 } from "../../Helpers/utils";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// import PrintModal from "./PrintModal";
class ClaimStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      showClaimDetails: false,
      accordion: [],
      custom: [true, false],
      status: "Closed",
      fadeIn: true,
      timeout: 300,
      myClaimsData: [],
      showAttchment: [],
      attachments: [],
      getTicketAttachment: null,
      noDataFound: true,
      loading: false,
      isRequest: false,
      noClaims: false,
    };
  }

  componentDidMount = () => {
    this.props.dispatch(getMyClaims());
  };

  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.myClaimsData &&
      nextProps.myClaimsData !== this.props.myClaimsData
    ) {
      this.setState({
        myClaimsData: nextProps.myClaimsData,
        noDataFound: false,
      });
      let accordion = this.state.accordion;
      let showAttchment = this.state.showAttchment;
      let attachments = this.state.attachments;
      for (let x = 0; x <= nextProps.myClaimsData.length; x++) {
        accordion.push(false);
        showAttchment.push(false);
        attachments.push(false);
      }
      this.setState({
        accordion: accordion,
        showAttchment: showAttchment,
        attachments: attachments,
      });
    }
    if (
      nextProps.claimDataError &&
      nextProps.claimDataError !== this.props.claimDataError
    ) {
      this.setState({
        noDataFound: false,
        noClaims: true,
      });
    }
    if (
      nextProps.getTicketAttachmentData &&
      nextProps.getTicketAttachmentData !== this.props.getTicketAttachmentData
    ) {
      this.setState({
        getTicketAttachment:
          getFileExtension(
            nextProps.getTicketAttachmentData.attachment.slice(0, 5)
          ) + nextProps.getTicketAttachmentData.attachment,
      });
      setTimeout(
        function() {
          document.getElementById("linkId") &&
            document.getElementById("linkId").click();
          this.setState({
            getTicketAttachment: null,
          });
        }.bind(this),
        1000
      );
    }
    if (
      nextProps.ClaimAttachmentData &&
      nextProps.ClaimAttachmentData !== this.props.ClaimAttachmentData
    ) {
      this.setState({
        ClaimAttachmentData: nextProps.ClaimAttachmentData.attachment
          ? getFileExtension(
              nextProps.ClaimAttachmentData.attachment.slice(0, 5)
            ) + nextProps.ClaimAttachmentData.attachment
          : false,
      });
    }
    if (
      nextProps.getTicketAttachmentErrorStatus &&
      nextProps.getTicketAttachmentErrorStatus !==
        this.props.getTicketAttachmentErrorStatus
    ) {
      showError(nextProps.getTicketAttachmentErrorStatus);
    }
    if (
      nextProps.getTicketAttachmentNetworkErrorStatus &&
      nextProps.getTicketAttachmentNetworkErrorStatus !==
        this.props.getTicketAttachmentNetworkErrorStatus
    ) {
      showError(this.props.t("Common.SOMETHING_WENT_WRONG"));
    }
    if (
      nextProps.updateTicketAttachmentErrorStatus &&
      nextProps.updateTicketAttachmentErrorStatus !==
        this.props.updateTicketAttachmentErrorStatus
    ) {
      showError(this.props.t("Common.FILE_UPDATE"));
    }
    if (
      nextProps.updateTicketAttachmentNetworkErrorStatus &&
      nextProps.updateTicketAttachmentNetworkErrorStatus !==
        this.props.updateTicketAttachmentNetworkErrorStatus
    ) {
      showError(this.props.t("Common.FILE_UPDATE"));
    }
    if (
      nextProps.updateTicketAttachmentData &&
      nextProps.updateTicketAttachmentData !==
        this.props.updateTicketAttachmentData
    ) {
      showSuccess(this.props.t("Common.UPLOAD_SUCCESS"));
      this.setState({ loading: false });
      this.toggleAccordion();
    }
    this.setState({
      isRequest: nextProps.isRequest,
    });
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  };
  /*-------------------show attachment button----------------*/
  showAttchmentButton = (key) => {
    let data = this.state.showAttchment;
    data[key] = !data[key];
    this.setState({
      showAttchment: data,
    });
  };
  /**call this function to click file input */
  handleClick = () => {
    this.refs.fileInput.click();
  };
  /**call this function to select file (upload file) */
  handleFileChange = (e, key) => {
    this.currentFile = e.target.files[0].name;
    const extensions = ["jpg", "jpeg", "bmp", "gif", "png", "pdf"];
    const fileExtension = e.target.files[0].name.split(".").pop();
    const fileSize = e.target.files[0].size;
    if (
      fileSize < 10000000 &&
      extensions.includes(fileExtension.toLowerCase())
    ) {
      getBase64(e.target.files[0], (result) => {
        let data = this.state.attachments;
        data[key] = {
          url: result,
          name: this.currentFile,
        };
        this.setState({ attachments: data });
      });
    } else {
      showError(this.props.t("Common.FILE_ERROR"));
    }
  };

  updateClaim = (code) => {
    this.props.history.push(`/frontOffice/update-claim?code=${code}`);
  };

  callClaimAttachment = (code) => {
    this.props.dispatch(getClaimAttachment(code));
  };
  // claim communication

  showClaimCommunication = (communicationData) => {
    return communicationData.map((data, key) => {
      return (
        <Col md={12} className="mt-2">
          <Card className="mb-1 p-2">
            <span>
              <strong>{this.props.t("ClaimStatus.DATE")}</strong>:
              {data ? dateTimeFormat(data.date) : ""}
            </span>
            <span>
              <strong>{this.props.t("ClaimStatus.SENT_MESSAGE")}</strong>:
              <div
                dangerouslySetInnerHTML={{
                  __html: data ? data.sentMessage : "",
                }}
              />
            </span>
          </Card>
        </Col>
      );
    });
  };

  /**toggle print modal */
  togglePrintModal = (data) => {
    if (data) {
      this.setState({
        claimData: data,
      });
    }
    this.setState({
      openPrintModal: !this.state.openPrintModal,
    });
  };
  /*------------function for navifate claim data from print screen------ */
  navigateCalimData = (data) => {
    this.props.history.push(`/frontOffice/claim-Data/${data.code}`);
  };
  navigateCalimData = (data) => {
    window.open(
      `${window.location.protocol}://${window.location.host}#/frontOffice/claim-Data/${data.code}`,
      "_blank",
      "width=500,height =500",
      "left:400"
    );
  };

  /*fucntion for show my claims data */
  showMyClaims = () => {
    return this.state.myClaimsData.map((claimData, key) => {
      return (
        <Card className="mb-1" id={`printCard${key}`}>
          <Container id="headingOne" className="pt-2">
            <Row
              onClick={() => {
                this.callClaimAttachment(claimData.code);
                this.toggleAccordion(key);
              }}
              aria-expanded={this.state.accordion[key]}
              aria-controls="collapseOne"
            >
              <Col className="col-md-4 mx-auto rtl-txt-right ">
                <Button className="btn btn-b status-btn-width p-3 ">
                  {" "}
                  {this.props.t("ClaimStatus.VIEW_DETAILS")}
                </Button>
              </Col>
              <Col className="col-md-4 mx-auto text-center">
                <p>
                  <strong>{this.props.t("ClaimStatus.REF_N")}: </strong>
                  {claimData ? claimData.referenceNo : null}
                </p>
                <p>
                  <strong>{this.props.t("ClaimStatus.CREATION_DATE")}: </strong>
                  {claimData ? dateTimeFormat(claimData.createDate) : ""}
                </p>
              </Col>
              <Col className="col-md-4 mx-auto rtl-txt-right">
                {/* claim submitted  */}
                {claimData.claimStatus === "1" && (
                  <button className="btn btn-submitted btn-pill float-right status-btn-width p-3">
                    {" "}
                    {this.props.t("ClaimStatus.SUBMITTED")}{" "}
                  </button>
                )}
                {/* claim processing */}
                {claimData.claimStatus === "2" && (
                  <button className="btn btn-progress btn-pill float-right status-btn-width p-3">
                    {" "}
                    {this.props.t("ClaimStatus.PROGRESS")}{" "}
                  </button>
                )}
                {/* claim accepted */}
                {claimData.claimStatus === "3" && (
                  <button className="btn btn-accepted btn-pill float-right status-btn-width p-3">
                    {" "}
                    {this.props.t("ClaimStatus.APPROVE")}{" "}
                  </button>
                )}
                {/* claim rejected */}
                {claimData.claimStatus === "4" && (
                  <button className="btn btn-rejected btn-pill float-right status-btn-width p-3">
                    {" "}
                    {this.props.t("ClaimStatus.REJECT")}{" "}
                  </button>
                )}
                {/* claim temporary approved */}
                {claimData.claimStatus === "5" && (
                  <button className="btn btn-accepted btn-pill float-right status-btn-width p-3">
                    {" "}
                    {this.props.t("ClaimStatus.TEMPORARY_APPROVE")}{" "}
                  </button>
                )}
              </Col>
            </Row>
          </Container>
          <Container className="pb-2">
            <Collapse
              isOpen={this.state.accordion[key]}
              data-parent="#accordion"
              id="collapseOne"
              aria-labelledby="headingOne"
            >
              <CardBody className="bg-smoke">
                <Row>
                  <Col md={4}>
                    <p>
                      <strong>
                        {this.props.t("ClaimStatus.SUBJECT_CLAIM")}
                      </strong>{" "}
                      : {claimData ? claimData.claimSubject : ""}
                    </p>
                    <span>
                      {" "}
                      <strong>
                        {this.props.t("ClaimDetails.TRAVEL_DATE")}
                      </strong>
                      : {claimData ? dateTimeFormat(claimData.travelDate) : ""}
                    </span>
                    <br />
                    <span>
                      <strong>{this.props.t("ClaimStatus.CATEGORY")}</strong>:{" "}
                      {claimData.categoryCode
                        ? getLangBasedDataLabel(claimData.category)
                        : "none"}
                    </span>
                    <br />
                    <span>
                      <strong>
                        {this.props.t("ClaimStatus.SUB_CATEGORY")}
                      </strong>
                      :{" "}
                      {claimData.subCategoryCode
                        ? getLangBasedDataLabel(claimData.subCategory)
                        : "none"}
                    </span>
                    <br />
                    <span>
                      <strong>
                        {this.props.t("ClaimStatus.SUB_SUB_CATEGORY")}
                      </strong>
                      :{" "}
                      {claimData.subSubCategoryCode
                        ? getLangBasedDataLabel(claimData.subSubCategory)
                        : "none"}
                    </span>
                  </Col>
                  <Col md={4}>
                    <p>
                      <strong>
                        {this.props.t("ClaimDetails.TRIP_DETAILS")}
                      </strong>
                    </p>
                    <span>
                      <strong>{this.props.t("ClaimStatus.TRAIN_NUM")}: </strong>
                      {claimData ? claimData.trainNumber : ""}
                    </span>
                    <br />
                    <span>
                      <strong>
                        {this.props.t("ClaimStatus.DEPART_STN")}:{" "}
                      </strong>
                      {claimData.departureStationCode
                        ? getLangBasedStationLabel(claimData.departureStation)
                        : ""}
                    </span>
                    <br />
                    <span>
                      <strong>{this.props.t("ClaimStatus.ARRIV_STN")}: </strong>
                      {claimData.arrivalStationCode
                        ? getLangBasedStationLabel(claimData.arrivalStation)
                        : ""}
                    </span>
                    <br />
                    {/* For Gare */}
                    {claimData && claimData.eventLocation === "Gare" && (
                      <span>
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.EVENT_STATION")}:{" "}
                          </strong>
                          {claimData.eventStation
                            ? getLangBasedStationLabel(claimData.eventStation)
                            : "none"}
                        </span>
                        <br />
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.NEW_TRAVEL_DATE_TIME")}:{" "}
                          </strong>
                          {claimData && claimData.travelDate
                            ? simpleDateFormat(claimData.travelDate)
                            : "none"}
                        </span>
                        <br />
                      </span>
                    )}

                    {/* For train */}
                    {claimData && claimData.eventLocation === "Train" && (
                      <span>
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.DEPARTURE_HOUR")}:{" "}
                          </strong>
                          {claimData ? claimData.departureHour : ""}
                        </span>
                        <br />
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.ARRIVING_TIME")}:{" "}
                          </strong>
                          {claimData ? claimData.arrivalHour : ""}
                        </span>
                        <br />
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.DEPART_STN")}:{" "}
                          </strong>
                          {claimData.departureStationCode
                            ? getLangBasedStationLabel(
                                claimData.departureStation
                              )
                            : ""}
                        </span>
                        <br />
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.ARRIVAL_STATION")}:{" "}
                          </strong>
                          {claimData.arrivalStationCode
                            ? getLangBasedStationLabel(claimData.arrivalStation)
                            : ""}
                        </span>
                        <br />
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.TRAIN_NUMBER")}:{" "}
                          </strong>
                          {claimData ? claimData.trainNumber : ""}
                        </span>
                        <br />
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.TYPE_OF_TRAIN")}:{" "}
                          </strong>
                          {claimData
                            ? claimData.trainClassificationCode
                            : "none"}
                        </span>
                        <br />
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.NEW_TRAVEL_DATE_TIME")}:{" "}
                          </strong>
                          {claimData && claimData.travelDate
                            ? simpleDateFormat(claimData.travelDate)
                            : "none"}
                        </span>
                        <br />
                        <span>
                          <strong>{this.props.t("ClaimStatus.TARIF")}: </strong>
                          {claimData ? getTarifLabel(claimData.tarif) : "none"}
                        </span>
                        <br />
                        <span>
                          <strong>
                            {this.props.t("ClaimStatus.UPDATED_DATE")}:{" "}
                          </strong>
                          {claimData && claimData.lastModifiedDate
                            ? simpleDateFormat(claimData.lastModifiedDate)
                            : "none"}
                        </span>
                        <br />
                      </span>
                    )}
                  </Col>
                  <Col md={4}>
                    <p>
                      <strong>{this.props.t("ClaimStatus.YOUR_MSG")}</strong>
                    </p>
                    <span>{claimData ? claimData.claimDetails : ""}</span>

                    <p>
                      <strong>
                        <a
                          href="javscript:void(0)"
                          onClick={() =>
                            this.props.dispatch(
                              getTicketAttachment(claimData.code)
                            )
                          }
                        >
                          <i class="fas fa-file-download"></i>
                          {"  "}
                          {this.props.t("ClaimDetails.DOWNLOAD_ATTACH")}
                        </a>
                        <br />
                        {this.state.ClaimAttachmentData && (
                          <a
                            // id="linkId"
                            target={"_blank"}
                            href={
                              this.state.ClaimAttachmentData
                                ? this.state.ClaimAttachmentData
                                : "#"
                            }
                            download={"Claim_Attachment"}
                          >
                            <i class="fas fa-file-download"></i>
                            {"  "}
                            {this.props.t("ClaimDetails.DOWNLOAD_CLAIM_ATTACH")}
                          </a>
                        )}
                        <br />

                        <a
                          id="linkId"
                          href={
                            this.state.getTicketAttachment
                              ? this.state.getTicketAttachment
                              : "#"
                          }
                          target={"_blank"}
                          download={"Ticket_Attachment"}
                        ></a>
                      </strong>
                    </p>
                  </Col>
                  <br />
                  <Col md={12}>
                    <Button
                      className="btn btn-primary mt-2"
                      onClick={() => this.navigateCalimData(claimData)}
                    >
                      <i className="fas fa-print"></i>{" "}
                      {this.props.t("Claim.PRINT_DOCUMENT")}
                    </Button>
                  </Col>
                  <Col md={12}>
                    {claimData.claimStatus === "4" && (
                      <Button
                        className="btn btn-primary mt-2"
                        onClick={(e) => this.updateClaim(claimData.code)}
                      >
                        {this.props.t("Common.MODIFICATON_1")}
                      </Button>
                    )}
                  </Col>
                </Row>

                <br />
                <Row>
                  {" "}
                  {claimData.claimCommunication && (
                    <Col>
                      <strong>
                        {this.props.t("ClaimStatus.CLAIM_COMMUNICATION")}
                      </strong>
                    </Col>
                  )}
                  {claimData.claimCommunication &&
                    this.showClaimCommunication(claimData.claimCommunication)}
                </Row>
              </CardBody>
            </Collapse>
          </Container>
        </Card>
      );
    });
  };

  render() {
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
          <Container fluid className="bg-box mt-3 c-h claim-bg">
            <Row className="">
              <Col md={8} className="mx-auto">
                <Card className="main-card my-1 claim-card-status card-shadow">
                  <CardHeader className="c-header">
                    <Row className="text-center w-100 text-light">
                      <Col md={12}>
                        <h5 className=" text-canter py-3  font-weight-bold rounded">
                          {this.props.t("ClaimStatus.SUBMITTED_CLAIM")}
                        </h5>
                      </Col>
                    </Row>
                  </CardHeader>

                  {this.state.myClaimsData.length ? this.showMyClaims() : ""}
                  <div className="text-center text-danger p-ab">
                    {this.state.noDataFound && (
                      <div className="bg-light ">
                        <div className="spinner-border ">&nbsp;</div>
                        <p className="bg.light p-3 font-weight-bold ">
                          {this.props.t("Common.LOADING")}
                        </p>
                      </div>
                    )}
                    {this.state.noClaims && (
                      <div class="bg-light ">
                        <p className="bg.light p-3 font-weight-bold ">
                          {this.props.t("Common.NO_CLAIMS")}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col class="ft-fix"></Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

ClaimStatus = reduxForm({
  form: "mainForm",
})(ClaimStatus);
function mapStateToProps(state) {
  return {
    myClaimsData: state.Claim.myClaimsData,
    claimDataError: state.Claim.claimDataError,
    getTicketAttachmentData: state.Claim.getTicketAttachmentData,
    getTicketAttachmentNetworkErrorStatus:
      state.Claim.getTicketAttachmentNetworkErrorStatus,
    getTicketAttachmentErrorStatus: state.Claim.getTicketAttachmentErrorStatus,
    updateTicketAttachmentData: state.Claim.updateTicketAttachmentData,
    updateTicketAttachmentNetworkErrorStatus:
      state.Claim.updateTicketAttachmentNetworkErrorStatus,
    updateTicketAttachmentErrorStatus:
      state.Claim.updateTicketAttachmentErrorStatus,
    isRequest: state.Claim.isRequest,
    ClaimAttachmentData: state.Claim.ClaimAttachmentData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimStatus);
