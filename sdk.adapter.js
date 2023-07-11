const SAMPLE_ERROR = [
    'INVALID_PARAM',
    'SAME_CONTEXT',
    'NETWORK_FAILURE',
    'PENDING_REQUEST',
    'CLIENT_UNSUPPORTED_OPERATION',
]

var windowUrl = window.location.href
var splittedUrl = windowUrl.split('?')
var allIds = splittedUrl[1].split('&')

// split all three key values required for calling api

var userIdUnFormatted = allIds[0].split('=')
var apiKeyUnFormatted = allIds[1].split('=')
var impIdUnFormatted = allIds[2].split('=')
var glanceIdUnFormatted = allIds[3].split('=')

var userId = userIdUnFormatted[1]
var impressionId = impIdUnFormatted[1]
var apiKey = apiKeyUnFormatted[1]
var glanceId = glanceIdUnFormatted[1]

var gameName = window.gameName

var ad_reward_load_resolve = null
var ad_reward_load_reject = null

var ad_replay_load_resolve = null
var ad_replay_load_reject = null

// ? Backup original function
var originReplayEvent = window.replayEvent

// ! Overwrite replayEvent for custom flow of Leaderboard.
// ? Why overwrite: this function is call directly from Leaderboard.js, can't be make other function to call it.
// * Because: the original flow conflict with ads flow of ads plugin.
window.replayEvent = function () {
    // ! Temporarily disable on v2 final 1.0.0
    // If leaderboard is open, close it, and show replay ad after leaderboard is closed
    if (window.leaderboard_callback) {
        console.log('Leaderboard is open, close it and show replay ad after leaderboard is closed')
        window.showGame()
        var callback = window.leaderboard_callback
        window.leaderboard_callback = null
        callback()
        return
    }

    console.log('Leaderboard is not open, show replay ad')
    originReplayEvent()
}

// * Extends function rewardedCallbacks for custom flow of ads plugin.
// ? Why: the original flow conflict with ads flow of ads plugin.
function listensAdEvents(obj) {
    var replayAdUnitName = window.replayObj.adUnitName
    var rewardAdUnitName = window.rewardObj.adUnitName

    obj.adInstance?.registerCallback('onAdLoadSucceed', (data) => {
        console.log('onAdLoadSucceeded Rewarded CALLBACK', data)
        if (obj.adUnitName === replayAdUnitName) {
            window.is_replay_noFill = false

            if (!ad_replay_load_resolve) {
                console.warn('replay load resolve is null')
                return
            }

            // ? Delay for fix a bug glance ad not sync with game ???
            setTimeout(() => {
                ad_replay_load_resolve()
                ad_replay_load_resolve = null
            }, 500)
        }
        if (obj.adUnitName === rewardAdUnitName) {
            window.is_rewarded_noFill = false

            if (!ad_reward_load_resolve) {
                console.warn('reward load resolve is null')
                return
            }

            // ? Delay for fix a bug glance ad not sync with game ???
            setTimeout(() => {
                ad_reward_load_resolve()
                ad_reward_load_resolve = null
            }, 500)
        }
    })

    obj.adInstance?.registerCallback('onAdLoadFailed', (data) => {
        console.log('onAdLoadFailed Rewarded CALLBACK', data)
        if (obj.adUnitName === replayAdUnitName) {
            window.is_replay_noFill = true
            window.replayInstance = null

            if (!ad_replay_load_reject) {
                console.warn('replay load reject is null')
                return
            }

            // ? Delay for fix a bug glance ad not sync with game ???
            setTimeout(() => {
                ad_replay_load_reject()
                ad_replay_load_reject = null
            }, 500)
        }
        if (obj.adUnitName === rewardAdUnitName) {
            window.is_rewarded_noFill = true
            window.rewardInstance = null

            if (!ad_reward_load_reject) {
                console.warn('reward load reject is null')
                return
            }

            // ? Delay for fix a bug glance ad not sync with game ???
            setTimeout(() => {
                // ad_reward_load_reject()

                // ? Glance must when reward ad load failed, will be rewarded
                ad_reward_load_resolve()
                ad_reward_load_resolve = null

                ad_reward_load_reject = null
            }, 500)
        }
    })

    obj.adInstance?.registerCallback('onAdDisplayed', (data) => {
        console.log('onAdDisplayed Rewarded CALLBACK', data)
    })

    obj.adInstance?.registerCallback('onAdClosed', (data) => {
        console.log('onAdClosed Rewarded CALLBACK', data)

        if (obj.adUnitName == rewardAdUnitName) {
            window.isRewardedAdClosedByUser = true
        }

        processAdsClose()

        window.isRewardGranted = false
        window.isRewardedAdClosedByUser = false
    })

    obj.adInstance?.registerCallback('onAdClicked', (data) => {
        console.log('onAdClicked Rewarded CALLBACK', data)
    })

    obj.adInstance?.registerCallback('onRewardsUnlocked', (data) => {
        console.log('onRewardsUnlocked Rewarded CALLBACK', data)

        if (obj.adUnitName === rewardAdUnitName) {
            window.isRewardGranted = true
        }
    })
}

