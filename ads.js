//? override sdk
const gameName = window.__GLANCE_ENV.GAME_NAME
window.gameName = gameName
const publisherName = window.__GLANCE_ENV.PUBLISHER_NAME
const pageName = `${gameName}_${publisherName}`
const categoryName = publisherName
const baseAdUnitName = `${publisherName}_${gameName}`

const gameInput = { gameName, publisherName }
window.gameInput = gameInput

//loading scripts
$.getScript('https://g.glance-cdn.com/public/content/games/xiaomi/gamesAd.js', 'gpid.js')
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

// Objects for different ad format.
const LPMercObj = {
    adUnitName: `${baseAdUnitName}_Gameload_Top`,
    pageName, //Game Name
    categoryName, //Publisher Name
    placementName: 'Gameload',
    containerID: 'div-gpt-ad-2', //Div Id for banner
    height: 250,
    width: 300,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}
window.LPMercObj = LPMercObj

const StickyObj = {
    adUnitName: `${baseAdUnitName}_Ingame_Bottom`,
    pageName, //Game Name
    categoryName, //Publisher Name
    placementName: 'Ingame',
    containerID: 'banner-ad', //Div Id for banner
    height: 50,
    width: 320,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}
window.StickyObj = StickyObj

const LBBannerObj = {
    adUnitName: `${baseAdUnitName}_Leaderboard_Bottom`,
    pageName, //Game Name
    categoryName, //Publisher Name
    placementName: 'Leaderboard',
    containerID: 'div-gpt-ad-1', //Div Id for banner
    height: 250,
    width: 300,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}
window.LBBannerObj = LBBannerObj

function successCb() {
    console.log('set up lib success')
    window.showBumperAd()

    window.isAdSDKLoaded = true
}

function failCb(reason) {
    console.log('set up lib failed', reason)

    window.isAdSDKLoaded = true
}

window.isAdSDKLoaded = false

const replayObj = {
    adUnitName: `${baseAdUnitName}_FsReplay_Replay`,
    placementName: 'FsReplay',
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

const rewardObj = {
    adUnitName: `${baseAdUnitName}_FsRewarded_Rewarded`,
    placementName: 'FsRewarded',
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
