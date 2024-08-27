function main() {
  const accountSelector = AdsManagerApp.accounts().withLimit(50); // Adjust the limit as needed
  accountSelector.executeInParallel('processAccount', 'allFinished');
}

function processAccount() {
  var account = AdsApp.currentAccount();
  Logger.log("Processing account: " + account.getCustomerId());

  // Process each campaign type with error handling
  tryHandleCampaigns(AdsApp.campaigns(), "Standard & Others");
  tryHandleCampaigns(AdsApp.shoppingCampaigns(), "Shopping");
  tryHandleCampaigns(AdsApp.performanceMaxCampaigns(), "Performance Max");
  // tryHandleCampaigns(AdsApp.videoCampaigns(), "Video");

  // Return a result that you can use later in allFinished (optional)
  return account.getCustomerId();
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

// This function is optional but allows you to handle any results after all accounts are processed
function allFinished(results) {
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    if (result.getStatus() === 'OK') {
      Logger.log("Successfully processed account: " + result.getCustomerId());
    } else {
      Logger.log("Failed to process account: " + result.getCustomerId() + " with error: " + result.getError());
    }
  }
}
