import React, { Fragment, Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import imgOne from "../../../assets/img/svg/Grp201.svg";
import imgTwo from "../../../assets/img/svg/Grp202.svg";
import imgThree from "../../../assets/img/svg/Grp203.svg";
import oncfAgents from "../../../assets/img/oncf-agents.png";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import FooterComponent from "./Footer";

class OncfFigure extends Component {
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
            <Row className="py-2">
              <Col md={8} className="mx-auto">
                <Card className="text-center">
                  <h6 className="text-light c-bg p-3 m-2 font-weight-bold">
                    {this.props.t("Home.ONCF_IN_FIGURES")} :
                  </h6>
                  <p>{this.props.t("Home.ONCF_SUBT")}</p>
                  <Row>
                    <Col md={4}>
                      <div>
                        <img src={imgOne} className="img-fluid" alt="image" />
                        <p className="bold">
                          {this.props.t("Home.TRAVELERS_PER_DAY")}
                        </p>
                        <h4 className="bold">100,000</h4>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div>
                        <img src={imgTwo} className="img-fluid" alt="image" />
                        <p className="bold">
                          {this.props.t("Home.TRAVEL_TRAINS_PER_DAY")}
                        </p>
                        <h4 className="bold">218</h4>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div>
                        <img src={imgThree} className="img-fluid" alt="image" />
                        <p className="bold">
                          {this.props.t("Home.SATISFIED_CUSTOMERS")}
                        </p>
                        <h4 className="bold">74 %</h4>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row className="py-2">
              <Col md={8} className="mx-auto">
                <Card className="">
                  <h6 className="text-light c-bg p-3 m-2 font-weight-bold text-center">
                    {this.props.t("Home.SUPPORT_HEADING")} :
                  </h6>
                  <Row>
                    <Col md={4} className="">
                      <div className="mb-3 text-center">
                        <img
                          src={oncfAgents}
                          className="img-fluid"
                          alt="image"
                        />
                      </div>
                    </Col>
                    <Col md={7} className="">
                      <div className="p-4">
                        <p className="bold c-r">
                          {this.props.t("Home.SUPPORT_PARA")}
                          <ul className="list-unstyled text-left mt-2">
                            <li>
                              <i className="fa fa-star" />
                              &nbsp;{this.props.t("Home.SUPPORT_ONE")}
                            </li>
                            <li>
                              <i className="fa fa-star" />
                              &nbsp;{this.props.t("Home.SUPPORT_TWO")}
                            </li>
                            <li>
                              <i className="fa fa-star" />
                              &nbsp;{this.props.t("Home.SUPPORT_THREE")}
                            </li>
                          </ul>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
        <FooterComponent />
      </Fragment>
    );
  }
}
export default translate(OncfFigure);
