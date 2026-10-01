import { instance } from "../../lib/axios";

export async function getCampaign(campaignId: string) {
  try {
    const resp = await instance.get(`/world/data/campaign/${campaignId}`);
    console.log("getting campaign by id....", resp.status);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
