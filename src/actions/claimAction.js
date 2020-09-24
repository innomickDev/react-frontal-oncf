import { CLAIM_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, CLAIM_API } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";
import { canManage, permissions } from "../Pages/Helpers/utils";
//action for get my claims
export function getMyClaims() {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_MY_CLAIM_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/MyClaims`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_MY_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_MY_CLAIM_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.GET_MY_CLAIM_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.GET_MY_CLAIM_FAILURE, error));
      });
  };
}

//action for add claim
export function addClaim(claimData, formValue) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foAuthToken")),
    },
  };
  return (dispatch) => {
    console.log(claimData);
    dispatch(base.getRequest(CLAIM_CONST.ADD_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/CreateClaim`, claimData, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ADD_CLAIM_SUCCESS, {
              response: {
                data: result,
                formValue: formValue,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ADD_CLAIM_FAILURE, {
              response: {
                data: result,
                formValue: formValue,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   error = checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.ADD_CLAIM_FAILURE, {
      //       error: {
      //         data: error,
      //         formValue: formValue
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.ADD_CLAIM_FAILURE, error));
      });
  };
}

// Get claim details by id
export function getClaimsDetailsById(claimId) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_CLAIM_DETAILS_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/${claimId}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_CLAIM_DETAILS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_CLAIM_DETAILS_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.GET_CLAIM_DETAILS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get ticket attachment based on calim code
export function getTicketAttachment(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_TICKET_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/GetTicketAttachment?code=${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_TICKET_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_TICKET_ATTACHMENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.GET_TICKET_ATTACHMENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
// Get claim attachment based on calim ID
export function getClaimAttachment(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_CLAIM_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/GetClaimAttachment?code=${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_CLAIM_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_CLAIM_ATTACHMENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.GET_CLAIM_ATTACHMENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Update ticket attachment based on calim ID
export function updateTicketAttachment(formData) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.patch(
      `${CLAIM_API}/UpdateTicketAttachment`,
      formData,
      HEADER
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Update ticket attachment based on calim ID
export function updateClaimAttachment(formData) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.UPDATE_CLAIM_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.patch(`${CLAIM_API}/UpdateClaimAttachment`, formData, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.UPDATE_CLAIM_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.UPDATE_CLAIM_ATTACHMENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.UPDATE_CLAIM_ATTACHMENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
// add claim by agent
export function addClaimByAgent(claimData) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ADD_CLAIM_BY_AGENT_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/AddClaimByAgent`, claimData, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ADD_CLAIM_BY_AGENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ADD_CLAIM_BY_AGENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.ADD_CLAIM_BY_AGENT_FAILURE, error)
        );
      });
  };
}

export function getAllClaims(queryParams) {
  const userDetails = JSON.parse(localStorage.getItem("foUserDetails"));
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_REQUEST));
    if (canManage(permissions.canChangeClaimAssignment)) {
      if (queryParams) {
        apiPromise = AXIOS_INSTANCE.post(`${CLAIM_API}/GetClaims`, queryParams);
      } else {
        apiPromise = AXIOS_INSTANCE.post(`${CLAIM_API}/GetClaims`);
      }
    } else {
      if (queryParams) {
        queryParams.agentId = userDetails.data.userId;
        // console.log(queryParams);
        apiPromise = AXIOS_INSTANCE.post(
          `${CLAIM_API}/GetClaimByAgent`,
          queryParams
        );
      } else {
        apiPromise = AXIOS_INSTANCE.post(`${CLAIM_API}/GetClaimByAgent`, {
          agentId: userDetails.data.userId,
        });
      }
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE, error)
        );
      });
  };
}

// Update ticket attachment based on calim ID
export function answerClaim(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ANSWER_CLAIM_REQUEST));
    AXIOS_INSTANCE.patch(`${CLAIM_API}/AnswerClaim`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ANSWER_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ANSWER_CLAIM_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.ANSWER_CLAIM_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.ANSWER_CLAIM_FAILURE, error));
      });
  };
}

// Assign claim to agent
export function assignClaimToAgent(assignData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/AssignClaimToAgent`, assignData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_FAILURE, error)
        );
      });
  };
}

// get claim by agent
export function getClaimsByAgent(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_CLAIM_BY_AGENT_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${CLAIM_API}/getClaimClientsByAgent`,
        queryParams
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(`${CLAIM_API}/getClaimClientsByAgent`);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_CLAIM_BY_AGENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_CLAIM_BY_AGENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.GET_CLAIM_BY_AGENT_FAILURE, error)
        );
      });
  };
}

// Update claim new api todo
export function updateClaim(claimData) {
  console.log(claimData);
  return (dispatch) => {
    console.log(claimData);
    dispatch(base.getRequest(CLAIM_CONST.UPDATE_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/UpdateClaim`, claimData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.UPDATE_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.UPDATE_CLAIM_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.UPDATE_CLAIM_FAILURE, error));
      });
  };
}
