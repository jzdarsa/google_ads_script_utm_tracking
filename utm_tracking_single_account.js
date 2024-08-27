function main() {
  Logger.log("Processing account: " + AdsApp.currentAccount().getCustomerId());

  // Process each campaign type with error handling
  tryHandleCampaigns(AdsApp.campaigns(), "Standard & Others");
  tryHandleCampaigns(AdsApp.shoppingCampaigns(), "Shopping");
  tryHandleCampaigns(AdsApp.performanceMaxCampaigns(), "Performance Max");
  // tryHandleCampaigns(AdsApp.videoCampaigns(), "Video");

  Logger.log("Processing completed for account: " + AdsApp.currentAccount().getCustomerId());
}

function tryHandleCampaigns(campaignIteratorFunction, campaignType) {
  try {
    handleCampaigns(campaignIteratorFunction, campaignType);
  } catch (e) {
    Logger.log("Error processing " + campaignType + " campaigns: " + e.message);
  }
}

function handleCampaigns(campaignIteratorFunction, campaignType) {
  var campaignIterator = campaignIteratorFunction
                            .withCondition('Status != REMOVED')
                            .get();
  while (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    try {
      var trackingTemplate = "{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_id=" + campaign.getId();
      campaign.urls().setTrackingTemplate(trackingTemplate);
      // Set custom parameters or perform other universal actions here
      campaign.urls().setCustomParameters({campaign: encodeURIComponent(campaign.getName())});
    } catch (e) {
      Logger.log("Error processing campaign " + campaign.getId() + " in " + campaignType + ": " + e.message);
    }
  }
}
