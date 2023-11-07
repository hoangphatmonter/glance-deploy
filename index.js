System.register(['./application.js'], function (_export, _context) {
    'use strict'

    var Application, canvas, $p, bcr, application

    function topLevelImport(url) {
        return System['import'](url)
    }

    return {
        setters: [
            function (_applicationJs) {
                Application = _applicationJs.Application
            },
        ],
        execute: function () {
            console.warn('Cocos loaded')

            canvas = document.getElementById('GameCanvas')
            $p = canvas.parentElement
            bcr = $p.getBoundingClientRect()
            canvas.width = bcr.width
            canvas.height = bcr.height
            application = new Application()
            topLevelImport('cc')
                .then(function (engine) {
                    return new Promise(function (resolve) {
                        var waitGameCore = setInterval(function () {
                            if (!window.__gameCoreReady) return
                            clearInterval(waitGameCore)

                            console.warn('Cocos application init')

                            if (window.__sdkLoadingCount < 40) {
                                window.__sdkLoadingCount = 40
                            }

                            resolve(application.init(engine))
                        }, 50)
                    })
                })
                .then(function () {
                    console.warn('Cocos application start')
                    if (window.__sdkLoadingCount < 50) {
                        window.__sdkLoadingCount = 50
                    }

                    const { Analytics } = GameCore.Plugins
                    game.analytics.event(Analytics.Events.LOAD_START)

                    return application.start()
                })
                .then(function () {
                    console.warn('Cocos application started')
                    if (window.__sdkLoadingCount < 60) {
                        window.__sdkLoadingCount = 60
                    }

                    const { Console } = GameCore.Plugins
                    if (!Console) return
                    Console.removeVConsole()
                })
                ['catch'](function (err) {
                    console.error(err)
                })
        },
    }
})