// * Extents runOnAdClosed for custom flow of ads plugin.
// ? Why: the original flow conflict with ads flow of ads plugin.
function processAdsClose() {
    // If user close ad while replaying
    if (window._triggerReason === 'replay') {
        window.replayInstance = null

        window.handleNextLevel()
    } else if (window._triggerReason === 'reward') {
        // If user close ad while getting a reward
        window._triggerReason = ''
        window.rewardInstance = null

        if (!window.isRewardGranted && window.isRewardedAdClosedByUser) {
            window.handleRewardedFail()
        } else {
            // ? Glance must when reward ad show failed, will be rewarded
            window.handleRewardedSuccess()
        }
    }
}

// ? Add functions with glance
function hideStickyBannerAd() {
    // eslint-disable-next-line no-undef
    $('#bannerOverlay').css('display', 'none')
}

function loadRewardedAd(resolve, reject) {
    ad_reward_load_resolve = resolve
    ad_reward_load_reject = reject

    if (!window.GlanceGamingAdInterface) {
        ad_reward_load_resolve()
        return
    }

    window.rewardInstance = window.GlanceGamingAdInterface.loadRewardedAd(
        window.rewardObj,
        listensAdEvents
    )

    return window.rewardInstance
}

function showRewardedAd() {
    window._triggerReason = 'reward'

    if (!window.GlanceGamingAdInterface) {
        processAdsClose()
        return
    }

    if (!window.is_rewarded_noFill) {
        window.GlanceGamingAdInterface.showRewarededAd(window.rewardInstance)
    } else {
        processAdsClose()
    }
}

function loadReplayAd(resolve, reject) {
    ad_replay_load_resolve = resolve
    ad_replay_load_reject = reject

    if (!window.GlanceGamingAdInterface) {
        ad_replay_load_reject()
        return
    }

    window.replayInstance = window.GlanceGamingAdInterface.loadRewardedAd(
        window.replayObj,
        listensAdEvents
    )

    return window.replayInstance
}

function showReplayAd() {
    window._triggerReason = 'replay'

    if (!window.GlanceGamingAdInterface) {
        processAdsClose()
        return
    }

    if (!window.is_replay_noFill) {
        window.GlanceGamingAdInterface.showRewarededAd(window.replayInstance)
    } else {
        processAdsClose()
    }
}

