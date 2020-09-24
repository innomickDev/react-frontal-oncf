import React, { Fragment, Component } from "react";
import { Row, Col } from "reactstrap";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";

class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <footer id="hide-footer" className="mainfooter fix-footer">
          <div className="footer-middle">
            <div className="container">
              <Row className=" mx-auto">
                <Col className="col-md-auto">
                  <div className="footer-pad">
                    {/* <h4>Heading 1</h4> */}
                    <ul className="list-unstyled">
                      <li>
                        <a href="javascript:void(0);">
                          {this.props.t("Home.CONTACT_2255")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-md-auto">
                  <div className="footer-pad">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="https://www.oncf.ma/OFFREDETRANSPORT/PAGES/TRAINSGRANDESLIGNES.ASPX"
                          target="_blank"
                        >
                          {this.props.t("Home.TRANSPORT_OFFER")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-md-auto">
                  <div className="footer-pad">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="https://www.oncf.ma/fr/ProduitsEtServices/Pages/DesProduitsPourTous.aspx"
                          taregt="_blank"
                        >
                          {this.props.t("Home.PRODUCT_&_SERVICE")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-md-auto">
                  <div className="footer-pad">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="https://www.oncf.ma/fr/InfosPratiques/Pages/CentredAppelsKetary.aspx"
                          target="_blank"
                        >
                          {this.props.t("Home.PRACTICAL_INFO")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-md-auto">
                  <div className="footer-pad">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="https://www.oncf.ma/fr/PrixEtReservation/Pages/BilletsNormaux.aspx"
                          target="_blank"
                        >
                          {this.props.t("Home.RESERVATION")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-md-auto">
                  <div className="footer-pad">
                    <ul className="list-unstyled">
                      <li>
                        <a href="javascript:void(0);">
                          {this.props.t("Home.FOLLOW_US_ON")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-md-auto d-inline-flex">
                  {/* <span>{this.props.t("Home.FOLLOW_US_ON")}</span> */}
                  <ul className="social-network social-circle">
                    <li>
                      <a
                        href="javascript:void(0);"
                        className="icoFacebook"
                        title="Facebook"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        className="icoLinkedin"
                        title="Linkedin"
                      >
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col className="col-md-12 cp-rht">
                  <p className="text-center">
                    &copy; Copyright 2020 - ONCF2255.ma - ONCF
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </footer>
      </Fragment>
    );
  }
}
export default compose(translate, withRouter)(FooterComponent);
