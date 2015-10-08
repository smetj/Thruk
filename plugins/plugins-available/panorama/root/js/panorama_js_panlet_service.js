Ext.define('TP.PanletService', {
    extend: 'TP.Panlet',

    title: 'Service',
    height: 420,
    width:  480,
    menusnr: 0,
    type:   'service',
    initComponent: function() {
        var panel = this;
        this.callParent();
        this.xdata.url         = 'panorama.cgi?task=service_detail';
        if(this.xdata.host    == undefined) { this.xdata.host    = '' }
        if(this.xdata.service == undefined) { this.xdata.service = '' }

        /* load service data */
        this.loader = TP.ExtinfoPanelLoader(this),
        this.add(TP.ExtinfoPanel('service'));

        /* auto load when host is set */
        this.addListener('afterrender', function() {
            this.setTitle(this.xdata.host + ' - ' + this.xdata.service);
            if(this.xdata.host == '') {
                this.gearHandler();
            } else {
                // update must be delayed, IE8 breaks otherwise
                TP.timeouts['timeout_' + this.id + '_refresh'] = window.setTimeout(Ext.bind(this.manualRefresh, this, []), 500);
            }
        });

        this.formUpdatedCallback = function() {
            this.setTitle(this.xdata.host + ' - ' + this.xdata.service);
        }

        /* should be closeable all the time because they can be openend even on readonly dashboards */
        this.closable  = true;
    },
    setGearItems: function() {
        var panel = this;
        this.callParent();
        this.addGearItems([
            TP.objectSearchItem(panel, 'host', 'Hostname'),
            TP.objectSearchItem(panel, 'service', 'Servicename')
        ]);
    }
});

/* Add new downtime menu item */
TP.service_downtime_menu = function() {
    var fields = [{
            fieldLabel: 'Comment',
            xtype:      'textfield',
            name:       'com_data',
            emptyText:  'comment',
            width:      288
        }, {
            fieldLabel: 'Next Check',
            xtype:      'datetimefield',
            name:       'start_time'
        }, {
            fieldLabel: 'End Time',
            xtype:      'datetimefield',
            name:       'end_time'
        }, {
            xtype: 'hidden', name: 'com_author',  value: remote_user
        }, {
            xtype: 'hidden', name: 'fixed',       value: '1'
    }];
    return TP.ext_menu_command('Add', 56, fields);
}

/* Acknowledge menu item */
TP.service_ack_menu = function() {
    var fields = [{
            fieldLabel: 'Comment',
            xtype:      'textfield',
            name:       'com_data',
            emptyText:  'comment',
            width:      288
        }, {
            fieldLabel: 'Sticky Acknowledgement',
            xtype:      'checkbox',
            name:       'sticky_ack'
        }, {
            fieldLabel: 'Send Notification',
            xtype:      'checkbox',
            name:       'send_notification'
        }, {
            fieldLabel: 'Persistent Comment',
            xtype:      'checkbox',
            name:       'persistent'
        }, {
            xtype: 'hidden', name: 'com_author',  value: remote_user
    }];
    var defaults = {
        labelWidth: 140
    };
    return TP.ext_menu_command('Acknowledge', 34, fields, defaults);
}

/* Remove Acknowledge menu item */
TP.service_ack_remove_menu = function() {
    var fields = [{
        fieldLabel: '',
        xtype:      'displayfield',
        value:      'no options needed',
        name:       'display',
        width:      240
    }];
    return TP.ext_menu_command('Remove Acknowledgement', 52, fields);
}

/* Reschedule check menu item */
TP.service_reschedule_menu = function() {
    var fields = [{
        fieldLabel: 'Next Check',
        xtype:      'datetimefield',
        name:       'start_time',
        value:      new Date()
    }];
    return TP.ext_menu_command('Reschedule', 7, fields);
}
