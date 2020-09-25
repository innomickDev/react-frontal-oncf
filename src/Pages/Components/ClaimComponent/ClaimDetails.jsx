import React, { Fragment } from "react";
import { Row, Col, Card, Container, Button, CardHeader } from "reactstrap";
import ClaimResult from "../../../assets/img/svg/claim-result.svg";
import CheckSign from "../../../assets/img/svg/check-mark.svg";
import {
  dateTimeFormat,
  getLangBasedStationLabel,
  showError,
  getLangBasedDataLabel,
} from "../../Helpers/utils";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { reduxForm } from "redux-form";
import { getClaimsDetailsById } from "../../../actions/claimAction";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import MainLoader from "../../Common/Loader";
const claimId = localStorage.getItem("claimId");

class ClaimDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        mainLoader: true,
        activeTab: tab,
      });
    }
  };

  componentDidMount = () => {
    this.props.dispatch(getClaimsDetailsById(this.props.match.params.id));
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.getClaimsDataById &&
      nextProps.getClaimsDataById !== this.props.getClaimsDataById
    ) {
      this.setState({
        getClaimsDataById: nextProps.getClaimsDataById,
        loader: false,
        mainLoader: false,
      });
    }
    if (
      nextProps.getClaimsDataError &&
      nextProps.getClaimsDataError !== this.props.getClaimsDataError
    ) {
      this.setState({
        loader: false,
      });
      showError("Common.SOMETHING_WENT_WRONG");
    }
  };
  render() {
    const getClaimsDataById = this.state.getClaimsDataById
      ? this.state.getClaimsDataById
      : null;

    const claimData = JSON.parse(localStorage.getItem("claimData"));
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
          <MainLoader className="text-center" loading={this.state.loader} />

          <Container fluid className="claim-block c-h claim-bg">
            <Row className="">
              <Col md={6} className="mx-auto">
                <Card className="claim-card card-shadow claim-details-rtl">
                  <CardHeader className="c-header">
                    <Row className="text-center w-100 text-light">
                      <Col md={12} className="mx-auto ">
                        <h5 className="pytext-canter-3  font-weight-bold">
                          {this.props.t("ClaimDetails.CLAIM_HEAD")}
                        </h5>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div className="text-center m-1">
                    <img
                      src={ClaimResult}
                      className="img-fluid my-2"
                      alt="claim-result"
                      width="20%"
                    />
                    <br />
                    <span className="font-weight-bold text-success">
                      {this.props.t("ClaimDetails.CLAIM_SENT")}
                    </span>
                    &nbsp;
                    <img src={CheckSign} alt="" width="3%" />
                  </div>
                  <div row>
                    <Col md={10} className="mx-auto">
                      <Card className="p-3 bg-smoke">
                        <h5 className="text-canter mt-3 float-right font-weight-bold">
                          {this.props.t("ClaimDetails.REF_N")}:{" "}
                          <span class="font-weight-light">
                            {getClaimsDataById
                              ? getClaimsDataById.referenceNo
                              : ""}
                          </span>
                        </h5>
                        <h5 className="font-weight-bold">
                          {getClaimsDataById
                            ? getClaimsDataById.claimSubject
                            : ""}
                        </h5>
                        <ul className="list-unstyled">
                          <li>
                            <span className="font-weight-bold">
                              {this.props.t("ClaimDetails.CATEGORY")}:
                            </span>{" "}
                            {getClaimsDataById
                              ? getLangBasedDataLabel(
                                  getClaimsDataById.category
                                )
                              : ""}
                            /
                            {getClaimsDataById
                              ? getLangBasedDataLabel(
                                  getClaimsDataById.subCategory
                                )
                              : ""}
                            /
                            {getClaimsDataById &&
                            getClaimsDataById.subSubCategory
                              ? getLangBasedDataLabel(
                                  getClaimsDataById.subSubCategory
                                )
                              : ""}
                          </li>
                        </ul>
                        {/* Trip details */}
                        <h5 className="font-weight-bold">
                          {this.props.t("ClaimDetails.TRIP_DETAILS")}
                        </h5>
                        <ul className="list-unstyled">
                          <li>
                            <span className="font-weight-bold">
                              {this.props.t("ClaimDetails.TRAIN_N")}:
                            </span>{" "}
                            {getClaimsDataById
                              ? getClaimsDataById.trainNumber
                              : ""}
                          </li>
                          <li>
                            <span className="font-weight-bold">
                              {this.props.t("ClaimDetails.DEPART_STN")}:
                            </span>{" "}
                            {getClaimsDataById
                              ? getLangBasedStationLabel(
                                  getClaimsDataById.departureStation
                                )
                              : ""}
                          </li>
                          <li>
                            <span className="font-weight-bold">
                              {this.props.t("ClaimDetails.ARRIV_STN")}:
                            </span>{" "}
                            {getClaimsDataById
                              ? getLangBasedStationLabel(
                                  getClaimsDataById.arrivalStation
                                )
                              : ""}
                          </li>
                          <li>
                            <span className="font-weight-bold">
                              {" "}
                              {this.props.t("ClaimDetails.TRAVEL_DATE")}:
                            </span>{" "}
                            {getClaimsDataById
                              ? dateTimeFormat(getClaimsDataById.travelDate)
                              : ""}
                          </li>
                        </ul>
                        {/* Your message */}
                        <h5 className="font-weight-bold">
                          {this.props.t("ClaimDetails.YOUR_MSG")}
                        </h5>
                        <p>
                          {getClaimsDataById
                            ? getClaimsDataById.claimDetails
                            : ""}
                        </p>
                      </Card>
                      <br />
                    </Col>
                  </div>
                  <div className="text-center mb-3">
                    <Button
                      className="btn btn-primary btn-pill p-3 home-btn-width"
                      onClick={() =>
                        this.props.history.push("/frontOffice/home")
                      }
                    >
                      {this.props.t("ClaimDetails.OK")}
                    </Button>
                  </div>
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
      </Fragment>
    );
  }
}

ClaimDetails = reduxForm({
  form: "mainForm",
})(ClaimDetails);
function mapStateToProps(state) {
  return {
    getClaimsDataById: state.Claim.getClaimsDataById,
    getClaimsDataError: state.Claim.getClaimsDataError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimDetails);
