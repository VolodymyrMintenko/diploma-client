export const hasCampaigns = ({ campaigns }) => {
  return Boolean(campaigns && campaigns.length);
};

export const hasSelectedCampaign = ({ selectedCampaign }) => {
  return Boolean(selectedCampaign && selectedCampaign.id);
};
