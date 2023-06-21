//This function will ad the stickyBanner UI
function addStickyBanner() {
    if (document.getElementById('bannerOverlay') != undefined) return

    var stickyBannerDiv = `<div id="bannerOverlay">
                            <div id="banner-ad">
            
                            </div>
                        </div>`

    $('body').append($(stickyBannerDiv))
    console.log('stickyBannerDiv added...')
}

var runInterval
function refreshStickyBannerAd() {
    console.log('refreshStickyBannerAd')
    addStickyBanner()
    showStickyBannerAd()
    var timesRun = 30000

    clearInterval(runInterval)
    runInterval = setInterval(() => {
        if (!window.GlanceGamingAdInterface) return

        if (StickyBannerInstance) {
            console.log(StickyBannerInstance, 'if in interval')
            StickyBannerInstance.destroyAd()
        }

        StickyBannerInstance = window.GlanceGamingAdInterface.showStickyBannerAd(
            StickyObj,
            bannerCallbacks
        )
    }, timesRun)
}

function showStickyBannerAd() {
    $('#bannerOverlay').css('display', 'flex')
}
