export interface WarTypes {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  factions: FactionTypes[];
  campaigns: CampaignTypes[];
}

type FactionTypes = {
  id: string;
  name: string;
  side: string;
  warId: string;
};
export type CampaignTypes = {
  id: string;
  name: string;
  description: string;
  warId: string;
  startDate: string;
  endDate: string;
};
