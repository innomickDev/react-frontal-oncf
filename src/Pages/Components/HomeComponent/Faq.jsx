import React, { Fragment, Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { translate } from "react-multi-lang";
import FooterComponent from "./Footer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Faq extends Component {
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
              <Col md={8} className="mx-auto c-r">
                <Card className="">
                  <h6 className="text-light c-bg p-3 m-2 font-weight-bold text-center">
                    {this.props.t("Home.FAQ")} :
                  </h6>
                  <b className="text-center">{this.props.t("Home.FAQ_TEXT")}</b>
                  <Row className="p-4">
                    <Col md={4} className="mx-auto">
                      <Card className="p-3">
                        <small className="text=muted">
                          {this.props.t("Home.LOST_OBJECT")}
                        </small>
                        <h6>{this.props.t("Home.COMPLAINT1")}</h6>
                        <br />
                        <p className="text-muted">
                          {this.props.t("Home.COMPLAINT1_TXT")}
                        </p>
                      </Card>
                    </Col>
                    <Col md={4} className="mx-auto">
                      <Card className="p-3">
                        <small className="text=muted">
                          {this.props.t("Home.RAIL_TRAFFIC")}
                        </small>
                        <h6>{this.props.t("Home.COMPLAINT2")}</h6>
                        <br />
                        <p className="text-muted">
                          {this.props.t("Home.COMPLAINT2_TXT")}
                        </p>
                      </Card>
                    </Col>
                    <Col md={4} className="mx-auto">
                      <Card className="p-3">
                        <small className="text=muted">
                          {this.props.t("Home.AFTER_SALES_SERVICE")}
                        </small>
                        <h6>{this.props.t("Home.COMPLAINT3")}</h6>
                        <br />
                        <p className="text-muted">
                          {this.props.t("Home.COMPLAINT3_TXT")}
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
export default translate(Faq);