function getAdsAsync(isRewardedAds) {
    return Promise.resolve({
        isRewarded: isRewardedAds,
        loadAsync: function loadAsync() {
            return new Promise((resolve, reject) => {
                if (this.isRewarded) {
                    console.log('load rewarded ad')
                    loadRewardedAd(resolve, reject)
                } else {
                    console.log('load replay ad')
                    loadReplayAd(resolve, reject)
                }
            })
        },
        showAsync: function showAsync() {
            return new Promise((resolve, reject) => {
                if (this.isRewarded) {
                    window.handleRewardedFail = () => {
                        if (
                            window.GameCore &&
                            !window.isRewardGranted &&
                            window.isRewardedAdClosedByUser
                        ) {
                            const error = new window.GameCore.Ads.AdError(
                                'USER_INPUT',
                                'User close rewarded ad'
                            )
                            reject(error)
                            return
                        }

                        reject()
                    }
                    window.handleRewardedSuccess = resolve

                    showRewardedAd()
                } else {
                    window.handleNextLevel = resolve
                    showReplayAd()
                }
            })
        },
        getPlacementID: function getPlacementID() {
            return ''
        },
    })
}

//? https://glanceinmobi.atlassian.net/wiki/spaces/GSC/pages/815628362/Game+requirements+and+performance
// ? Global functions for Glance
window.pauseEvent = function pauseEvent() {
    console.warn('pauseEvent: method is not implemented')
}

window.resumeEvent = function resumeEvent() {
    console.warn('resumeEvent: method is not implemented')
}

window.replayGameEvent = function replayGameEvent() {
    console.warn('replayGameEvent: method is not implemented')
}

window.gotoHomeEvent = function gotoHomeEvent() {
    console.warn('gotoHomeEvent: method is not implemented')
}

// ? Global functions for Level Game mode
window.nextLevelEvent = function nextLevelEvent() {
    console.warn('nextLevelEvent: method is not implemented')
}

window.gotoLevel = function gotoLevel(_level) {
    console.warn('gotoLevel: method is not implemented')
}

// ? Global functions for callback from analytics
window.handleNextLevel = function handleNextLevel() {
    console.warn('handleNextLevel: method is not implemented')
}

window.handleRewardedFail = function handleRewardedFail() {
    console.warn('handleRewardedFail: method is not implemented')
}

window.handleRewardedSuccess = function handleRewardedSuccess() {
    console.warn('handleRewardedSuccess: method is not implemented')
}

window.gotoLevel = function gotoLevel(_level) {
    console.warn('gotoLevel: method is not implemented')
}

window.enableSound = function enableSound(_enable) {
    console.warn('enableSound: method is not implemented')
}

window.getLoadingPerc = function getLoadingPerc() {
    console.warn('getLoadingPerc: method is not implemented')
}

let playersData = []
const useLog = false

let maxPlayers = playersData.length // for list connected player

let pName = 'Default Name'
let pId = '1'
let pASID = '1'
let pPhoto = ''
let pSignature = '1'

//? glance data
var glanceImpressionId = '1'
var glanceApiKey = '1'
var glanceGlanceId = '1'
var glanceGpID = '1'

/*
 * Helper Functions
 */
function getRandomError() {
    return SAMPLE_ERROR[Math.floor(SAMPLE_ERROR.length * Math.random())]
}

const FBUtils = {
    log: function log() {
        if (!useLog) return
        const args = []
        args.push('[sdkFakeFBInstant Mock]:')

        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i])
        }

        console.log(...args)
    },
    getQueryString: function getQueryString() {
        const qd = {}
        if (location.search)
            location.search
                .substr(1)
                .split('&')
                .forEach((item) => {
                    const s = item.split('=')
                    const k = s[0]
                    const v = s[1] && decodeURIComponent(s[1])
                    ;(qd[k] = qd[k] || []).push(v)
                })
        return qd
    },
    returnAndLog: function returnAndLog(value) {
        FBUtils.log(value)
        return value
    },
    returnUserData: function returnUserData(value) {
        const initialized = sdkFakeFBInstant.__mockState.initialized

        if (initialized) {
            return FBUtils.returnAndLog(value)
        }

        FBUtils.log('User Data is not available until startGameAsync has resolved')
        return null
    },
    getFromLocalStorage: function getFromLocalStorage(store, keys) {
        return new Promise((resolve) => {
            let data = localStorage.getItem(store)
            const response = {}

            if (data) {
                data = JSON.parse(data)
                keys.forEach((key) => {
                    if (data[key] !== 'undefined') {
                        response[key] = data[key]
                    }
                })
            }

            FBUtils.log(response)
            resolve(response)
        })
    },
    writeToLocalStorage: function writeToLocalStorage(store, obj) {
        return new Promise((resolve) => {
            const currentData = JSON.parse(localStorage.getItem(store))
            const data = { ...currentData, ...obj }

            FBUtils.log(JSON.stringify(data))
            localStorage.setItem(store, JSON.stringify(data))
            resolve()
        })
    },
}

