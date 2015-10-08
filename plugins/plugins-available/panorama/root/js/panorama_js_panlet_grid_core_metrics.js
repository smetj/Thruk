Ext.define('TP.PanletGridCoreMetrics', {
    extend: 'TP.PanletGrid',

    title:  'Core Performance Metrics',
    height: 200,
    width:  340,
    hideSettingsForm: ['url'],
    initComponent: function() {
        this.callParent();
        this.xdata.url = 'panorama.cgi?task=stats_core_metrics';
        this.reloadOnSiteChanges = true;
    }
});

Ext.define('TP.PanletGridCheckMetrics', {
    extend: 'TP.PanletGrid',

    title:  'Check Performance Metrics',
    height: 160,
    width:  360,
    hideSettingsForm: ['url'],
    initComponent: function() {
        this.callParent();
        this.xdata.url = 'panorama.cgi?task=stats_check_metrics';
        this.reloadOnSiteChanges = true;
    }
});
