import ReactGA from 'react-ga'
import Raven from 'raven-js'

import { Env, Json } from './'

export default class self {
    static initialized = false

    static EVENT_CLICK = 'click'
    static EVENT_EMPTY = 'empty'
    static EVENT_FIT = 'fit'
    static EVENT_SWIPE = 'swipe'
    static EVENT_TIMEOUT = 'timeout'

    static VIEW_CHOOSE = 'choose'
    static VIEW_HOME = 'home'
    static VIEW_LOGIN = 'login'
    static VIEW_MAINTENANCE = 'maintenance'
    static VIEW_RATING = 'rating'
    static VIEW_RESULT = 'result'
    static VIEW_SPLASH = 'splash'
    static VIEW_UPDATE = 'update'
    static VIEW_WAIT = 'wait'

    static view(view) {
        if (self.initialize()) {
            if (Env.web()) {
                ReactGA.pageview(view)
            } else {
                window.ga.trackView(view)
            }
        }
    }

    static event(name, payload = {}) {
        if (self.initialize()) {
            if (Env.web()) {
                ReactGA.event({
                    category: 'event',
                    action: name,
                    label: Json.encode(payload),
                })
            } else {
                window.ga.trackEvent('event', name, Json.encode(payload))
            }
        }
    }

    static error(exception) {
        if (self.initialize()) {
            Raven.captureException(exception)
        } else {
            console.error(exception)
        }
    }

    static initialize() {
        if (Env.production()) {
            if (!self.initialized) {
                if (Env.web()) {
                    ReactGA.initialize(GA_CODE_WEB)
                } else {
                    window.ga.startTrackerWithId(GA_CODE_CORDOVA)
                }
                Raven.config(SENTRY_DSN).install()
                self.initialized = true
            }
            return true
        }
        return false
    }
}