const sdkFakeFBInstant = {
    __mockState: {
        initialized: false,
    },
    leaderboardEntry: (rank, score, isPlayer = false) => {
        return {
            getRank: function getRank() {
                return rank
            },
            getScore: function getScore() {
                return score
            },
            getExtraData: function getExtraData() {
                return JSON.stringify({})
            },
            getPlayer: function getPlayer() {
                return sdkFakeFBInstant.leaderboardPlayer(rank, isPlayer)
            },

            // fully interfaces
            getFormattedScore: function getFormattedScore() {
                return ''
            },
            getTimestamp: function getTimestamp() {
                return 0
            },
        }
    },

    leaderboardPlayer: (rank, score, isPlayer) => {
        return {
            getID: function getID() {
                return isPlayer ? sdkFakeFBInstant.player.getID() : 'Rank #' + rank
            },
            getName: function getName() {
                return isPlayer ? 'You' : 'Rank #' + rank
            },
            getPhoto: function getPhoto() {
                return ''
            },
        }
    },

    player: {
        getName: function getName() {
            return FBUtils.returnUserData(pName)
        },
        getPhoto: function getPhoto() {
            return FBUtils.returnUserData(pPhoto)
        },
        getID: function getID() {
            return FBUtils.returnUserData(pId)
        },

        //? glance data function for google analytics
        getGlanceImpId: function getGlanceImpId() {
            return FBUtils.returnUserData(glanceImpressionId)
        },
        getGlanceApiKey: function getGlanceApiKey() {
            return FBUtils.returnUserData(glanceApiKey)
        },
        getGlanceId: function getGlanceId() {
            return FBUtils.returnUserData(glanceGlanceId)
        },
        getGlanceGpId: function getGlanceGpId() {
            return FBUtils.returnUserData(glanceGpID)
        },

        getASIDAsync: function getASIDAsync() {
            return FBUtils.returnUserData(pASID)
        },
        getDataAsync: function getDataAsync(keys) {
            FBUtils.log('player.getDataAsync')
            return FBUtils.getFromLocalStorage('sdkPlayerData.' + gameName, keys)
        },
        setDataAsync: function setDataAsync(obj) {
            FBUtils.log('player.setDataAsync')
            return FBUtils.writeToLocalStorage('sdkPlayerData.' + gameName, obj)
        },
        getStatsAsync: function getStatsAsync(keys) {
            FBUtils.log('player.getStatsAsync')
            if (!keys) keys = []
            return FBUtils.getFromLocalStorage('sdkPlayerStats.' + gameName, keys)
        },
        setStatsAsync: function setStatsAsync(obj) {
            FBUtils.log('player.setStatsAsync')
            return FBUtils.writeToLocalStorage('sdkPlayerStats.' + gameName, obj)
        },
        incrementStatsAsync: function incrementStatsAsync(obj) {
            return new Promise((resolve) => {
                FBUtils.getFromLocalStorage('sdkPlayerStats.' + gameName, Object.keys(obj)).finally(
                    (storedObject) => {
                        for (const key in storedObject) {
                            storedObject[key] += obj[key]
                        }

                        FBUtils.writeToLocalStorage(
                            'sdkPlayerStats.' + gameName,
                            storedObject
                        ).finally(() => {
                            resolve()
                        })
                    }
                )
            })
        },
        flushDataAsync: function flushDataAsync() {
            return new Promise((resolve) => {
                FBUtils.log('player.flushDataAsync')
                FBUtils.writeToLocalStorage('sdkPlayerData.' + gameName, {}).finally(() => {
                    resolve()
                })
            })
        },
        getConnectedPlayersAsync: function getConnectedPlayersAsync() {
            return new Promise((resolve) => {
                let connectedPlayers = []
                const initialized = sdkFakeFBInstant.__mockState.initialized

                if (initialized) {
                    for (let id = 0; id < maxPlayers; id++) {
                        const _playersData$id = playersData[id]
                        const playerId = _playersData$id.playerId
                        const name = _playersData$id.name
                        const photo = _playersData$id.photo
                        connectedPlayers.push({
                            id: playerId,
                            name: name,
                            photo: photo,
                            getID() {
                                return this.id
                            },
                            getName() {
                                return this.name
                            },
                            getPhoto() {
                                return this.photo
                            },
                        })
                    }
                } else {
                    FBUtils.log(
                        'getConnectedPlayersAsync',
                        'Connected players data is not available before startGameAsync resolves'
                    )
                }

                FBUtils.log('getConnectedPlayersAsync', 'players: ', connectedPlayers)
                resolve(connectedPlayers)
            })
        },
        getSignedPlayerInfoAsync: function getSignedPlayerInfoAsync() {
            return new Promise((resolve) => {
                const signedPlayerInfo = {
                    getSignature: function getSignature() {
                        return pSignature
                    },
                    getPlayerID: function getPlayerID() {
                        return pId
                    },
                }
                resolve(signedPlayerInfo)
            })
        },
    },
    context: {
        id: FBUtils.getQueryString().context_source_id || '',
        type: FBUtils.getQueryString().context_type || 'SOLO',
        getID: function getID() {
            return sdkFakeFBInstant.context.id
        },
        chooseAsync: function chooseAsync() {
            return new Promise((resolve, reject) => {
                const popup = createElementFromHTML(
                    '<div style="z-index: 1000000000; display: flex; align-items: center; height: 100%; width: 56vh;max-width:100vh; background-color: rgba(31, 120, 136, 0.48); position: absolute;margin:auto;left:0;right:0"></div'
                )

                const buttonClose = createElementFromHTML(
                    `<button style="width:100px;height:70px;cursor:pointer;position:absolute;right: 10px;top:10px">Close</button>`
                )
                buttonClose.onclick = (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    reject({ code: 'USER_INPUT', message: 'User close popup!' })
                    popup.remove()
                }
                popup.appendChild(buttonClose)
                FBUtils.log('context.chooseAsync')
                sdkFakeFBInstant.context.id = '123456789'
                sdkFakeFBInstant.context.type = 'THREAD'
                setTimeout(() => {
                    const r = Math.random() * 100
                    const isFailed = r < window.GameCore.Configs.MatchMockFailRate
                    if (isFailed) {
                        reject({ code: getRandomError(), message: 'Random error' })
                        return
                    }
                    document.body.append(popup)
                }, 500)
            })
        },
        switchAsync: function switchAsync(contextId) {
            return new Promise((resolve) => {
                FBUtils.log('context.switchAsync')
                sdkFakeFBInstant.context.id = contextId
                sdkFakeFBInstant.context.type = 'THREAD'
                resolve(contextId)
            })
        },
        createAsync: function createAsync() {
            return new Promise((resolve, reject) => {
                const opponent = playersData.filter((p) => p.playerId != pId)[0]
                const popup = createElementFromHTML(
                    `<div style="height: 40vh;width: 53vh;max-width: 95vw;position:absolute;background-color: rgba(31, 120, 136, 0.48);border-radius: 2vh;margin: auto;right: 0;left: 0;top: 0;bottom: 0;display: flex;flex-direction:column;justify-content:space-evenly;"><div style="display:flex; justify-content:center; width: 100%"><div style="width: 100px;height: 100px;overflow: hidden;border-radius: 50%;"><img style="height:100%"src="${pPhoto}"/></div><div style="width: 100px;height: 100px;overflow: hidden;border-radius: 50%;"><img style="height:100%"src="${opponent.photo}"/></div></div><p style="color: white;font-size: 21px;text-align: center;margin: 10px 40px 10px 40px;">Send an invitation to play Game<br>through Messenger.</p></div>`
                )
                const buttonPlay = createElementFromHTML(
                    '<button style="border: none;background-color: #1877f2;color: #fff;width: 90%;height: 50px;border-radius: 15px;margin-left: auto;margin-right: auto;font-size: 20px;cursor: pointer;">Play</button>'
                )
                buttonPlay.onclick = (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    FBUtils.log('context.chooseAsync')
                    sdkFakeFBInstant.context.id = '123456789'
                    sdkFakeFBInstant.context.type = 'THREAD'
                    resolve(sdkFakeFBInstant.context.id)
                    popup.remove()
                }
                const buttonClose = createElementFromHTML(
                    '<button style="border: none;background-color: #1877f2;color: #fff;width: 80px;height: 50px;font-size: 20px;cursor: pointer;position:absolute;top:10px;right:10px;border-radius: 10px;">Close</button>'
                )
                buttonClose.onclick = (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    reject({ code: 'USER_INPUT', message: 'User close popup!' })
                    popup.remove()
                }
                popup.append(buttonPlay)
                popup.append(buttonClose)

                setTimeout(() => {
                    const r = Math.random() * 100
                    const isFailed = r < window.GameCore.Configs.MatchMockFailRate
                    if (isFailed) {
                        reject({ code: getRandomError(), message: 'Random error' })
                        return
                    }
                    document.body.append(popup)
                }, 500)
            })
        },
        getType: function getType() {
            return FBUtils.returnAndLog(sdkFakeFBInstant.context.type)
            // return Utils.returnAndLog('THREAD');
        },
        isSizeBetween: function isSizeBetween() {
            // return Utils.returnAndLog(true);
            return FBUtils.returnAndLog(false)
        },
        getPlayersAsync: function getPlayersAsync() {
            return new Promise((resolve) => {
                const players = playersData.map((p) => ({
                    getID: function getID() {
                        return p.playerId
                    },
                    getName: function getName() {
                        return p.name
                    },
                    getPhoto: function getPhoto() {
                        return p.photo
                    },
                }))
                FBUtils.log('context.getPlayersAsync', 'players: ', players)
                resolve(players)
            })
        },
    },
    getLocale: function getLocale() {
        var queryString = FBUtils.getQueryString()
        let langCode = window.__GAME_LANGUAGE || 'en'
        if (queryString.hl && queryString.hl.length > 0) {
            langCode = queryString.hl[0]
        }
        console.log({ langCode })
        return langCode + '_VN'
    },
    initializeAsync: function initializeAsync() {
        let fakeName = localStorage.getItem('randomUserName')

        playersData = [
            {
                name: fakeName,
                photo: '',
                playerId: userId,
                signature: '1',

                //? glance data
                impressionId,
                apiKey,
                glanceId,
                gpID: window.gpID,
            },
        ]

        window.__glancePlayerData = playersData[0]

        var playerIndex = 0 // for mock opponent

        maxPlayers = playersData.length // for list connected player

        pName = playersData[playerIndex].name
        pId = playersData[playerIndex].playerId
        pPhoto = playersData[playerIndex].photo
        pSignature = playersData[playerIndex].signature

        //? glance data
        glanceImpressionId = playersData[playerIndex].impressionId
        glanceApiKey = playersData[playerIndex].apiKey
        glanceGlanceId = playersData[playerIndex].glanceId
        glanceGpID = playersData[playerIndex].gpID

        return new Promise(function (resolve) {
            // Inject mock css
            // var stylesheet = document.createElement('link');
            // stylesheet.href = 'mock.css';
            // stylesheet.rel = 'stylesheet';
            // stylesheet.type = 'text/css';
            // document.head.appendChild(stylesheet);

            const maximumTimeWait = 5000
            const startTime = Date.now()

            const waitForAdSDKLoaded = setInterval(function waitAdInterval() {
                const currentTime = Date.now()
                if (currentTime - startTime < maximumTimeWait) {
                    if (!window.isAdSDKLoaded) return

                    if (window.GlanceGamingAdInterface) {
                        //? load success, validate if library initialized
                        if (!window.GlanceGamingAdInterface.isLibraryInitialized) return
                        if (!window.GlanceGamingAdInterface.isLibraryInitialized()) return
                        if (!window.GlanceGamingAdInterface.showStickyBannerAd) return
                        if (!window.GlanceGamingAdInterface.loadRewardedAd) return
                    } else {
                        // load failed
                        // continue to the game.
                    }
                } else {
                    // maximum time waiting -> slow internet
                    //? if ads is disable -> they will response quickly
                    console.log('maximum time wait for the ad sdk loading')
                }

                //? slow load ad sdk -> force isAdSDKLoaded failed
                window.isAdSDKLoaded = true

                FBUtils.log('initializeAsync')
                sdkFakeFBInstant.__mockState.initialized = true
                clearInterval(waitForAdSDKLoaded)
                resolve()
            })
        })
    },
    setLoadingProgress: function setLoadingProgress(percentage) {
        window.progressBar(percentage)
    },
    startGameAsync: function startGameAsync() {
        return new Promise((resolve) => {
            FBUtils.log('startGameAsync', 'Showing game start dialog')

            sdkFakeFBInstant.__mockState.initialized = true
            resolve()
        })
    },
    quit: function quit() {
        FBUtils.log('QUIT was called. At this point the game will exit')
    },
    updateAsync: function updateAsync(config) {
        logMessage(config.data || {})
        return new Promise((resolve, reject) => {
            FBUtils.log('updateAsync')

            if (config.image) {
                resolve()
            } else {
                reject()
            }
        })
    },
    getEntryPointData: function getEntryPointData() {
        // example: http://localhost:8080/?entryPointData={a:1,b:2,c:3}');
        const queryString = FBUtils.getQueryString()
        FBUtils.log(
            'getEntryPointData',
            'query string: ',
            queryString,
            'entry point data: ',
            queryString.entryPointData
        )

        if (queryString.entryPointData) {
            return JSON.parse(decodeURIComponent(queryString.entryPointData[0]))
        }

        return null
    },
    getEntryPointAsync: function getEntryPointAsync() {
        return new Promise((resolve) => {
            resolve('admin_message')
        })
    },
    setSessionData: function setSessionData(object) {
        FBUtils.log(
            'setSessionData',
            'Object to be persisted',
            object,
            '(Please note, while using the mock SDK, setSessionData will have no effect.)'
        )
    },
    getPlatform: function getPlatform() {
        return 'WEB'
    },
    getSDKVersion: function getSDKVersion() {
        return '6.3'
    },
    getSupportedAPIs: function getSupportedAPIs() {
        const supportedAPIs = []

        for (let prop in sdkFakeFBInstant) {
            supportedAPIs.push(prop)
        }

        for (let prop in sdkFakeFBInstant.player) {
            supportedAPIs.push(`player.${prop}`)
        }

        for (let prop in sdkFakeFBInstant.context) {
            supportedAPIs.push(`context.${prop}`)
        }

        return supportedAPIs
    },
    shareAsync: function shareAsync() {
        return true
    },
    switchGameAsync: function switchGameAsync() {
        return Promise.reject(
            new Error('sdkFakeFBInstant.switchAsync is not available in the Mocked SDK.')
        )
    },
    logEvent: function logEvent() {
        // FBUtils.log('logEvent', eventName, value, parameters)
        return null
    },
    onPause: function onPause(callback) {
        window.onblur = () => {
            FBUtils.log('onPause', 'Interruption event triggered')
            callback()
        }
    },
    getLeaderboardAsync: function getLeaderboardAsync() {
        return new Promise((resolve, reject) => {
            if (!('getLeaderBoardData' in window)) {
                reject('getLeaderBoardData is not defined')
                return
            }

            window.getLeaderBoardData((data) => {
                if (typeof data !== 'object') {
                    reject()
                    return
                }
                if (Array.isArray(data)) {
                    reject()
                    return
                }

                const userRank = Number(String(data.user_current_rank).split('/')[0])
                const userScore = Number(data.current_user_max_score.scores__max)
                const userMaxScore = Number(data.current_user_max_score.scores__max)
                resolve({
                    getEntriesAsync: function getEntriesAsync(limit = 20, offset = 0) {
                        const entries = []
                        for (let index = offset; index < data.score_details.length; index++) {
                            entries.push(
                                sdkFakeFBInstant.leaderboardEntry(
                                    index + 1,
                                    Number(data.score_details[index].scores),
                                    index < limit + offset && index + 1 == userRank
                                )
                            )
                        }
                        return Promise.resolve(entries)
                    },
                    getConnectedPlayerEntriesAsync: function getConnectedPlayerEntriesAsync() {
                        return Promise.resolve([])
                    },
                    getPlayerEntryAsync: function getPlayerEntryAsync() {
                        return Promise.resolve(
                            sdkFakeFBInstant.leaderboardEntry(userRank, userScore, true)
                        )
                    },
                    setScoreAsync: function setScoreAsync(score) {
                        if (score <= userMaxScore) {
                            return Promise.resolve(
                                sdkFakeFBInstant.leaderboardEntry(userRank, userMaxScore, true)
                            )
                        }
                        return new Promise((resolve, reject) => {
                            window.sendLeaderBoardData(score, (res) => {
                                if (res === 'error') {
                                    reject('error')
                                } else {
                                    resolve(
                                        sdkFakeFBInstant.leaderboardEntry(userRank, score, true)
                                    )
                                }
                            })
                        })
                    },
                })
            })
        })
    },
    postSessionScoreAsync: function postSessionScoreAsync() {
        return Promise.resolve()
    },
    loadBannerAdAsync: function loadBannerAdAsync(_placementId) {
        clearInterval(this.waitAdInterval)
        this.waitAdInterval = setInterval(() => {
            if (!window.GlanceGamingAdInterface) return

            if (!window.GlanceGamingAdInterface?.isLibraryInitialized()) return

            clearInterval(this.waitAdInterval)

            console.log('loadBannerAdAsync', window.StickyObj)

            // ? refresh banner per 30s
            window.refreshStickyBannerAd()

            if (window.StickyBannerInstance) {
                window.StickyBannerInstance.destroyAd()
            }

            window.StickyBannerInstance = window.GlanceGamingAdInterface.showStickyBannerAd(
                window.StickyObj,
                window.bannerCallbacks
            )

            return window.StickyBannerInstance
        }, 100)
    },
    hideBannerAdAsync: function hideBannerAdAsync() {
        hideStickyBannerAd()
        return true
    },
    matchPlayerAsync: function matchPlayerAsync() {
        return Promise.reject()
    },
    getRewardedVideoAsync: function getRewardedVideoAsync(_placementId) {
        return getAdsAsync(true)
    },

    getInterstitialAdAsync: function getInterstitialAdAsync(placementID) {
        return getAdsAsync(false)
    },
}
window.FBInstant = sdkFakeFBInstant

const encode = (obj) => {
    return encodeURIComponent(JSON.stringify(obj))
}

const logMessage = (entryPointData) => {
    const opponentId =
        playersData[0].playerId === pId ? playersData[1].playerId : playersData[0].playerId
    console.log(
        `Link to receive message: \n${
            document.location.origin + document.location.pathname
        }?playerId=${opponentId}&context_source_id=123456789&context_type=THREAD&entryPointData=${encode(
            entryPointData
        )}}`
    )
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div')
    div.innerHTML = htmlString.trim()

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild
}
