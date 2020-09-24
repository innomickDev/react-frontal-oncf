import React, { Fragment, Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import featureImg from "../../../assets/img/svg/feature.svg";
import { translate } from "react-multi-lang";
import FooterComponent from "./Footer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class ClaimsView extends Component {
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
                <Card className="text-center" row>
                  <h6 className="text-light c-bg p-3 m-2 font-weight-bold">
                    {this.props.t("Home.PROCESSING_CLAIM")} :
                  </h6>
                  <Col md={10} className="mx-auto">
                    <p> {this.props.t("Home.PROCESSING_CLAIM_SUB")}</p>
                    <div className="mb-3">
                      <img
                        src={featureImg}
                        width="40%"
                        className="img-fluid"
                        alt="image"
                      />
                    </div>
                  </Col>
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
export default translate(ClaimsView);
