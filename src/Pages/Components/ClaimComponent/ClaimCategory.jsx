import React, { Fragment } from "react";
import classnames from "classnames";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { AvForm, AvField } from "availity-reactstrap-validation";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import _ from "lodash";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  FormGroup,
  Container,
  CardHeader,
  Label,
  FormText,
} from "reactstrap";
import { getCategories } from "../../../actions/categoryAction";
import { getSubCategories } from "../../../actions/subCategoryAction";
import { getSubSubCategories } from "../../../actions/subSubCategoryAction";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Footer from "../HomeComponent/Footer";
import {
  showSuccess,
  showError,
  getBase64,
  getLangBasedItems,
} from "../../Helpers/utils";
import {
  renderTextField,
  renderSelectField,
} from "../../Common/RenderTextField";
import { addClaim } from "../../../actions/claimAction";
import MainLoader from "../../Common/Loader";
class ClaimCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showSubSubCategory: false,
      mainLoader: true,
    };
  }
  componentDidMount = () => {
    this.props.dispatch(getCategories());
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.getCategoriesData &&
      nextProps.getCategoriesData !== this.props.getCategoriesData
    ) {
      this.setState({
        getCategoriesData: nextProps.getCategoriesData,
        mainLoader: false,
      });
    }
    if (
      nextProps.subCategoryDataByCategory &&
      nextProps.subCategoryDataByCategory !==
      this.props.subCategoryDataByCategory
    ) {
      this.setState({
        subCategoryDataByCategory: nextProps.subCategoryDataByCategory,
        mainLoader: false,
      });
    }
    if (
      nextProps.subSubCategoryDataBySubCategory &&
      nextProps.subSubCategoryDataBySubCategory !==
      this.props.subSubCategoryDataBySubCategory
    ) {
      this.setState({
        subSubCategoryDataBySubCategory:
          nextProps.subSubCategoryDataBySubCategory,
        mainLoader: false,
      });
    }
    if (
      nextProps.addAgentClaimData &&
      nextProps.addAgentClaimData !== this.props.addAgentClaimData
    ) {
      showSuccess(this.props.t("Common.ADD_SUCCESS"));
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.addAgentClaimDataError &&
      nextProps.addAgentClaimDataError !== this.props.addAgentClaimDataError
    ) {
      showError(nextProps.addAgentClaimDataError);
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.addClaimData &&
      nextProps.addClaimData !== this.props.addClaimData
    ) {

      this.setState({
        loading: false,
      });
      localStorage.removeItem("claimData");
      localStorage.removeItem("trainDetails");
      this.props.history.push(
        `/frontOffice/claim-details/${nextProps.addClaimData.code}`
      );

      showSuccess(this.props.t("Claim.CLAIM_SUCCESS"));
    }
    if (
      nextProps.addClaimDataError &&
      nextProps.addClaimDataError !== this.props.addClaimDataError
    ) {
      this.setState({
        loading: false,
      });
      showError(nextProps.addClaimDataError);
      // showError(this.props.t("ErrorMsg.NO_DATA_ADDED"));
    }
    if (
      nextProps.subCategoryDataByCategoryError &&
      nextProps.subCategoryDataByCategoryError !==
      this.props.subCategoryDataByCategoryError
    ) {
      // showError(this.props.t("ErrorMsg.NO_SUB_CATEGORY"));
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.subSubCategoryError &&
      nextProps.subSubCategoryError !== this.props.subSubCategoryError
    ) {
      // showError(this.props.t("ErrorMsg.NO_SUB_SUB_CATEGORY"));
      this.setState({
        loading: false,
      });
    }
  };

  /*common function to show categories */
  showOptions = (data) => {
    // console.log(data);
    if (data && data.length) {
      return data.map((categories, key) => {
        return (
          <option value={categories.value} key={key}>
            {categories.label}
          </option>
        );
      });
    }
  };
  // get sub category by categoryID
  getSubCategoriesByCategory = (e) => {
    // console.log(e.target.value);
    if (e.target.value !== "0") {
      // console.log(this.state.getCategoriesData);
      const category = _.find(this.state.getCategoriesData.categoryClients, {
        code: e.target.value,
      });
      // console.log(category);
      this.setState({ showSubSubCategory: category.isRequiredSubSubCategory });
      // console.log(category);
      this.props.dispatch(getSubCategories(e.target.value));
    } else {
      this.setState({
        getSubCategoriesByCategory: [],
      });
    }
  };
  //get Sub Sub-Category BY SubCategoryID
  getSubSubCategoryBYSubCategory = (e) => {
    this.props.dispatch(getSubSubCategories(e.target.value));
    // console.log(e.target.value);
  };
  handleClick = () => {
    this.refs.fileInput.click();
  };
  /**call this function to select file (upload file) */
  handleFileChange = (e) => {
    this.currentFile = e.target.files[0].name;
    const extensions = ["jpg", "jpeg", "bmp", "gif", "png", "pdf"];
    const fileExtension = e.target.files[0].name.split(".").pop();
    const fileSize = e.target.files[0].size;
    if (
      fileSize < 1000000 &&
      extensions.includes(fileExtension.toLowerCase())
    ) {
      getBase64(e.target.files[0], (result) => {
        this.setState({ currentPath: result });
      });
    } else {
      showError(this.props.t("Common.FILE_ERROR"));
    }
  };

  onSubmit = (formProps) => {
    if (
      formProps.categoryId &&
      formProps.subcategory &&
      formProps.objectOfClaim
    ) {
      const trainDetails = JSON.parse(localStorage.getItem("trainDetails"));
      // const userDetails = JSON.parse(localStorage.getItem("foUserDetails"));
      const userProfile = JSON.parse(localStorage.getItem("foUserProfile"));
      // console.log(trainDetails);
      this.setState({ loading: true });
      const claimData = {
        departureStationCode: trainDetails.departureStation,
        arrivalStationCode: trainDetails.arrivalStation,
        trainNumber: trainDetails.trainNumber,
        travelDate: `${moment(new Date(trainDetails.selectedDate).getTime())}`,
        categoryCode: formProps.categoryId,
        subCategoryCode: formProps.subcategory,
        //todo
        claimSubject: formProps.objectOfClaim,
        claimDetails: formProps.bodyOfClaim,
        claimAttachment: this.state.currentPath
          ? this.state.currentPath.split(",")[1]
          : "",
        ticketAttachment: trainDetails.currentPath.split(",")[1],
        isONCFUser: formProps.isONCFUser,

        userEmail: userProfile.data.login,
        // userFullName: userDetails.data.userName,
        userCode: userProfile.data.codeClient,
      };
      // console.log(formProps.subSubCategory);
      if (formProps.subSubCategory) {
        claimData.subSubCategoryCode = formProps.subSubCategory;
      }
      // console.log(claimData);

      // console.log(claimData);
      //localStorage.setItem("claimData", JSON.stringify(claimData));
      this.props.dispatch(addClaim(claimData, this.formValue));

    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      this.setState({ loading: false });
    }
  };
  render() {
    const { handleSubmit } = this.props;
    const Checkbox = ({ input, meta: { touched, error } }) => (
      <div style={{ border: touched && error ? "1px solid red" : "none" }}>
        <input type="checkbox" {...input} />
        <label>{this.props.t("Common.IS_ONCF_USER")}</label>
      </div>
    );
    // console.log(this.state.getCategoriesData);
    return (
      <Fragment>
        <MainLoader className="text-center" loading={this.state.mainLoader} />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Container fluid className="claim-block c-h claim-bg">
            <Row className="">
              <Col md={5} className="mx-auto">
                <Card className="main-card mb-3 claim-card card-shadow">
                  <CardHeader className="c-header">
                    <Row className="text-center w-100 text-light">
                      <Col className="col-md-auto">
                        <i
                          className="float-left fas fa-arrow-circle-left fa-2x py-3"
                          title="Back"
                          onClick={(e) => this.props.history.goBack()}
                        ></i>
                        &nbsp;
                      </Col>
                      <Col className="col-md-auto">
                        <h5 className=" text-canter py-3  font-weight-bold rounded">
                          {this.props.t("Category.CHOOSE_CATEGORY")}
                        </h5>
                      </Col>
                    </Row>
                  </CardHeader>
                  {/* <CardBody> */}
                  <Card className="pt-2">
                    <AvForm
                      className=" my-2"
                      noValidate
                      onSubmit={handleSubmit(this.onSubmit)}
                    >
                      <Row>
                        <Col md={8} className="mx-auto">
                          <div>
                            <FormGroup>
                              <Label>
                                {this.props.t("Common.CATEGORY") + "*"}
                              </Label>
                              <Field
                                component={renderSelectField}
                                className="form-control"
                                name="categoryId"
                                type="select"
                                id="selectField"
                                required
                                onChange={(e) =>
                                  this.getSubCategoriesByCategory(e)
                                }
                              >
                                <option value="0">
                                  {this.props.t("Category.CATEGORY")}
                                </option>
                                {this.showOptions(
                                  this.state.getCategoriesData
                                    ? getLangBasedItems(
                                      this.state.getCategoriesData
                                        .categoryClients
                                    )
                                    : null
                                )}
                              </Field>
                            </FormGroup>
                            <FormGroup>
                              <Label for="examplePassword">
                                {this.props.t("Category.SUB_CATEGORY")}
                              </Label>
                              <Field
                                name="subcategory"
                                type="select"
                                component={renderSelectField}
                                placeholder={""}
                                className="form-control"
                                id="subCategoryId"
                                onChange={(e) =>
                                  this.getSubSubCategoryBYSubCategory(e)
                                }
                              >
                                <option value="0">
                                  {this.props.t("Category.S_SUB_CATEGORY")}
                                </option>
                                {this.showOptions(
                                  this.state.subCategoryDataByCategory
                                    ? getLangBasedItems(
                                      this.state.subCategoryDataByCategory
                                        .subCategoryClients
                                    )
                                    : null
                                )}
                              </Field>
                            </FormGroup>
                            {this.state.showSubSubCategory && (
                              <FormGroup>
                                <Label for="examplePassword">
                                  {this.props.t("Category.SUB_SUB_CATEGORY")}
                                </Label>
                                <Field
                                  name="subSubCategory"
                                  type="select"
                                  component={renderSelectField}
                                  placeholder={""}
                                  className="form-control"
                                >
                                  <option value="0">
                                    {this.props.t(
                                      "Category.S_SUB_SUB_CATEGORY"
                                    )}
                                  </option>
                                  {this.showOptions(
                                    this.state.subSubCategoryDataBySubCategory
                                      ? getLangBasedItems(
                                        this.state
                                          .subSubCategoryDataBySubCategory
                                          .subSubCategoryClients
                                      )
                                      : ""
                                  )}
                                </Field>
                              </FormGroup>
                            )}

                            <FormGroup>
                              <AvField
                                name="objectOfClaim"
                                tag={Field}
                                component={renderTextField}
                                label={this.props.t("Category.CLAIM_OBJECT")}
                                type="text"
                                validate={{
                                  required: {
                                    value: true,
                                    errorMessage: this.props.t(
                                      "ErrorMsg.CLAIM_SUBJECT_ERROR"
                                    ),
                                  },
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <AvField
                                name="bodyOfClaim"
                                tag={Field}
                                component={"textarea"}
                                label={this.props.t("Category.CLAIM_BODY")}
                                type="textarea"
                                className="form-control"
                              />
                            </FormGroup>
                            <FormGroup>
                              <div>
                                <label
                                  className="file-upload__label"
                                  onClick={() => this.handleClick()}
                                >
                                  <i className="fa fa-paperclip text-dark"></i>
                                  <span className=" text-dark">
                                    &nbsp; {this.props.t("Claim.FILE_ATTACH")}
                                  </span>
                                </label>
                                <input
                                  type="file"
                                  name="file"
                                  id="file"
                                  ref="fileInput"
                                  multiple
                                  className="CiList-inputs form-control-file"
                                  onChange={(e) => this.handleFileChange(e)}
                                  style={{ display: "none" }}
                                />{" "}
                              </div>
                              <span>{this.currentFile}</span>
                            </FormGroup>
                            <FormGroup>
                              <Field
                                type="checkbox"
                                name="isONCFUser"
                                component={Checkbox}
                              />
                              {/* </AvCheckboxGroup> */}
                            </FormGroup>

                            <FormText color="muted text-center">
                              {this.props.t("Claim.MAX_SIZE")}
                            </FormText>
                            <div className="text-center my-2">
                              <SubmitBtnLoader
                                label={this.props.t("Claim.SEND")}
                                className="btn btn-lg btn-primary px-5 btn-pill"
                                loading={this.state.loading}
                                submitting={""}
                                type="submit"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </AvForm>
                  </Card>
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
        <Footer />
      </Fragment>
    );
  }
}
ClaimCategory = reduxForm({
  form: "mainForm",
})(ClaimCategory);
function mapStateToProps(state) {
  // console.log(state.Category.getCategoriesData);
  return {
    getCategoriesData: state.Category.getCategoriesData,
    subCategoryDataByCategory: state.SubCategory.subCategoryDataByCategory,
    subSubCategoryDataBySubCategory:
      state.SubSubCategory.subSubCategoryDataBySubCategory,
    addClaimData: state.Claim.addClaimData,

    addClaimDataError: state.Claim.addClaimDataError,
    subCategoryDataByCategoryError:
      state.SubCategory.subCategoryDataByCategoryError,
    subSubCategoryError: state.SubSubCategory.subSubCategoryError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimCategory);
