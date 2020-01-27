var routes = [
    {
        path: '/',
        componentUrl: './resources/pages/home.html?v=1.3',
        name: 'home',
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
    },
    {
        path: '/asset-protect/',
        componentUrl: './resources/pages/asset-protect.html?v=1.3',
        name: 'asset-protect',
    },
    {
        path: '/asset-edit/',
        componentUrl: './resources/pages/asset-edit.html?v=1.3',
        name: 'asset-edit',
    },
    {
        path: '/asset-alarm/',
        componentUrl: './resources/pages/asset-alarm.html?v=1.3',
        name: 'asset-alarm',
    },
    {
        path: '/asset-track/',
        componentUrl: './resources/pages/asset-track.html?v=1.4',
        name: 'asset-track',
    },
    {
        path: '/geofence-list/',
        componentUrl: './resources/pages/geofence-list.html?v=1.3',
        name: 'geofence-list',
    },



    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './resources/pages/404.html',
    },
];
