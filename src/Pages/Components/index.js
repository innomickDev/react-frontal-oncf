import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// USER PAGES

import Login from "./Login/";
// import LoginBoxed from "./LoginBoxed/";
// import Login from "./Login/login";
import Register from "./Register/";
// import BackOfficeLogin from "./BackofficeLogin/index";

import HomeComponent from "./HomeComponent";
import ClaimComponent from "./ClaimComponent";
// import ClaimCategory from "./ClaimComponent/ClaimCategory";
import ClaimDetails from "./ClaimComponent/ClaimDetails";
import ClaimStatus from "./ClaimComponent/ClaimStatus";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import HowItWorks from "./HomeComponent/HowItWorks";
import ClaimsView from "./HomeComponent/ClaimsView";
import OncfFigure from "./HomeComponent/OncfFigure";
import LostObjects from "./HomeComponent/LostObject";
import Faq from "./HomeComponent/Faq";
import ActivateAccount from "./ActivateAccountScreen";
import unlockAccount from "./UnlockAccountScreen";
import UpdateClaimComponent from "./ClaimComponent/UpdateClaim";
import ClaimData from "./ClaimComponent/ClaimDataPrintComponent";
import TermsCondition from "./TermsConditions";

// import RegisterBoxed from "./RegisterBoxed/";

// import ForgotPassword from "./ForgotPassword/";
// import ForgotPasswordBoxed from "./ForgotPasswordBoxed/";

const frontOffice = ({ match }) => (
  <Fragment>
    <div className="app-container">
      {/* User Pages */}
      <Route path={`${match.url}/register`} component={Register} />
      <Route path={`${match.url}/login`} component={Login} />
      <Route path={`${match.url}/home`} component={HomeComponent} />
      <Route path={`${match.url}/claim`} component={ClaimComponent} />
      {/* <Route path={`${match.url}/claim-category`} component={ClaimCategory} /> */}
      <Route path={`${match.url}/claim-details/:id`} component={ClaimDetails} />
      <Route path={`${match.url}/claim-status`} component={ClaimStatus} />
      <Route path={`${match.url}/forgot-password`} component={ForgotPassword} />
      <Route path={`${match.url}/change-password`} component={ChangePassword} />
      <Route path={`${match.url}/howItWorks`} component={HowItWorks} />
      <Route path={`${match.url}/claimView`} component={ClaimsView} />
      <Route path={`${match.url}/oncfFigure`} component={OncfFigure} />
      <Route path={`${match.url}/lostObjects`} component={LostObjects} />
      <Route path={`${match.url}/faq`} component={Faq} />
      <Route
        path={`${match.url}/update-claim`}
        component={UpdateClaimComponent}
      />
      <Route path={`${match.url}/claim-Data/:id`} component={ClaimData} />
      {/* backoffice login */}
      {/* <Route
        path={`${match.url}/backofficeLogin`}
        component={BackOfficeLogin}
      />{" "} */}
      <Route
        path={`${match.url}/activate-account`}
        component={ActivateAccount}
      />
       <Route
        path={`${match.url}/unlock-account`}
        component={unlockAccount}
      />
      <Route
        path={`${match.url}/terms-and-conditions`}
        component={TermsCondition}
      />
    </div>
  </Fragment>
);

export default frontOffice;
