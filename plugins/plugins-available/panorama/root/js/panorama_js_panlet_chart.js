Ext.define('TP.chart.NumericAxis', {
    extend: 'Ext.chart.axis.Numeric',
    alias:  'axis.tp_numeric',
    constructor: function(config) {
        this.callParent([config]);
        this._getRange = this.getRange;
        this.getRange = function() {
            var range = this._getRange();
            range.max = Math.floor(range.max/10)*10+10;
            return(range);
        }
        this.type = 'Numeric';
    }
});

Ext.define('TP.chart.TimeAxis', {
    extend: 'Ext.chart.axis.Numeric',
    alias:  'axis.tp_time',
    constructor: function(config) {
        this.callParent([config]);
        this._calcEnds = this.calcEnds;
        this.calcEnds = function() {
            var me = this;
            range = me.getRange(),
            min   = range.min,
            max   = range.max,
            steps = me.majorTickSteps + 1;
            if(min.getTime) { min = min.getTime(); }
            var step  = (max-min)/steps;
            out = {from:min, to:max, step:step, steps:steps};
            return(out);
        }
        this.type = 'Numeric';
    }
});

Ext.define('TP.PanletChart', {
    extend: 'TP.Panlet',

    title:  'chart',
    width:  640,
    height: 260,
    initComponent: function() {
        var panel = this;
        panel.callParent();
        panel.xdata.nr_dots = 60;

        panel.loader = {
            autoLoad: false,
            scope:    panel,
            url:      '',
            ajaxOptions: { method: 'POST' },
            loading:  false,
            listeners: {
                'beforeload': function(This, options, eOpts) {
                    if(This.loading) {
                        return false;
                    }
                    This.loading = true;
                    return true;
                }
            },
            renderer: function(loader, response, active) {
                // prevents loosing focus of form elements
                return true;
            },
            callback: function(This, success, response, options) {
                This.loading = false;
                var data = TP.getResponse(panel, response);
                var row;
                if(data) {
                    TP.log('['+panel.id+'] loaded');
                    row = data;
                    if(panel.getData) {
                        row = panel.getData(data);
                    }
                }
                if(row) {
                    var last = panel.store.data.last();
                    if(last != undefined) {
                        row.nr = last.get('nr') + 1;
                    } else {
                        var tmp = {nr: 0, date: new Date(), empty:''};
                        panel.store.loadRawData(tmp, true);
                        row.nr = 1;
                    }
                    row.date  = new Date();
                    row.empty = '';
                    panel.store.loadRawData(row, true);
                    if(panel.updated_callback) {
                        panel.updated_callback(panel);
                    }
                } else {
                    var row = {date: new Date(), empty:''};
                    panel.store.loadRawData(row, true);
                }
            }
        };

        panel.addListener('afterrender', function() {
            panel.refreshHandler();
        });

        panel.addListener('hide', function() {
            panel.chart.hide();
        });
        panel.addListener('show', function() {
            if(panel.updated_callback) {
                panel.updated_callback(panel);
            }
            panel.chart.show();
            // restoreZoom helps refreshing the chart after hiding
            panel.chart.restoreZoom();
        });
    },
    setGearItems: function() {
        var panel = this;
        panel.callParent();
        panel.addGearItems({
            fieldLabel: 'History',
            xtype:      'textfield',
            name:       'nr_dots'
        });
    }
});
