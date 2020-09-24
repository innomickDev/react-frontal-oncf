import React, { Fragment, Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import objetsPerdus from "../../../assets/img/objets-perdus.png";
import { translate } from "react-multi-lang";
import FooterComponent from "./Footer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class LostObjects extends Component {
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
                <Card className="">
                  <h6 className="text-light c-bg p-3 m-2 font-weight-bold text-center">
                    {this.props.t("Home.LOST_OBJECTS")} :
                  </h6>
                  <Row>
                    <Col md={7} className="mx-auto">
                      <div className="p-5">
                        <p className="bold">
                          {this.props.t("Home.LOST_OBJECTS_PARA")}
                          <ol className=" text-left mt-2">
                            <li>{this.props.t("Home.LOST_ONE")}</li>
                            <li>{this.props.t("Home.LOST_TWO")}</li>
                            <li>{this.props.t("Home.LOST_THREE")}</li>
                            <li>{this.props.t("Home.LOST_FOUR")}</li>
                            <li>{this.props.t("Home.LOST_FIVE")}</li>
                          </ol>
                        </p>
                        <p>{this.props.t("Home.LOST_PARA")}</p>
                      </div>
                    </Col>
                    <Col md={5} className="mx-auto">
                      <div className="mb-3 text-center">
                        <img
                          src={objetsPerdus}
                          className="img-fluid"
                          alt="image"
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row className="py-2">
              <Col md={8} className="mx-auto c-r">
                <Card className="">
                  <h6 className="text-light c-bg p-3 m-2 font-weight-bold text-center">
                    {this.props.t("Home.WHAT_TARVELERS_SAY")} :
                  </h6>
                  <b className="text-center">
                    {this.props.t("Home.DO_YOU_HAVE_QUE")}
                  </b>
                  <Row className="p-4">
                    <Col md={6} className="mx-auto">
                      <Card className="p-3">
                        <h5>{this.props.t("Home.NAME1")}</h5>
                        <small>{this.props.t("Home.NAME1_SUB")}</small>
                        <br />
                        <p className="text-muted">
                          {this.props.t("Home.NAME1_TEXT")}
                        </p>
                      </Card>
                    </Col>
                    <Col md={6} className="mx-auto">
                      <Card className="p-3">
                        <h5>{this.props.t("Home.NAME2")}</h5>
                        <small>{this.props.t("Home.NAME2_SUB")}</small>
                        <br />
                        <p className="text-muted">
                          {this.props.t("Home.NAME2_TEXT")}
                        </p>
                      </Card>
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
export default translate(LostObjects);
