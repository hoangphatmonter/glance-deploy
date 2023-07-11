//? override sdk
const gameName = window.__GLANCE_ENV.GAME_NAME
const publisherName = window.__GLANCE_ENV.PUBLISHER_NAME
window.gameName = gameName

const gameInput = { gameName, publisherName }

var queryParams = location.search.substring(1)?.split('&')
var isTestModeOn =
    queryParams
        .find((a) => {
            return a.startsWith('mode')
        })
        ?.split('=')[1]
        .toLowerCase() === 'test'
        ? true
        : false
var gpID = queryParams
    .find((a) => {
        return a.startsWith('gpid')
    })
    ?.split('=')[1]

if (isTestModeOn) {
    gameInput['surface'] = 'test'
}

function progressBar(percentage) {
    console.log('Loading Bar :', percentage)
}

function sendCustomAnalyticsEvent(eventType, extras) {
    console.log('AnalyticsEvent', eventType, extras)
}
//loading scripts
$.getScript('https://g.glance-cdn.com/public/content/games/xiaomi/gamesAd.js')
    .done(function (script, textStatus) {
        console.log(textStatus)
        window.GlanceGamingAdInterface.setupLibrary(gameInput, successCb, failCb)
    })
    .fail(function (jqxhr, settings, exception) {
        console.log('MLIB load failed, reason : ', exception)
    })

var LPBannerInstance,
    LBBannerInstance,
    StickyBannerInstance,
    replayInstance,
    GlanceGamingAdInstance,
    rewardInstance,
    _triggerReason
var is_replay_noFill = false
var is_rewarded_noFill = false
var isRewardGranted = false
var isRewardedAdClosedByUser = false

var pageName = `${gameInput.publisherName}_${gameInput.gameName}`
var categoryName = isTestModeOn ? 'google' : `${gameInput.publisherName}`
// Objects for different ad format.
var LPMercObj = {
    adUnitName: `${gameInput.publisherName}_${gameInput.gameName}_Gameload_Bottom`,
    pageName, //Game Name
    categoryName, //Publisher Name
    placementName: isTestModeOn ? 'Test_Banner' : 'Gameload',
    containerID: 'div-gpt-ad-2', //Div Id for banner
    height: 250,
    width: 300,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}
var StickyObj = {
    adUnitName: `${gameInput.publisherName}_${gameInput.gameName}_Ingame_Bottom`,
    pageName, //Game Name
    categoryName, //Publisher Name
    placementName: isTestModeOn ? 'Test_Banner' : 'Ingame',
    containerID: 'banner-ad', //Div Id for banner
    height: 50,
    width: 320,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}

var LBBannerObj = {
    adUnitName: `${gameInput.publisherName}_${gameInput.gameName}_Leaderboard_Top`,
    pageName, //Game Name
    categoryName, //Publisher Name
    placementName: isTestModeOn ? 'Test_Banner' : 'Leaderboard',
    containerID: 'div-gpt-ad-1', //Div Id for banner
    height: 250,
    width: 300,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}

function successCb() {
    console.log('set up lib success')
    if (window.showBumperAd) window.showBumperAd()
    window.isAdSDKLoaded = true
}

function failCb(reason) {
    console.log('set up lib failed', reason)

    window.isAdSDKLoaded = true
}

window.isAdSDKLoaded = false

var replayObj = {
    adUnitName: `${gameInput.publisherName}_${gameInput.gameName}_FsReplay_Replay`,
    placementName: isTestModeOn ? 'Test_Replay' : 'FsReplay',
    pageName, //Game Name
    categoryName, //Publisher Name
    containerID: '',
    height: '',
    width: '',
    xc: '',
    yc: '',
    gpid: gpID,
}
window.replayObj = replayObj

var rewardObj = {
    adUnitName: `${gameInput.publisherName}_${gameInput.gameName}_FsRewarded_Reward`,
    placementName: isTestModeOn ? 'Test_Rewarded' : 'FsRewarded',
    pageName, //Game Name
    categoryName, //Publisher Name
    containerID: '',
    height: '',
    width: '',
    xc: '',
    yc: '',
    gpid: gpID,
}
window.rewardObj = rewardObj

