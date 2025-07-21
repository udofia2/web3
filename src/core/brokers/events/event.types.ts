// import {
//     FiatInitDeposit,
//     IEnquiryData,
//     IPasswordResetData,
//     ISecurityUpdate,
//     IUpdatePreferenceSuccess,
//     IVerificationEmailData, IVerifyMerchantFee,
//     IWalletWhitelistingUpdate,
//     KycApproved,
//     KYCRejected,
//     LoginNotification,
//     MintApproval,
//     MintFailed,
//     MintResponse,
//     NairaDepositRequest,
//     NairaRedeemConfirmation,
//     NairaRedeemRejection,
//     NairaRedeemRequest,
//     NewAdminCredential, PendingMintTransaction, RedeemConfirmation, RedeemFailed, SendTeamMail,
//     SignatoryInvitation,
//     TwoFactorEnabled,
// } from "../../../Modules/Emails/entities/email.entities";
// import {Business, User} from "@prisma/client";

// export enum EventType {
//     //Emails Module Events
//     SEND_ENQUIRY_EMAIL = 'SEND_ENQUIRY_EMAIL',
//     SEND_NEW_USER_VERIFICATION_MAIL = 'SEND_NEW_USER_VERIFICATION_MAIL',
//     SEND_PASSWORD_RESET_MAIL = 'SEND_PASSWORD_RESET_MAIL',
//     SEND_MINT_APPROVAL_MAIL = 'SEND_MINT_APPROVAL_MAIL',
//     SEND_USER_MINT_CONFIRMATION_MAIL = 'SEND_USER_MINT_CONFIRMATION_MAIL',
//     SEND_USER_MINT_DECLINE_MAIL = 'SEND_USER_MINT_DECLINE_MAIL',
//     SEND_USER_MINT_FAILED_MAIL = 'SEND_USER_MINT_FAILED_MAIL',
//     SEND_USER_KYC_REJECTED_MAIL = 'SEND_USER_KYC_REJECTED_MAIL',
//     SEND_USER_KYC_APPROVAL_MAIL = 'SEND_USER_KYC_APPROVAL_MAIL',
//     SEND_NEW_ADMIN_LOGIN_MAIL = 'SEND_NEW_ADMIN_LOGIN_MAIL',
//     SEND_NAIRA_REDEEM_REQUEST_MAIL = 'SEND_NAIRA_REDEEM_REQUEST_MAIL',
//     SEND_NAIRA_DEPOSIT_REQUEST_MAIL = 'SEND_NAIRA_DEPOSIT_REQUEST_MAIL',
//     SEND_NAIRA_REDEEM_CONFIRMATION_MAIL = 'SEND_NAIRA_REDEEM_CONFIRMATION_MAIL',
//     SEND_NAIRA_REDEEM_REJECTION_MAIL = 'SEND_NAIRA_REDEEM_REJECTION_MAIL',
//     SEND_LOGIN_NOTIFICATION_MAIL = 'SEND_LOGIN_NOTIFICATION_MAIL',
//     SEND_2FA_ENABLED_MAIL = 'SEND_2FA_ENABLED_MAIL',
//     SEND_SIGNATORY_INVITATION_MAIL = 'SEND_SIGNATORY_INVITATION_MAIL',
//     SEND_SECURITY_UPDATE_MAIL = 'SEND_SECURITY_UPDATE_MAIL',
//     SEND_UPDATE_PREFERENCE_SUCCESS_MAIL = 'SEND_UPDATE_PREFERENCE_SUCCESS_MAIL',
//     SEND_WALLET_WHITELIST_MAIL = 'SEND_WALLET_WHITELIST_MAIL',
//     SEND_VERIFY_MERCHANT_FEE_MAIL = 'SEND_VERIFY_MERCHANT_FEE_MAIL',
//     SEND_INIT_FIAT_DEPOSIT_MAIL = 'SEND_INIT_FIAT_DEPOSIT_MAIL',
//     SEND_PENDING_MINT_MAIL = 'SEND_PENDING_MINT_MAIL',
//     SEND_TEAM_MAIL = 'SEND_TEAM_MAIL',
//     SEND_REDEEM_CONFIRMATION_MAIL = 'SEND_REDEEM_CONFIRMATION_MAIL',
//     SEND_REDEEM_FAILED_MAIL = 'SEND_REDEEM_FAILED_MAIL',

//     //User Module Events
//     UPDATE_USER_BY_ID = 'UPDATE_USER_BY_ID',


//     //Business Module Event
//     UPDATE_BUSINESS_BY_ID = 'UPDATE_BUSINESS_BY_ID',
// }

// export type EventPayloads = {
//     //Email Module Event Payload
//     [EventType.SEND_ENQUIRY_EMAIL]: IEnquiryData;
//     [EventType.SEND_NEW_USER_VERIFICATION_MAIL]: IVerificationEmailData;
//     [EventType.SEND_PASSWORD_RESET_MAIL]: IPasswordResetData;
//     [EventType.SEND_MINT_APPROVAL_MAIL]: MintApproval;
//     [EventType.SEND_USER_MINT_CONFIRMATION_MAIL]: MintResponse;
//     [EventType.SEND_USER_MINT_DECLINE_MAIL]: MintResponse;
//     [EventType.SEND_USER_MINT_FAILED_MAIL]: MintFailed;
//     [EventType.SEND_USER_KYC_REJECTED_MAIL]: KYCRejected;
//     [EventType.SEND_USER_KYC_APPROVAL_MAIL]: KycApproved;
//     [EventType.SEND_NEW_ADMIN_LOGIN_MAIL]: NewAdminCredential;
//     [EventType.SEND_NAIRA_REDEEM_REQUEST_MAIL]: NairaRedeemRequest;
//     [EventType.SEND_NAIRA_DEPOSIT_REQUEST_MAIL]: NairaDepositRequest;
//     [EventType.SEND_NAIRA_REDEEM_CONFIRMATION_MAIL]: NairaRedeemConfirmation;
//     [EventType.SEND_NAIRA_REDEEM_REJECTION_MAIL]: NairaRedeemRejection;
//     [EventType.SEND_LOGIN_NOTIFICATION_MAIL]: LoginNotification;
//     [EventType.SEND_2FA_ENABLED_MAIL]: TwoFactorEnabled;
//     [EventType.SEND_SIGNATORY_INVITATION_MAIL]: SignatoryInvitation;
//     [EventType.SEND_SECURITY_UPDATE_MAIL]: ISecurityUpdate;
//     [EventType.SEND_UPDATE_PREFERENCE_SUCCESS_MAIL]: IUpdatePreferenceSuccess;
//     [EventType.SEND_WALLET_WHITELIST_MAIL]: IWalletWhitelistingUpdate;
//     [EventType.SEND_VERIFY_MERCHANT_FEE_MAIL]: IVerifyMerchantFee;
//     [EventType.SEND_INIT_FIAT_DEPOSIT_MAIL]: FiatInitDeposit;
//     [EventType.SEND_PENDING_MINT_MAIL]: PendingMintTransaction;
//     [EventType.SEND_TEAM_MAIL]: SendTeamMail;
//     [EventType.SEND_REDEEM_CONFIRMATION_MAIL]: RedeemConfirmation;
//     [EventType.SEND_REDEEM_FAILED_MAIL]: RedeemFailed;

//     //User Module Event Payload
//     [EventType.UPDATE_USER_BY_ID]: {
//         userId: string,
//         data: Partial<User>
//     };

//     //Business Module Event Payload
//     [EventType.UPDATE_BUSINESS_BY_ID]: {
//         businessId: string
//         data: Partial<Business>
//     }
// };