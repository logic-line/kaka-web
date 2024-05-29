import { GetSettingsRequest } from '@/types/settings';
import SettingsService from "../services/settings";
import config from "@/config";

const
    CompanyName = "company_name",
    DefaultSiteLanguage = "default_site_language",
    LayoutModeDark = "layout_mode_dark",
    AllowRegistration = "allow_registration",
    DefaultRegistrationRole = "default_registration_role",
    RequireEmailVerification = "require_email_verification",
    EmailToReceiveCustomerFeedback = "email_to_receive_customer_feedback",
    Referral = "referral",
    ReferralPercentage = "referral_percentage",
    ReferralType = "referral_type",
    Email = "email",
    PhoneNumber = "phone_number",
    Address = "address",
    About = "about",
    EnableKYCVerification = "enable_kyc_verification",
    EnableGoogleCaptcha = "enable_google_captcha",
    RequiredEmailConfirmation = "required_email_confirmation",
    EmailConfirmationExpireTime = "email_confirmation_expire_time",
    RequiredAdminApproval = "required_admin_approval",
    Withdrawal = "withdrawal",
    TradePair = "trade_pair",
    Currency = "currency",
    ContactInfo = "contact_info",
    Referrals = "referral",
    Accounts = "accounts",
    General = "general",
    SysDefaultTradePair = "System_default_tradepair",
    SiteKey = "site_key",
    GoogleCaptcha = "google_captcha",
    HCaptchaKey = "hcaptcha_key"



export const AllowedSettingData = {
    CompanyName: { // don't have field to show in FE
        Slug: CompanyName,
        SettingsGroup: General,
        Value: "Crypto Exchange System",
    },
    DefaultSiteLanguage: { // done
        Slug: DefaultSiteLanguage,
        SettingsGroup: General,
        Value: "english",
    },
    LayoutModeDark: { // done
        Slug: LayoutModeDark,
        SettingsGroup: General,
        Value: "FALSE",
    },
    SysDefaultTradePair: { // done
        Slug: SysDefaultTradePair,
        SettingsGroup: General,
        Value: "FALSE",
    },
    AllowRegistration: { // could not complete because of metadata issue
        Slug: AllowRegistration,
        SettingsGroup: Accounts,
        Value: "FALSE",
    },
    DefaultRegistrationRole: { // not implimented as we dont have feature
        Slug: DefaultRegistrationRole,
        SettingsGroup: Accounts,
        Value: "User",
    },
    RequireEmailVerification: { // not implimented as we dont have feature
        Slug: RequireEmailVerification,
        SettingsGroup: Accounts,
        Value: "TRUE",
    },
    SiteKey: {
        Slug: SiteKey,
        SettingsGroup: GoogleCaptcha,
        Value: "f53b9c2f-9ad5-47f5-869d-d3521d3ac4c8",
    },
    HCaptchaKey: {
        Slug: HCaptchaKey,
        SettingsGroup: GoogleCaptcha,
        Value: "0x055a7D2c94f486D36e2d0B3110F72BB50d4cf52B",
    },
    EmailToReceiveCustomerFeedback: { // not implimented as we dont have feature
        Slug: EmailToReceiveCustomerFeedback,
        SettingsGroup: Accounts,
        Value: "codemenorg@gmail.com",
    },
    Referral: { // done
        Slug: Referral,
        SettingsGroup: Referrals,
        Value: "TRUE",
    },
    ReferralPercentage: { // done
        Slug: ReferralPercentage,
        SettingsGroup: Referrals,
        Value: "2",
    },
    ReferralType: { // done
        Slug: ReferralType,
        SettingsGroup: Referrals,
        Value: "FIXED",
    },
    Email: { // don't have field to show in FE
        Slug: Email,
        SettingsGroup: ContactInfo,
        Value: "codemenorg@gmail.com",
    },
    PhoneNumber: { // don't have field to show in FE
        Slug: PhoneNumber,
        SettingsGroup: ContactInfo,
        Value: "+8801772473616",
    },
    Address: { // don't have field to show in FE
        Slug: Address,
        SettingsGroup: ContactInfo,
        Value: "Khulna, Bangladesh.",
    },
    About: { // don't have field to show in FE
        Slug: About,
        SettingsGroup: ContactInfo,
        Value: "About description",
    },
    EnableGoogleCaptcha: { // done
        Slug: EnableGoogleCaptcha,
        SettingsGroup: GoogleCaptcha,
        Value: "FALSE",
    },

    EnableKYCVerification: { // done
        Slug: EnableKYCVerification,
        SettingsGroup: Accounts,
        Value: "FALSE",
    },
    RequiredEmailConfirmation: { // done
        Slug: RequiredEmailConfirmation,
        SettingsGroup: Withdrawal,
        Value: "FALSE",
    },
    EmailConfirmationExpireTime: { // done
        Slug: EmailConfirmationExpireTime,
        SettingsGroup: Withdrawal,
        Value: "20",
    },
    RequiredAdminApproval: { // done
        Slug: RequiredAdminApproval,
        SettingsGroup: Withdrawal,
        Value: "FALSE",
    },

}

// get settings value
export async function GetSetting(slug: string, settinggrp: string): Promise<string> {
    let result = ""
    let payload: GetSettingsRequest = {
        slug: slug,
        settingsgroup: settinggrp
    }
    await new SettingsService().GetSetting(payload).then((response: any) => {
        if (response != null && response != null) {
            result = response.Settings.Value
        }
    })
    return result
}