//banner ads callbacks
function bannerCallbacks(obj) {
    obj.adInstance?.registerCallback('onAdLoadSucceed', (data) => {
        console.log('onAdLoadSucceeded CALLBACK', data)

        if (obj.adUnitName === LBBannerObj.adUnitName) {
            $('#div-gpt-ad-1').css('display', 'flex')
            $('.gameOverDiv').css('margin-top', '0px')
        }
    })

    obj.adInstance?.registerCallback('onAdLoadFailed', (data) => {
        console.log('onAdLoadFailed  CALLBACK', data)

        if (obj.adUnitName === LBBannerObj.adUnitName) {
            $('#div-gpt-ad-1').css('display', 'none')
            $('.gameOverDiv').css('margin-top', '100px')
        }
    })

    obj.adInstance?.registerCallback('onAdDisplayed', (data) => {
        console.log('onAdDisplayed  CALLBACK', data)
    })
}
// rewarded ad callbacks
function rewardedCallbacks(obj) {
    obj.adInstance?.registerCallback('onAdLoadSucceed', (data) => {
        console.log('onAdLoadSucceeded Rewarded CALLBACK', data)
        if (obj.adUnitName === replayObj.adUnitName) {
            is_replay_noFill = false
        }
        if (obj.adUnitName === rewardObj.adUnitName) {
            is_rewarded_noFill = false
        }
    })

    obj.adInstance?.registerCallback('onAdLoadFailed', (data) => {
        console.log('onAdLoadFailed Rewarded CALLBACK', data)
        if (obj.adUnitName === replayObj.adUnitName) {
            is_replay_noFill = true
        }
        if (obj.adUnitName === rewardObj.adUnitName) {
            is_rewarded_noFill = true
        }
    })

    obj.adInstance?.registerCallback('onAdDisplayed', (data) => {
        console.log('onAdDisplayed Rewarded CALLBACK', data)
    })

    obj.adInstance?.registerCallback('onAdClosed', (data) => {
        console.log('onAdClosed Rewarded CALLBACK', data)

        if (obj.adUnitName == rewardObj.adUnitName) {
            isRewardedAdClosedByUser = true
        }
        runOnAdClosed()
        isRewardGranted = false
        isRewardedAdClosedByUser = false
    })

    obj.adInstance?.registerCallback('onAdClicked', (data) => {
        console.log('onAdClicked Rewarded CALLBACK', data)
    })

    obj.adInstance?.registerCallback('onRewardsUnlocked', (data) => {
        console.log('onRewardsUnlocked Rewarded CALLBACK', data)

        if (obj.adUnitName === rewardObj.adUnitName) {
            isRewardGranted = true
        }
    })
}
// function to be called after ad closes
function runOnAdClosed() {
    if (_triggerReason === 'replay') {
        // call game function for replay
        _triggerReason = ''
        showGame()

        replayInstance = window.GlanceGamingAdInterface.loadRewardedAd(replayObj, rewardedCallbacks)
    } else if (_triggerReason === 'reward') {
        // If user close ad before reward
        if (!isRewardGranted && isRewardedAdClosedByUser) {
            // call game function for not earning reward (failure case)
        } else {
            // call game function for earned reward  (success case)
        }
        _triggerReason = ''
        rewardInstance = window.GlanceGamingAdInterface.loadRewardedAd(rewardObj, rewardedCallbacks)
    }
}

// function called on replay button (leaderboard) clicked
function replayEvent() {
    _triggerReason = 'replay'
    if (!is_replay_noFill) {
        window.GlanceGamingAdInterface.showRewarededAd(replayInstance)
    } else {
        runOnAdClosed()
    }
}

function rewardEvent() {
    _triggerReason = 'reward'
    if (!is_rewarded_noFill) {
        window.GlanceGamingAdInterface.showRewarededAd(rewardInstance)
    } else {
        runOnAdClosed()
    }
}

function showGame() {
    if (recUI === 'true') {
        window.PwaGameCenterInterface.hideRecommendedSection()
        showcanvas()
    } else {
        $('#playMore').css('display', 'none')
        //? override sdk because crash if no sdk leaderboard show after being called after show replay ad
        if (LBBannerInstance) {
            LBBannerInstance.destroyAd()
        }
        $('#div-gpt-ad-1').html('')
    }
}
