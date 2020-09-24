import { CLAIM_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    myClaimsData: null,
    addClaimData: null,
    addAgentClaimData: null,
    formValue: null,
    assignClaimNetworkError: false,
    isRequest: false,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // GET my claims
    case CLAIM_CONST.GET_MY_CLAIM_REQUEST:
      return {
        ...state,
        myClaimsData: null,
        claimDataError: null,
      };
    case CLAIM_CONST.GET_MY_CLAIM_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        myClaimsData: action.payload
          ? action.payload.response.data.data.claimClients
          : null,
        claimDataError: null,
      };
    case CLAIM_CONST.GET_MY_CLAIM_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        myClaimsData: null,
        claimDataError: action.payload.response.data.error.errorDescription,
      };
    // add claim
    case CLAIM_CONST.ADD_CLAIM_REQUEST:
      return {
        ...state,
        addClaimData: null,
        addClaimDataError: false,
      };
    case CLAIM_CONST.ADD_CLAIM_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        addClaimData: action.payload ? action.payload.response.data.data : null,
        addClaimDataError: false,
      };
    case CLAIM_CONST.ADD_CLAIM_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        addClaimData: null,
        addClaimDataError: action.payload.response.data.error.errorDescription,
      };
    //get claim by id
    case CLAIM_CONST.GET_CLAIM_DETAILS_REQUEST:
      return {
        ...state,
        getClaimsDataById: null,
        getClaimsDataError: false,
      };
    case CLAIM_CONST.GET_CLAIM_DETAILS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        getClaimsDataById: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        getClaimsDataError: false,
      };
    case CLAIM_CONST.GET_CLAIM_DETAILS_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        getClaimsDataById: null,
        getClaimsDataError: action.payload.error ? true : false,
      };
    //get ticket attachment
    case CLAIM_CONST.GET_TICKET_ATTACHMENT_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        getTicketAttachmentData: null,
        getTicketAttachmentErrorStatus: false,
        getTicketAttachmentNetworkErrorStatus: false,
      };
    case CLAIM_CONST.GET_TICKET_ATTACHMENT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        getTicketAttachmentData: action.payload.response
          ? action.payload.response.data.data
          : null,
        getTicketAttachmentErrorStatus: false,
        getTicketAttachmentNetworkErrorStatus: false,
      };
    case CLAIM_CONST.GET_TICKET_ATTACHMENT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        getTicketAttachmentData: null,
        getTicketAttachmentErrorStatus: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
        getTicketAttachmentNetworkErrorStatus: action.payload.error
          ? true
          : false,
      };
    //update ticket attachements
    case CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_REQUEST:
      return {
        ...state,
        updateTicketAttachmentData: null,
        updateTicketAttachmentErrorStatus: false,
        updateTicketAttachmentNetworkErrorStatus: false,
      };
    case CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_SUCCESS:
      return {
        ...state,
        updateTicketAttachmentData: action.payload.response
          ? action.payload.response.data.data
          : null,
        updateTicketAttachmentErrorStatus: false,
        updateTicketAttachmentNetworkErrorStatus: false,
      };
    case CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_FAILURE:
      return {
        ...state,
        updateTicketAttachmentData: null,
        updateTicketAttachmentErrorStatus: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
        updateTicketAttachmentNetworkErrorStatus: action.payload.error
          ? true
          : false,
      };
    // add claim by agent
    case CLAIM_CONST.ADD_CLAIM_BY_AGENT_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        addAgentClaimData: null,
        addAgentClaimDataError: false,
      };
    case CLAIM_CONST.ADD_CLAIM_BY_AGENT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        addAgentClaimData: action.payload.response.data.isSuccess
          ? true
          : false,
        addAgentClaimDataError: false,
      };
    case CLAIM_CONST.ADD_CLAIM_BY_AGENT_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        addAgentClaimData: null,
        addAgentClaimDataError:
          action.payload.response.data.error.errorDescription,
      };
    // get all claims
    case CLAIM_CONST.GET_ALL_CLAIM_DETAILS_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        getAllClaimsData: null,
        getAllClaimsDataFail: null,
      };
    case CLAIM_CONST.GET_ALL_CLAIM_DETAILS_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        getAllClaimsData: action.payload.response.data.data,
        getAllClaimsDataFail: null,
      };
    case CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        getAllClaimsData: null,
        getAllClaimsDataFail:
          action.payload.response.data.error.errorDescription,
      };

    // Answer claim
    case CLAIM_CONST.ANSWER_CLAIM_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        isAnswerSuccess: null,
        isAnswerError: null,
      };
    case CLAIM_CONST.ANSWER_CLAIM_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isAnswerSuccess: action.payload.response.data.isSuccess ? true : false,
        isAnswerError: null,
      };
    case CLAIM_CONST.ANSWER_CLAIM_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        isAnswerSuccess: null,
        isAnswerError: action.payload.response.data.error.errorDescription,
      };

    // Assign claim to agent
    case CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        isAgentSuccess: null,
        isAgentFailure: null,
      };
    case CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isAgentSuccess: action.payload.response.data.isSuccess ? true : false,
        isAgentFailure: null,
      };
    case CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        isAgentSuccess: null,
        isAgentFailure: action.payload.response.data.error.errorDescription,
      };
    //get claim attachment
    case CLAIM_CONST.GET_CLAIM_ATTACHMENT_REQUEST:
      return {
        ...state,
        getClaimAttachment: null,
        ClaimAttachmentData: null,
        isRequest: true,
      };
    case CLAIM_CONST.GET_CLAIM_ATTACHMENT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        getClaimAttachment: action.payload.response.data.isSuccess
          ? true
          : false,
        ClaimAttachmentData: action.payload.response.data.data,
        isRequest: false,
      };
    case CLAIM_CONST.GET_CLAIM_ATTACHMENT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        getClaimAttachment: null,
        ClaimAttachmentData: null,
        isRequest: false,
      };
    // update claim
    case CLAIM_CONST.UPDATE_CLAIM_REQUEST:
      return {
        ...state,
        updateClaim: null,
        updateClaimFail: null,
      };
    case CLAIM_CONST.UPDATE_CLAIM_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        updateClaim: action.payload.response.data.isSuccess,
        updateClaimFail: null,
      };
    case CLAIM_CONST.UPDATE_CLAIM_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        updateClaim: null,
        updateClaimFail: action.payload.response.data.error.errorDescription,
      };
    //update ticket attachements
    case CLAIM_CONST.UPDATE_CLAIM_ATTACHMENT_REQUEST:
      return {
        ...state,
        updateClaimAttachmentData: null,
        updateClaimAttachmentErrorStatus: false,
      };
    case CLAIM_CONST.UPDATE_CLAIM_ATTACHMENT_SUCCESS:
      return {
        ...state,
        updateClaimAttachmentData: action.payload.response
          ? action.payload.response.data.data
          : null,
        updateClaimAttachmentErrorStatus: false,
      };
    case CLAIM_CONST.UPDATE_CLAIM_ATTACHMENT_FAILURE:
      return {
        ...state,
        updateClaimAttachmentData: null,
        updateClaimAttachmentErrorStatus: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
      };
  }
  return state;
}
