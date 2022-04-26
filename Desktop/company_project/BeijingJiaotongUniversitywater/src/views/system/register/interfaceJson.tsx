export interface apiSystemOrgDetailJSON {
  actualController?: string;
  approvalDate?: string;
  bankAccount?: string;
  businessLicense?: BusinessLicense[];
  businessScope?: string;
  contactAddress?: string;
  contactAreaCode?: number;
  contactEmail?: string;
  contactMobile?: string;
  contactName?: string;
  creditCode?: string;
  depositBank?: string;
  depositBankAddress?: string;
  depositBankAreaCode?: number;
  employeeNumber?: number;
  enterpriseCharacter?: string;
  enterpriseCharacteristic?: string;
  enterpriseEmail?: string;
  enterpriseWebsite?: string;
  fax?: string;
  foundDate?: string;
  id?: number;
  industry?: string;
  legalRepresentative?: string;
  legalRepresentativeIdNo?: string;
  legalRepresentativeIdType?: string;
  mainProduct?: string;
  operationPeriod?: string;
  orgName?: string;
  produceAddress?: string;
  produceAreaCode?: number;
  regAddress?: string;
  regAreaCode?: number;
  registeredCapital?: number;
  registeredCapitalCurrency?: string;
  registrationAuthority?: string;
  remark?: string;
  operationPeriodType?: boolean;
}
export interface BusinessLicense {
  name: string;
  uid: string;
  url: string;
}
