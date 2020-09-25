import React, { Fragment, Component } from "react";
import { Container, Row, Col, Card, Button } from "reactstrap";

import { translate } from "react-multi-lang";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// hit
import ObjectOne from "../../../assets/img/g1.png";
import ObjectTwo from "../../../assets/img/g2.png";
import ObjectThree from "../../../assets/img/g3.png";
import featureImg from "../../../assets/img/g4.png";
import imgOne from "../../../assets/img/svg/Grp201.svg";
import imgTwo from "../../../assets/img/svg/Grp202.svg";
import imgThree from "../../../assets/img/svg/Grp203.svg";
import oncfAgents from "../../../assets/img/oncf-agents.png";
import objetsPerdus from "../../../assets/img/objets-perdus.png";
import DownArrow from "../../../assets/img/g6.png";
import { Element, Link } from "react-scroll";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  redirectClaim = () => {
    if (localStorage.getItem("foAuthToken")) {
      this.props.history.push("/frontOffice/claim");
    } else {
      this.props.history.push("/frontOffice/login");
    }
  };
  redirectClaimStatus = () => {
    if (localStorage.getItem("foAuthToken")) {
      this.props.history.push("/frontOffice/claim-status");
    } else {
      this.props.history.push("/frontOffice/login");
    }
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
          <Element name="home">
            <Container fluid className="mt-5 h-max">
              <Row className="py-2">
                <Col md={6} className="mx-auto">
                  <Card className="p-3 text-center card-shadow-black">
                    <div className="my-5">
                      <h1 className="h-o-bold">
                        {this.props.t("Home.TITLE_TEXT")}
                      </h1>
                      <span className="h-f-color">
                        {this.props.t("Home.SUB_TITLE")}
                      </span>
                    </div>
                    <div className="mb-5 btn-txt">
                      <Button
                        className="home-btn-width p-3 btn btn-lg btn-primary btn-pill c-px" //p-b-x for button
                        onClick={(e) => this.redirectClaim()}
                      >
                        <span> {this.props.t("Home.CLAIM")}</span>
                      </Button>
                      <Button
                        className="home-btn-width p-3 btn btn-lg btn-outline-primary btn-pill c-px b-p-rtl"
                        onClick={(e) => this.redirectClaimStatus()}
                      >
                        <span> {this.props.t("Home.CLAIM_STATUS")}</span>
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Element>

          <div class="rst-scroll-down-x text-center hidden-xs hidden-sm">
            <Link to="x1" spy={true} smooth={true} duration={500} offset={-70}>
              <img src={DownArrow} alt="scroll down" width="5%" />
            </Link>
          </div>

          {/* section two */}

          <Element name="x1">
            <Container fluid className="bg-box" id="section2">
              <Row className="" id="claim-process">
                <Col md={6} className="mx-auto box-rl">
                  <div className="text-center ">
                    <h6 className="text-light c-bg p-3 m-2 font-weight-bold border-xy rtl-d">
                      {this.props.t("Home.PROCESS")} :
                    </h6>
                  </div>
                </Col>
                <Col md={11} className="mx-auto">
                  <Card className=" b-card right-sudo  card-shadow card-border">
                    <div className="c-mt mb-5 txt-rtl">
                      <Row>
                        <Col md={{ size: 3, offset: 1 }}>
                          <img
                            src={ObjectOne}
                            className="img-fluid"
                            alt="hitw-1"
                          />
                        </Col>
                        <Col md={4}>
                          <div className="img-pos">
                            <h6 className="font-weight-bold text-black">
                              {this.props.t("Home.MAKE_ONLINE_CLAIM")}
                            </h6>
                            <p className="text-black p-text">
                              {this.props.t("Home.MAKE_ONLINE_CLAIM_SUB")}
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <br />
                      <Row>
                        <Col md={{ size: 3, offset: 1 }}>
                          <img
                            src={ObjectTwo}
                            className="img-fluid"
                            alt="hitw-1"
                          />
                        </Col>
                        <Col md={4}>
                          <div className="img-pos">
                            <h6 className="font-weight-bold text-black">
                              {this.props.t(
                                "Home.FOLLOW_THE_PROCESSING_OF_CLAIMS"
                              )}
                            </h6>
                            <p className="text-black p-text">
                              {this.props.t(
                                "Home.FOLLOW_THE_PROCESSING_OF_CLAIMS_SUB"
                              )}
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <br />
                      <Row>
                        <Col md={{ size: 3, offset: 1 }}>
                          <img
                            src={ObjectThree}
                            className="img-fluid"
                            alt="hitw-1"
                          />
                        </Col>
                        <Col md={4}>
                          <div className="img-pos">
                            <h6 className="font-weight-bold text-black">
                              {this.props.t("Home.CLAIM_PROCESSED")}
                            </h6>
                            <p className="text-black p-text">
                              {this.props.t("Home.CLAIM_PROCESSED_SUB")}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Element>

          <div class="rst-scroll-down-x text-center hidden-xs hidden-sm">
            <Link
              to="howItWork"
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
            >
              <img src={DownArrow} alt="scroll down" width="5%" />
            </Link>
          </div>
          {/* section 3 */}
          <Element name="howItWork">
            <Container fluid className="bg-box " id="section3">
              <Row className="">
                <Col md={6} className="mx-auto box-rl">
                  <div className="text-center dir-rtl">
                    <h6 className="text-light c-bg p-3 m-2 font-weight-bold border-xy">
                      {this.props.t("Home.HOW_IT_WORKS")} :
                    </h6>
                  </div>
                </Col>
                {/* <div> */}

                {/* </div> */}
              </Row>
              <Card className="row px-5 c-card card-shadow card-border">
                <div className="c-mt pb-5">
                  <Row>
                    <Col md={4} className="mx-auto">
                      <div className="text-center">
                        <small className="text-muted">
                          {this.props.t("Home.HIW_X_SUBTEXT")} :
                        </small>
                      </div>
                      <div className="text-center block-s pb-1  px-1">
                        <p className="text-black pt-3 font-weight-bold">
                          {this.props.t("Home.HIW_X_HEAD")}
                        </p>
                      </div>
                      <div className="pl-2 mt-2">
                        <ul class="list-unstyled">
                          <li>{this.props.t("Home.HIW_X_ONE")} </li>
                          <li>{this.props.t("Home.HIW_X_TWO")}</li>
                          <li>{this.props.t("Home.HIW_X_THREE")}</li>
                          <li>{this.props.t("Home.HIW_X_FOUR")}</li>
                          <li>{this.props.t("Home.HIW_X_FIVE")}</li>
                        </ul>
                      </div>
                    </Col>

                    <Col md={4} className="mx-auto">
                      <div className="text-center">
                        <small className="text-muted">
                          {this.props.t("Home.HIW_Y_SUBTEXT")} :
                        </small>
                      </div>
                      <div className="text-center block-s pb-1 px-1">
                        <p className="text-black pt-3 font-weight-bold px-2">
                          {this.props.t("Home.HIW_Y_HEAD")}
                        </p>
                      </div>
                      <div className="pl-2 mt-2">
                        <ul class="list-unstyled">
                          <li> {this.props.t("Home.HIW_Y_ONE")}</li>
                          <li> {this.props.t("Home.HIW_Y_TWO")}</li>
                          <li>{this.props.t("Home.HIW_Y_THREE")}</li>
                        </ul>
                      </div>
                    </Col>

                    <Col md={4} className="mx-auto">
                      <div className="text-center">
                        <small className="text-muted">
                          {this.props.t("Home.HIW_Z_SUBTEXT")} :
                        </small>
                      </div>
                      <div className="text-center block-s pb-1 rtl-pb px-1">
                        <p className="text-black pt-3 font-weight-bold m-c-height">
                          {this.props.t("Home.HIW_Z_HEAD")}
                        </p>
                      </div>
                      <div className="pl-2 mt-2">
                        <ul class="list-unstyled mr-3">
                          <li> {this.props.t("Home.HIW_Z_ONE")}</li>
                          <li> {this.props.t("Home.HIW_Z_TWO")}</li>
                          <li>{this.props.t("Home.HIW_Z_THREE")}</li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </Element>

          <div class="rst-scroll-down text-center hidden-xs hidden-sm">
            <Link
              to="claim360"
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
            >
              <img src={DownArrow} alt="scroll down" width="5%" />
            </Link>
          </div>
          {/* section 4 */}

          <Element name="claim360">
            <Container fluid className="bg-box mt-3" id="section4">
              <Row className="py-2" id="claim-process">
                <Col md={11} className="mx-auto sudo-img">
                  <Card className="px-5 b-card  card-shadow card-border">
                    <Col md={6} className="mx-auto box-rl">
                      <div className="text-center dir-rtl">
                        <h6 className="text-black p-3 font-weight-bold block-s">
                          {this.props.t("Home.PROCESSING_CLAIM")} :
                        </h6>
                      </div>
                    </Col>
                    <div className="c-mt pb-5">
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <img
                              src={featureImg}
                              width="90%"
                              className="img-fluid"
                              alt="image"
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3 c-hx txt-rtl">
                            <h6>
                              {" "}
                              {this.props.t("Home.PROCESSING_CLAIM_SUB")}
                            </h6>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Element>

          <div class="rst-scroll-down text-center hidden-xs hidden-sm">
            <Link
              to="oncfFigure"
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
            >
              <img src={DownArrow} alt="scroll down" width="5%" />
            </Link>
          </div>
          {/* section 5 */}
          <Element name="oncfFigure">
            <Container fluid className="bg-box mt-3 " id="section5">
              <Row className="py-2" id="claim-process">
                <Col md={11} className="mx-auto ">
                  <div className="stats-bg mb-3">
                    <Row>
                      <Col md={12}>
                        <div className="text-center mt-5 mb-3">
                          <h6 className="text-light p-3 font-weight-bold rtl-d ">
                            {this.props.t("Home.ONCF_IN_FIGURES")} :
                          </h6>
                          <small className="text-light ">
                            {this.props.t("Home.ONCF_SUBT")}
                          </small>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-inline-flex">
                          <img src={imgOne} className="img-fluid" alt="image" />
                          <div className="text-l">
                            <h4 className="bold">100,000</h4>
                            <p className="">
                              {this.props.t("Home.TRAVELERS_PER_DAY")}
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-inline-flex">
                          <img src={imgTwo} className="img-fluid" alt="image" />
                          <div className="text-l">
                            <h4 className="bold">218</h4>
                            <p className="">
                              {this.props.t("Home.TRAVEL_TRAINS_PER_DAY")}
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-inline-flex">
                          <img
                            src={imgThree}
                            className="img-fluid"
                            alt="image"
                          />{" "}
                          <div className="text-l">
                            <h4 className="bold">74 %</h4>
                            <p className="">
                              {this.props.t("Home.SATISFIED_CUSTOMERS")}
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </Element>

          {/* section 6 */}
          <Element name="">
            <Container fluid className="bg-box mt-5 ">
              <Row className="py-2" id="claim-process">
                <Col md={11} className="mx-auto">
                  <Card className="px-5 b-card card-shadow card-border">
                    <Col className="mx-auto box-rl col-md-auto">
                      <div className="text-center dir-rtl">
                        <h6 className="text-black p-3 font-weight-bold block-s">
                          {this.props.t("Home.SUPPORT_HEADING")} :
                        </h6>
                      </div>
                    </Col>
                    <div className="">
                      <Row>
                        <Col md={4}>
                          <div className="mb-3 text-center">
                            <img
                              src={oncfAgents}
                              className="img-fluid img-c"
                              alt="image"
                              width="90%"
                            />
                          </div>
                        </Col>
                        <Col md={8} className="">
                          <div className="right-margin">
                            <blockquote>
                              <p className="bold p-text c-r mt-4 p-5 text-center">
                                {this.props.t("Home.SUPPORT_PARA")} <br />
                                {this.props.t("Home.SUPPORT_ONE")} <br />
                                {this.props.t("Home.SUPPORT_TWO")} <br />
                                {this.props.t("Home.SUPPORT_THREE")}
                              </p>
                            </blockquote>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Element>
          <div class="rst-scroll-down text-center hidden-xs hidden-sm">
            <Link
              to="lostObject"
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
            >
              <img src={DownArrow} alt="scroll down" width="5%" />
            </Link>
          </div>

          {/* section 7 */}
          <Element name="lostObject">
            <Container fluid className="bg-box mt-3" id="section7">
              <Row className="py-2">
                <Col md={11} className="mx-auto">
                  <Card className="px-5 b-card card-shadow card-border">
                    <Col md={3} className="mx-auto box-rl">
                      <div className="text-center ">
                        <h6 className="text-black p-3 font-weight-bold block-s">
                          {this.props.t("Home.LOST_OBJECTS")} :
                        </h6>
                      </div>
                    </Col>
                    <div className=" pb-5">
                      <Row>
                        <Col md={4}>
                          <div className="mb-3 text-center img-obj">
                            <img
                              src={objetsPerdus}
                              className="img-fluid"
                              alt="image"
                              width="75%"
                            />
                          </div>
                        </Col>
                        <Col md={8}>
                          <div className="p-5 rm-p-mobile">
                            <ul className="list-unstyled mt-5">
                              <li>{this.props.t("Home.LOST_OBJECTS_PARA")}</li>
                              <li className="mt-5">
                                {this.props.t("Home.LOST_ONE")}
                                {""}
                              </li>
                              <li>
                                {this.props.t("Home.LOST_TWO")}
                                {""}
                              </li>
                              <li>{this.props.t("Home.LOST_THREE")} </li>
                              <li>
                                {this.props.t("Home.LOST_FOUR")}
                                {""}
                              </li>
                              <li>
                                {this.props.t("Home.LOST_FIVE")}
                                {""}
                              </li>
                              <li className="mt-5">
                                {this.props.t("Home.LOST_PARA")}
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Element>
          {/* section 7 */}
          <section className="mt-5">
            <Container fluid className="bg-box mt-4 ">
              <Row className="py-2" id="claim-process2">
                <Col md={11} className="mx-auto">
                  <Card className="px-5 b-card card-shadow card-border">
                    <Col className="mx-auto box-rl col-md-auto">
                      <div className="text-center ">
                        <h6 className="text-black p-3 font-weight-bold block-s">
                          {this.props.t("Home.WHAT_TARVELERS_SAY")} :
                        </h6>
                        <br />
                        <p className="text-center">
                          {this.props.t("Home.DO_YOU_HAVE_QUE")}
                        </p>
                      </div>
                    </Col>
                    <div className="mt-5 pb-5 rm-margin">
                      <Row className="mt-5">
                        <Col md={6} className="mx-auto">
                          <Card className="p-3 mx-3 card-border card-shadow s-card">
                            <h5>{this.props.t("Home.NAME1")}</h5>
                            <p className="text-muted">
                              {this.props.t("Home.NAME1_SUB")}
                            </p>
                            <br />
                            <p>{this.props.t("Home.NAME1_TEXT")}</p>
                          </Card>
                        </Col>
                        <Col md={6} className="mx-auto">
                          <Card className="p-3 mx-3 card-border card-shadow s-card">
                            <h5>{this.props.t("Home.NAME2")}</h5>
                            <p className="text-muted">
                              {this.props.t("Home.NAME2_SUB")}
                            </p>
                            <br />
                            <p>{this.props.t("Home.NAME2_TEXT")}</p>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>

          <div class="rst-scroll-down text-center hidden-xs hidden-sm">
            <Link
              to="faq"
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
            >
              <img src={DownArrow} alt="scroll down" width="5%" />
            </Link>
          </div>

          {/* section 9 */}
          <Element name="faq">
            <Container fluid className="bg-box mt-3" id="section9">
              <Row className="py-2" id="claim-process">
                <Col md={11} className="mx-auto">
                  <Card className="px-5 b-card card-shadow card-border">
                    <Col className="mx-auto box-rl col-md-auto dir-rtl">
                      <div className="text-center ">
                        <h6 className="text-black p-3 font-weight-bold block-s">
                          {this.props.t("Home.FAQ")} :
                        </h6>
                        <br />
                        <p className="text-center ">
                          {this.props.t("Home.FAQ_TEXT")}
                        </p>
                      </div>
                    </Col>
                    <div className="c-mt c-mt-mobile pb-5 txt-rtl">
                      <Row>
                        <Col md={4} className="mx-auto faq-card">
                          <div classname="faq-card mobile-r">
                            <h6 className="font-weight-bold text-black">
                              {" "}
                              {this.props.t("Home.LOST_OBJECT")}
                            </h6>
                            <small className="text-muted w-75">
                              {this.props.t("Home.COMPLAINT1")}
                            </small>
                            <Card className="p-3 mt-3 c1-h rounded-lg s-card card-border card-shadow">
                              <small className="text-black">
                                {this.props.t("Home.COMPLAINT1_TXT")}
                              </small>
                            </Card>
                          </div>
                        </Col>
                        <Col md={4} className="mx-auto faq-card">
                          <div classname="mobile-r">
                            <h6 className="font-weight-bold text-black">
                              {" "}
                              {this.props.t("Home.RAIL_TRAFFIC")}
                            </h6>
                            <small className="text-muted w-75">
                              {this.props.t("Home.COMPLAINT2")}
                            </small>
                            <Card className="p-3 mt-3 c1-h rounded-lg s-card card-border card-shadow">
                              <small className="text-black">
                                {this.props.t("Home.COMPLAINT2_TXT")}
                              </small>
                            </Card>
                          </div>
                        </Col>
                        <Col md={4} className="mx-auto faq-card">
                          <div classname="mobile-r">
                            <h6 className="font-weight-bold text-black">
                              {" "}
                              {this.props.t("Home.AFTER_SALES_SERVICE")}
                            </h6>
                            <small className="text-muted w-75">
                              {this.props.t("Home.COMPLAINT3")}
                            </small>
                            <Card className="p-3 mt-3 c1-h rounded-lg s-card card-border card-shadow">
                              <small className="text-black">
                                {this.props.t("Home.COMPLAINT3_TXT")}
                              </small>
                            </Card>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Element>
          <section className="mb-5">
            <Container>
              <Row></Row>
            </Container>
          </section>
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}
export default translate(HomeComponent);
