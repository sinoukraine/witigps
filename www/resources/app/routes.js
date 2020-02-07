var routes = [
    {
        path: '/',
        componentUrl: './resources/pages/home.html?v=1.3',
        name: 'home',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/panel-left/',
        panel: {
            componentUrl: './resources/pages/panel-left.html?v=1.3',
        },
        name: 'panel-left'
    },
    {
        path: '/asset-status-live/',
        componentUrl: './resources/pages/asset-status-live.html?v=1.4',
        name: 'asset-status-live',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/asset-protect/',
        componentUrl: './resources/pages/asset-protect.html?v=1.3',
        name: 'asset-protect',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/asset-edit/',
        componentUrl: './resources/pages/asset-edit.html?v=1.4',
        name: 'asset-edit',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/asset-upgrade/',
        componentUrl: './resources/pages/asset-upgrade.html?v=1.4',
        name: 'asset-upgrade',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/asset-alarm/',
        componentUrl: './resources/pages/asset-alarm.html?v=1.3',
        name: 'asset-alarm',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/asset-track/',
        componentUrl: './resources/pages/asset-track.html?v=1.4',
        name: 'asset-track',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/asset-playback/',
        componentUrl: './resources/pages/asset-playback.html?v=1.3',
        name: 'asset-playback',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/asset-playback-show/',
        componentUrl: './resources/pages/asset-playback-show.html?v=1.3',
        name: 'asset-playback-show',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/geofence-list/',
        componentUrl: './resources/pages/geofence-list.html?v=1.3',
        name: 'geofence-list',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/geofence/',
        componentUrl: './resources/pages/geofence.html?v=1.4',
        name: 'geofence',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/account-settings/',
        componentUrl: './resources/pages/account-settings.html?v=1.4',
        name: 'account-settings',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/contact-list/',
        componentUrl: './resources/pages/contact-list.html?v=1.3',
        name: 'contact-list',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/contact/',
        componentUrl: './resources/pages/contact.html?v=1.3',
        name: 'contact',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/recharge-credits/',
        componentUrl: './resources/pages/recharge-credits.html?v=1.3',
        name: 'recharge-credits',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/report-theft/',
        componentUrl: './resources/pages/report-theft.html?v=1.3',
        name: 'report-theft',
        options: {
            transition: 'f7-cover',
        },
    },
    {
        path: '/notifications/',
        componentUrl: './resources/pages/notifications.html?v=1.3',
        name: 'notifications',
        options: {
            transition: 'f7-cover',
        },
    },




    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './resources/pages/404.html',
        options: {
            transition: 'f7-cover',
        },
    },
];
