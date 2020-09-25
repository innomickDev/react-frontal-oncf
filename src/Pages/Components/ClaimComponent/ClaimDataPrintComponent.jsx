import React, { Fragment } from "react";
import { reduxForm} from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import {
  showError,
  dateTimeFormat,
  getLangBasedDataLabel,
  getLangBasedStationLabel,
  getFileExtension,
} from "../../Helpers/utils";
import {
  getClaimsDetailsById,
  getTicketAttachment,
  getClaimAttachment,
} from "../../../actions/claimAction";
import { Button, Row, Col, Card, CardBody, Container } from "reactstrap";
const ref = React.createRef();

class PrintModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentDidMount = () => {
    const claimId = this.props.match.params.id;
    this.props.dispatch(getClaimsDetailsById(claimId));
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.getClaimsDataById &&
      nextProps.getClaimsDataById !== this.props.getClaimsDataById
    ) {
      this.setState({
        claimData: nextProps.getClaimsDataById,
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
      if (
        nextProps.ClaimAttachmentData.attachment &&
        nextProps.ClaimAttachmentData.attachment !== ""
      ) {
        this.setState({
          ClaimAttachmentData: nextProps.ClaimAttachmentData.attachment
            ? getFileExtension(
                nextProps.ClaimAttachmentData.attachment.slice(0, 5)
              ) + nextProps.ClaimAttachmentData.attachment
            : false,
        });
        setTimeout(
          function() {
            document.getElementById("claimId") &&
              document.getElementById("claimId").click();
            this.setState({
              ClaimAttachmentData: null,
            });
          }.bind(this),
          1000
        );
      } else {
        showError(this.props.t("ErrorMsg.NO_CLAIM_ATTACHMENT"));
      }
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
  };
  toggle = () => {
    this.props.toggle();
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
  printDocument = () => {
    window.print();
  };
  render() {
    const claimData = this.state.claimData;

    return (
      <Fragment>
        <div style={{ marginTop: "9vh" }}>
          <Card id="printCard" ref={ref}>
            <Container id="headingOne" className="pt-2">
              <Row
                onClick={() => {
                  this.callClaimAttachment(claimData.code);
                }}
              >
                <Col className="col-md-6">
                  <div className="pl-3">
                    <p>
                      <strong>{this.props.t("ClaimStatus.REF_N")}: </strong>
                      {claimData ? claimData.referenceNo : null}
                    </p>
                    <p>
                      <strong>
                        {this.props.t("ClaimStatus.CREATION_DATE")}:{" "}
                      </strong>
                      {claimData ? dateTimeFormat(claimData.createDate) : ""}
                    </p>
                  </div>
                </Col>
                <Col md={6} data-html2canvas-ignore="true">
                  <Button
                    id="printbtn-x"
                    className="btn btn-primary mt-2 pull-right"
                    onClick={() => this.printDocument()}
                  >
                    <i className="fas fa-print"></i>{" "}
                    {/* {this.props.t("Claim.PRINT_DOCUMENT")} */}
                  </Button>
                </Col>
              </Row>
            </Container>
            <Container className="pb-2">
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
                      {claimData
                        ? claimData.categoryCode
                          ? getLangBasedDataLabel(claimData.category)
                          : ""
                        : ""}
                    </span>
                    <br />
                    <span>
                      <strong>
                        {this.props.t("ClaimStatus.SUB_CATEGORY")}
                      </strong>
                      :{" "}
                      {claimData
                        ? claimData.subCategoryCode
                          ? getLangBasedDataLabel(claimData.subCategory)
                          : ""
                        : ""}
                    </span>
                    <br />
                    <span>
                      <strong>
                        {this.props.t("ClaimStatus.SUB_SUB_CATEGORY")}
                      </strong>
                      :{" "}
                      {claimData && claimData.subSubCategoryCode
                        ? getLangBasedDataLabel(claimData.subSubCategory)
                        : ""}
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
                      {claimData
                        ? claimData.departureStationCode
                          ? getLangBasedStationLabel(claimData.departureStation)
                          : ""
                        : ""}
                    </span>
                    <br />
                    <span>
                      <strong>{this.props.t("ClaimStatus.ARRIV_STN")}: </strong>
                      {claimData
                        ? claimData.arrivalStationCode
                          ? getLangBasedStationLabel(claimData.arrivalStation)
                          : ""
                        : ""}
                    </span>
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
                        {/* Claim attachment */}
                        <a
                          href="javscript:void(0)"
                          onClick={() =>
                            this.props.dispatch(
                              getClaimAttachment(claimData.code)
                            )
                          }
                        >
                          <i class="fas fa-file-download"></i>
                          {"  "}
                          {this.props.t("ClaimDetails.DOWNLOAD_CLAIM_ATTACH")}
                        </a>
                        <br />
                        <a
                          id="claimId"
                          href={
                            this.state.ClaimAttachmentData
                              ? this.state.ClaimAttachmentData
                              : "#"
                          }
                          target={"_blank"}
                          download={"Claim_Attachment"}
                        ></a>
                      </strong>
                    </p>
                  </Col>
                  <br />
                </Row>

                <br />
                <Row>
                  {" "}
                  {claimData && claimData.claimCommunication && (
                    <Col>
                      <strong>
                        {this.props.t("ClaimStatus.CLAIM_COMMUNICATION")}
                      </strong>
                    </Col>
                  )}
                  {claimData &&
                    claimData.claimCommunication &&
                    this.showClaimCommunication(claimData.claimCommunication)}
                </Row>
              </CardBody>
            </Container>
          </Card>
        </div>
      </Fragment>
    );
  }
}

PrintModal = reduxForm({
  form: "PrintModal",
  //validate,
  // asyncValidate,
})(PrintModal);
function mapStateToProps(state) {
  return {
    getTicketAttachmentData: state.Claim.getTicketAttachmentData,
    getTicketAttachmentNetworkErrorStatus:
      state.Claim.getTicketAttachmentNetworkErrorStatus,
    getTicketAttachmentErrorStatus: state.Claim.getTicketAttachmentErrorStatus,
    ClaimAttachmentData: state.Claim.ClaimAttachmentData,
    getClaimsDataById: state.Claim.getClaimsDataById,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(PrintModal);
