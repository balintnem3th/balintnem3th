export interface Client {
  username?: string;
  applicationDate?: string;
  applicationLocation?: string;
  name: string;
  type?: string;
  status?: string;
  applicationReason?: string;
  origin?: string;
  history?: string;
  initiator?: string;
  hasWrittenExtraInformation?: boolean;
  writtenExtraInformation?: string;
  memo?: string;
  socialWorker?: string;
}
