import React, { Fragment, Component } from "react";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import {
  renderTextField,
  renderSelectField,
} from "../../Common/RenderTextField";
import {
  AvForm,
  AvField,
  // AvCheckboxGroup,
  // AvCheckbox
} from "availity-reactstrap-validation";
import FormInput from "../../Common/FormInput";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import moment from "moment";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  FormText,
} from "reactstrap";
import Logo from "../../../assets/img/svg/LOGO.svg";
import DatePickerComponent from "../../Common/Datepicker";
import { addClaim } from "../../../actions/claimAction";
import { getStations } from "../../../actions/stationAction";
import { getCategories } from "../../../actions/categoryAction";
import { getSubCategories } from "../../../actions/subCategoryAction";
import { getSubSubCategories } from "../../../actions/subSubCategoryAction";
import {
  showSuccess,
  showError,
  getBase64,
  getLangBasedItems,
  getLangBasedStations,
  PHONE_REGEX,
} from "../../Helpers/utils";
import _ from "lodash";
import Footer from "../HomeComponent/Footer";
import MainLoader from "../../Common/Loader";
import { parseJSON } from "date-fns";

class ClaimComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoader: true,
      loading: false,
      showSubSubCategory: false,
      showPageOne: true,
      showPageTwo: false,
    };
  }

  componentDidMount = () => {
    this.props.dispatch(getStations());
    this.props.dispatch(getCategories());
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.stationList &&
      nextProps.stationList !== this.props.stationList
    ) {
      this.setState({
        stationList: nextProps.stationList,
        arrivalStation: nextProps.stationList,
        mainLoader: false,
      });
    }
    
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
      console.log(nextProps.subCategoryDataByCategory.length)
      console.log(nextProps.subCategoryDataByCategory)
      
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
      localStorage.setItem(
        "claimId",
        JSON.stringify(nextProps.addClaimData.code)
      );
      this.setState({
        loading: false,
      });
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
  /*call this function to show list stations(depatcher and arrival) */
  showStations = (data) => {
    // console.log(data);
    if (data && data.length) {
      return data.map((station, key) => {
        return (
          <option value={station.value} key={key}>
            {station.label}
          </option>
        );
      });
    }
  };
  getDepatureStationId = (e) => {
    // console.log(e.target.value);
  };
  /*common function to show categories */
  showOptions = (data) => {
    console.log(data);
    console.log(data && data.length)
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
    if (e.target.value !== "0") {
      const category = _.find(this.state.getCategoriesData.categoryClients, {
        code: e.target.value,
      });
      this.setState({ showSubSubCategory: category.isRequiredSubSubCategory });
      // console.log(category);
      this.props.dispatch(getSubCategories(e.target.value));
        // this.getSubSubCategoryBYSubCategory(e);
        this.setState({
          subCategoryDataByCategory:[],
          subSubCategoryDataBySubCategory:[]
        })
    } else {
      this.setState({
        getSubCategoriesByCategory: [],
      });
    }
  };
  //get Sub Sub-Category BY SubCategoryID
  getSubSubCategoryBYSubCategory = (e) => {
    if(e.target.event !== "0") {
          this.props.dispatch(getSubSubCategories(e.target.value));
          this.setState({
            subSubCategoryDataBySubCategory:[]
          })

      } else {
        this.setState({
            getSubSubCategoryBYSubCategory: []
        });
    }
  };

  /**call this function to click file input */
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
        this.setState({ currentTicketPath: result });
      });
    } else {
      showError(this.props.t("Common.FILE_ERROR"));
    }
  };

  // For update claim
  handleRefs = () => {
    this.refs.claimFileInput.click();
  };

  handleClaimFileChange = (e) => {
    this.currentClaimFile = e.target.files[0].name;
    const extensions = ["jpg", "jpeg", "bmp", "gif", "png", "pdf"];
    const fileExtension = e.target.files[0].name.split(".").pop();
    const fileSize = e.target.files[0].size;
    if (
      fileSize < 1000000 &&
      extensions.includes(fileExtension.toLowerCase())
    ) {
      getBase64(e.target.files[0], (result) => {
        this.setState({ currentClaimPath: result });
      });
    } else {
      showError(this.props.t("Common.FILE_ERROR"));
    }
  };

  getselectedData = (props) => {
    // console.log(props);
    this.setState({ selectedDate: props });
  };

  // Managing page
  nextPage = (formProps) => {
    console.log(formProps);
    const selectedDate = `${moment(
      new Date(this.state.selectedDate).getTime()
    )}`;
    if (formProps.arrivalStation === formProps.departureStation) {
      showError(this.props.t("Claim.PAGE_ALERT"));
    } else if (
      formProps.departureStation &&
      formProps.arrivalStation &&
      formProps.trainNumber
      // PHONE_REGEX.test(formProps.trainNumber.trim()) &&
      // selectedDate &&
      // this.state.currentTicketPath
    ) {
      this.setState({
        showPageOne: false,
        showPageTwo: true,
      });
    }
  };
  previousPage = () => {
    this.setState({
      showPageOne: true,
      showPageTwo: false,
    });
  };

  onSubmit = (formProps) => {
    console.log(formProps, formProps.isFinalPage);
    if (formProps.isFinalPage) {
      const userProfile = JSON.parse(localStorage.getItem("foUserProfile"));
      console.log(userProfile);
      const selectedDate = this.state.selectedDate
        ? this.state.selectedDate
        : new Date();

      console.log(selectedDate);
      if (
        formProps.values.arrivalStation === formProps.values.departureStation
      ) {
        showError(this.props.t("Claim.PAGE_ALERT"));
      } else {
        // const currentDate = new Date();
        console.log("test");
        if (
          formProps.values.departureStation &&
          formProps.values.arrivalStation &&
          formProps.values.trainNumber &&
          formProps.values.trainNumber.trim() &&
          selectedDate &&
          this.state.currentTicketPath &&
          formProps.values.categoryId &&
          formProps.values.subcategory &&
          formProps.values.objectOfClaim
        ) {
          const claimData = {
            // page1 data
            departureStationCode: formProps.values.departureStation
              ? formProps.values.departureStation
              : null,
            arrivalStationCode: formProps.values.arrivalStation
              ? formProps.values.arrivalStation
              : null,
            // travelDate: selectedDate
            //   ? selectedDate
            //   : String(currentDate.getTime()),
            travelDate: `${moment(new Date(selectedDate).getTime())}`,
            trainNumber: formProps.values.trainNumber,
            ticketAttachment: this.state.currentTicketPath
              ? this.state.currentTicketPath.split(",")[1]
              : "",

            //  page2 data
            categoryCode: formProps.values.categoryId,
            subCategoryCode: formProps.values.subcategory,
            claimSubject: formProps.values.objectOfClaim,
            claimDetails: formProps.values.bodyOfClaim,
            claimAttachment: this.state.currentClaimPath
              ? this.state.currentClaimPath.split(",")[1]
              : "",
            isONCFUser: formProps.values.isONCFUser,
            userEmail: userProfile.data.login,
            userCode: userProfile.data.codeClient,
          };
          if (formProps.values.subSubCategory) {
            claimData.subSubCategoryCode = formProps.values.subSubCategory;
          }

          console.log(claimData);
          // localStorage.setItem("claimData", JSON.stringify(claimData));
          this.props.dispatch(addClaim(claimData));
          this.setState({ loading: true });
        } else {
          showError(this.props.t("ErrorMsg.TEXT_ONLY"));
          this.setState({ loading: false });
        }
      }
    } else {
      console.log(formProps, "test two");
      const selectedDate = this.state.selectedDate
        ? this.state.selectedDate
        : new Date();
      if (
        formProps.values.arrivalStation === formProps.values.departureStation
      ) {
        showError(this.props.t("Claim.PAGE_ALERT"));
      } else if (
        formProps.values.departureStation &&
        formProps.values.arrivalStation &&
        formProps.values.trainNumber &&
        selectedDate &&
        this.state.currentTicketPath
      ) {
        this.setState({
          showPageOne: false,
          showPageTwo: true,
        });
      } else {
        showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      }
    }
    // const yesterday = moment(new Date()).subtract(1, "day");
  };

  render() {
    // console.log(this.state.currentTicketPath);
    // console.log(this.state.currentClaimPath);
    const { handleSubmit, pristine, submitting } = this.props;
    const Checkbox = ({ input, meta: { touched, error } }) => (
      <div style={{ border: touched && error ? "1px solid red" : "none" }}>
        <input type="checkbox" {...input} />
        <label>{this.props.t("Common.IS_ONCF_USER")}</label>
      </div>
    );
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
          <Container fluid className="claim-block c-h h-max-claim">
            <Row className="mt-5">
              <Col md={5} className="mx-auto">
                <Card className="main-card claim-card card-shadow">
                  <CardHeader className="c-header">
                    <Row className="text-center w-100 text-light">
                      <Col className="col-md-12">
                        <h5 className=" text-canter py-3 font-weight-bold rounded">
                          {this.props.t("Claim.CLAIM_HEADER")}
                        </h5>
                      </Col>
                    </Row>
                  </CardHeader>

                  <p className="text-center mt-1">
                    {this.props.t("Claim.PROCESS_CLAIM")}
                  </p>
                  {/* <div className="text-center">
                  <h6 className="text-light d-bg p-3 m-3 font-weight-bold rounded">
                    {this.props.t("Claim.CLAIM_HEADER")}
                  </h6>
                  <p>{this.props.t("Claim.PROCESS_CLAIM")}</p>
                </div> */}
                  <AvForm
                    className=""
                    noValidate
                  // onSubmit={handleSubmit(this.onSubmit)}
                  // model={this.props.initialValues}
                  >
                    <Row>
                      {/* Page 1 */}
                      {this.state.showPageOne && (
                        <Col md={9} className="mx-auto">
                          <div>
                            <FormGroup>
                              <Label for="examplePassword">
                                {this.props.t("Claim.DEPATURE_STN")}
                              </Label>
                              <Field
                                name="departureStation"
                                type="select"
                                label={"Departure station *"}
                                component={renderSelectField}
                                placeholder={""}
                                className="form-control"
                                onChange={(e) => this.getDepatureStationId(e)}
                              // validate={[required]}
                              >
                                <option value="">
                                  {this.props.t("Claim.PLEASE_SELECT_STN")}
                                </option>
                                {this.showStations(
                                  this.state.stationList
                                    ? getLangBasedStations(
                                      this.state.stationList.listGare
                                    )
                                    : null
                                )}
                              </Field>
                              {/*  */}
                            </FormGroup>
                            <FormGroup>
                              <Label for="examplePassword">
                                {this.props.t("Claim.ARRIVAL_STN")}
                              </Label>
                              <Field
                                name="arrivalStation"
                                type="select"
                                component={renderSelectField}
                                placeholder={""}
                                className="form-control"
                              // validate={[required]}
                              >
                                <option value="">
                                  {this.props.t("Claim.PLEASE_SELECT_STN")}
                                </option>
                                {this.showStations(
                                  this.state.stationList
                                    ? getLangBasedStations(
                                      this.state.stationList.listGare
                                    )
                                    : null
                                )}
                              </Field>
                            </FormGroup>

                            <FormGroup>
                              <AvField
                                name="trainNumber"
                                tag={Field}
                                component={renderTextField}
                                label={this.props.t("Claim.TRAIN_NUMBER")}
                                type="text"
                                validate={{
                                  required: {
                                    value: true,
                                    errorMessage: this.props.t(
                                      "ErrorMsg.TRAIN_NUMBER_ERROR"
                                    ),
                                  },
                                  // pattern: {
                                  //   value: "^[0-9]+$",
                                  //   errorMessage: this.props.t(
                                  //     "Common.ONLY_NUM"
                                  //   ),
                                  // },
                                  maxLength: {
                                    value: 10,
                                  },
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="examplePassword">
                                {this.props.t("Claim.TRAVEL_DATE_TIME")}
                              </Label>
                              {/* <Field
                            name="travelTime"
                            //tag={Field}
                            component={DatePickerComponent}
                            label={"Travel date and time*"}
                            type="text"
                          /> */}
                              <DatePickerComponent
                                getselectedData={this.getselectedData}
                              // defaultValue={new Date("10/10/1990")}
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
                                    &nbsp;{" "}
                                    {this.props.t("Claim.FILE_ATTACH_X") + "*"}
                                  </span>
                                </label>
                                <input
                                  //component={CustomInput}
                                  type="file"
                                  name="updateTicket"
                                  id="updateTicket"
                                  ref="fileInput"
                                  multiple
                                  className="CiList-inputs form-control-file"
                                  onChange={(e) => this.handleFileChange(e)}
                                  style={{ display: "none" }}
                                />{" "}
                              </div>
                              <span className="text-dark">
                                {this.currentFile}
                              </span>
                              <br />
                              <small className="text-danger">
                                {this.props.t("Claim.MAX_SIZE")}
                              </small>
                            </FormGroup>
                          </div>

                          <div className="text-center mb-2">
                            <Button
                              color="btn btn-lg btn-primary px-5 btn-pill"
                              className="btn btn-lg btn-primary  p-3 home-btn-width btn-pill"
                              // onClick={(e) => this.nextPage(e)}
                              type="submit"
                              // disabled={pristine || submitting}
                              onClick={handleSubmit((values) =>
                                this.onSubmit({
                                  values,
                                  isFinalPage: false,
                                })
                              )}
                            >
                              {this.props.t("Claim.NEXT")}
                            </Button>
                            <br />
                          </div>
                        </Col>
                      )}
                      {/* page 2 */}
                      {this.state.showPageTwo && (
                        <Col md={9} className="mx-auto">
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
                                {/* {this.showOptions(
                        this.state.subCategoryDataByCategory
                          ? this.state.subCategoryDataByCategory
                          : null
                      )} */}
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
                                  onClick={() => this.handleRefs()}
                                >
                                  <i className="fa fa-paperclip text-dark"></i>
                                  <span className=" text-dark">
                                    &nbsp; {this.props.t("Claim.FILE_ATTACH")}
                                  </span>
                                </label>
                                <input
                                  //component={CustomInput}
                                  type="file"
                                  name="updateClaim"
                                  id="updateClaim"
                                  ref="claimFileInput"
                                  multiple
                                  className="CiList-inputs form-control-file"
                                  onChange={(e) =>
                                    this.handleClaimFileChange(e)
                                  }
                                  style={{ display: "none" }}
                                />{" "}
                              </div>
                              <span className="text-dark">
                                {this.currentClaimFile}
                              </span>
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
                              <Button
                                className="btn btn-primary btn-pill p-3 home-btn-width btn-lg ml-2"
                                onClick={(e) => this.previousPage()}
                              >
                                {" "}
                                {this.props.t("Claim.PREVIOUS")}
                              </Button>{" "}
                              <SubmitBtnLoader
                                label={this.props.t("Claim.SEND")}
                                className="btn btn-lg btn-primary p-3 home-btn-width btn-pill mr-2"
                                loading={this.state.loading}
                                submitting={""}
                                type="submit"
                                onClick={handleSubmit((values) =>
                                  this.onSubmit({
                                    values,
                                    isFinalPage: true,
                                  })
                                )}
                              />
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </AvForm>
                </Card>
              </Col>
            </Row>
            <section className="mb-5">
              <Container>
                <Row>
                  <Col md="12" className="" />
                </Row>
              </Container>
            </section>
          </Container>
        </ReactCSSTransitionGroup>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

ClaimComponent = reduxForm({
  form: "RegisterForm",
})(ClaimComponent);
function mapStateToProps(state) {
  // console.log(state.Station.stationList);
  return {
    stationList: state.Station.stationList,
    // initialValues: JSON.parse(localStorage.getItem("trainDetails")),
    // page 2 states
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
)(ClaimComponent);
