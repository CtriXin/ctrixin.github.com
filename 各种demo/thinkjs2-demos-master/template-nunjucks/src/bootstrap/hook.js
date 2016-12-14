/**
 * this file will be loaded before server started
 * you can register app hook
 */
'use strict';

import debugToolbar from 'think-debug-toolbar';

let conf = {
    panels: ['request', 'session', 'view', 'template', 'response', 'config', 'info'],
    depth: 4,
    extra_attrs: '',
    disabled: false,
    sort: false
};

think.middleware('debug_toolbar', debugToolbar(conf));