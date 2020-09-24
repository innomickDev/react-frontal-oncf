import React, { Fragment, Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import ObjectOne from "../../../assets/img/svg/OBJECTS-1.svg";
import ObjectTwo from "../../../assets/img/svg/OBJECTS-2.svg";
import ObjectThree from "../../../assets/img/svg/OBJECTS-3.svg";
import { translate } from "react-multi-lang";
import FooterComponent from "./Footer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class HowItWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
          <Container fluid className="bg-box mt-3 c-h">
            <Row className="py-2" id="claim-process">
              <Col md={8} className="mx-auto">
                <Card className="text-center">
                  <h6 className="text-light c-bg p-3 m-2 font-weight-bold">
                    {this.props.t("Home.PROCESS")} :
                  </h6>
                  <div className="m-4">
                    <p>{this.props.t("Home.PROCESS_TEXT")}</p>
                    <br />
                    <br />
                    <img src={ObjectOne} className="img-fluid" alt="hitw-1" />
                    <h6 className="font-weight-bold">
                      {this.props.t("Home.MAKE_ONLINE_CLAIM")}
                    </h6>
                    <p>{this.props.t("Home.MAKE_ONLINE_CLAIM_SUB")}</p>
                    <br />
                    <br />

                    <img src={ObjectTwo} className="img-fluid" alt="hitw-1" />
                    <h6 className="font-weight-bold">
                      {this.props.t("Home.FOLLOW_THE_PROCESSING_OF_CLAIMS")}
                    </h6>
                    <p>
                      {this.props.t("Home.FOLLOW_THE_PROCESSING_OF_CLAIMS_SUB")}
                    </p>
                    <br />
                    <br />

                    <img src={ObjectThree} className="img-fluid" alt="hitw-1" />
                    <h6 className="font-weight-bold">
                      {this.props.t("Home.CLAIM_PROCESSED")}
                    </h6>
                    <p>{this.props.t("Home.CLAIM_PROCESSED_SUB")}</p>
                    <br />
                  </div>
                </Card>
              </Col>
            </Row>
            <Row className="py-2">
              <Col md={8} className="mx-auto">
                <Card className="text-center">
                  <h6 className="text-light c-bg p-3 m-2 font-weight-bold">
                    {this.props.t("Home.HOW_IT_WORKS")} :
                  </h6>
                  <div className=" d-bg m-2" row>
                    <p className="text-light pt-3">
                      {this.props.t("Home.HIW_X_HEAD")}
                    </p>
                    <Col md={6} className="mx-auto text-left c-r">
                      <Card className="p-2">
                        {this.props.t("Home.HIW_X_ONE")}
                      </Card>
                      <Card className="p-2 mt-2 ">
                        {this.props.t("Home.HIW_X_TWO")}
                      </Card>
                      <Card className="p-2 mt-2 ">
                        {this.props.t("Home.HIW_X_THREE")}
                      </Card>
                      <Card className="p-2 mt-2 ">
                        {this.props.t("Home.HIW_X_FOUR")}
                      </Card>
                      <Card className="p-2 mt-2 mb-3">
                        {this.props.t("Home.HIW_X_FIVE")}
                      </Card>
                    </Col>
                  </div>
                  <div className=" c-bg m-2" row>
                    <p className="text-light pt-3">
                      {this.props.t("Home.HIW_Y_HEAD")}
                    </p>
                    <Col md={6} className="mx-auto text-left c-r">
                      <Card className="p-2">
                        {this.props.t("Home.HIW_Y_ONE")}
                      </Card>
                      <Card className="p-2 mt-2 ">
                        {this.props.t("Home.HIW_Y_TWO")}
                      </Card>
                      <Card className="p-2 mt-2 mb-3">
                        {this.props.t("Home.HIW_Y_THREE")}
                      </Card>
                    </Col>
                  </div>
                  <div className=" d-bg m-2" row>
                    <p className="text-light pt-3">
                      {this.props.t("Home.HIW_Z_HEAD")}
                    </p>
                    <Col md={6} className="mx-auto text-left c-r">
                      <Card className="p-2">
                        {this.props.t("Home.HIW_Z_ONE")}
                      </Card>
                      <Card className="p-2 mt-2 ">
                        {this.props.t("Home.HIW_Z_TWO")}
                      </Card>
                      <Card className="p-2 mt-2 mb-3">
                        {this.props.t("Home.HIW_Z_THREE")}
                      </Card>
                    </Col>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
          <FooterComponent />
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
export default translate(HowItWorks);
