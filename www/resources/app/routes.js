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
        componentUrl: './resources/pages/asset-status-live.html?v=1.3',
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
        path: '/report-theft/',
        componentUrl: './resources/pages/report-theft.html?v=1.3',
        name: 'report-theft',
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
