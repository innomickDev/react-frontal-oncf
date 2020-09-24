import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

// APPLICATIONS
// Layout
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";

// Theme Options
// import BackofficeLogin from "../Components/BackofficeLogin";
// Pages
// import AdminDashboard from "../BackOffice/AdminDashboard/MainDashboard";
// import MembersComponent from "../BackOffice/Members";
// import UserRolesComponent from "../BackOffice/AdminDashboard/UserRoles";
// import StationManagement from "../BackOffice/StationManagement";
// import ChangePasswordBackoffice from "../BackOffice/ChangePasswordBackoffice";
// import CategoryManagement from "../BackOffice/CategoryManagement";
// import SubCategoryManagement from "../BackOffice/SubCategoryManagement";
// import SubSubCategoryManagement from "../BackOffice/SubSubCategoryManagement";
// import GroupsManagement from "../BackOffice/GroupsManagement";
// import ResponseComponent from "../BackOffice/ResponseManagement";
// import ClaimsManagement from "../BackOffice/ClaimsManagement";
// import ClaimsCategoryAgent from "../BackOffice/ClaimsManagement/AgentClaimCategory";
// import ClaimListComponent from "../BackOffice/ClaimsManagement/ClaimList";
// import ProcessAgentClaim from "../BackOffice/ClaimsManagement/ClaimList/ProcessClaim";
// import EmailTemplateComponent from "../BackOffice/EmailManagement";
// import MembersStat from "../BackOffice/StatisticsComponent/MembersStat";
// import ClaimsOverviewStat from "../BackOffice/StatisticsComponent/ClaimsOverview";
// import FrontOfficeUsersComponent from "../BackOffice/Members/FrontOfficeUsers";
//
export const isAuthenticated = () => {
  if (localStorage.getItem("foAuthToken")) {
    // window.location = "/#/pages/home";
    return true;
  } else {
    // window.location = "/#/pages/login";
    return false;
  }
};
const Dashboards = ({ match }) =>
  isAuthenticated() ? (
    <Fragment>
      {/*<ThemeOptions/>*/}
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            {/* This is Whole DashBord body part */}
            <div className="content-height-c">
              {/* <Route path={`${match.url}/login`} component={BackofficeLogin} /> */}
              {/* <Route
                path={`${match.url}/admin-dashboard`}
                component={AdminDashboard}
              />
              <Route
                path={`${match.url}/members`}
                component={MembersComponent}
              />
              <Route
                path={`${match.url}/user-roles`}
                component={UserRolesComponent}
              />
              <Route
                path={`${match.url}/station-management`}
                component={StationManagement}
              />
              <Route
                path={`${match.url}/change-password-backoffice`}
                component={ChangePasswordBackoffice}
              />
              <Route
                path={`${match.url}/category-management`}
                component={CategoryManagement}
              />
              <Route
                path={`${match.url}/sub-category-management`}
                component={SubCategoryManagement}
              />
              <Route
                path={`${match.url}/sub-sub-category-management`}
                component={SubSubCategoryManagement}
              />
              <Route
                path={`${match.url}/groups-management`}
                component={GroupsManagement}
              />
              <Route
                path={`${match.url}/response-management`}
                component={ResponseComponent}
              />
              <Route
                path={`${match.url}/agent-claims-management`}
                component={ClaimsManagement}
              />
              <Route
                path={`${match.url}/agent-claims-category`}
                component={ClaimsCategoryAgent}
              />
              <Route
                path={`${match.url}/claim-lists`}
                component={ClaimListComponent}
              />
              <Route
                path={`${match.url}/process-claims`}
                component={ProcessAgentClaim}
              />
              <Route
                path={`${match.url}/email-management`}
                component={EmailTemplateComponent}
              />
              <Route
                path={`${match.url}/members-statistics`}
                component={MembersStat}
              />
              <Route
                path={`${match.url}/claims-overview`}
                component={ClaimsOverviewStat}
              />
              <Route
                path={`${match.url}/frontoffice-users`}
                component={FrontOfficeUsersComponent}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
      (window.location = "/")
    );

export default Dashboards;
