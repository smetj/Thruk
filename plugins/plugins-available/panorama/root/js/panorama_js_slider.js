Ext.define('TP.Slider', {
    extend: 'Ext.form.FieldContainer',

    alias:  'widget.tp_slider',

    layout: {
        type: 'table',
        columns: 2,
        tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },
    border: 0,
    items: [{
        xtype:      'sliderfield',
        minValue:   -1,
        maxValue:   300,
        width:      '100%',
        tipText: function(thumb){
            return String(TP.sliderValue2Txt(thumb.value));
        },
        listeners: {
            change: function(s) {
                var v    = s.getValue();
                var newv = {};
                newv[s.up().formConf.nameL] = TP.sliderValue2Txt(v);
                s.up('form').getForm().setValues(newv);
            }
        }
    }, {
        xtype:     'textfield',
        margin:    '0 0 0 10',
        readOnly:  true,
        cellCls:   'slider_txt',
        size:      4,
        maxLength: 7,
        listeners: {
            afterrender: function(s) {
                var f      = s.up('form').getForm();
                var values = f.getValues();
                if(values[s.up().formConf.nameS] != undefined) {
                    values[s.up().formConf.nameL] = TP.sliderValue2Txt(values[s.up().formConf.nameS]);
                } else {
                    values[s.up().formConf.nameL] = TP.sliderValue2Txt(s.up().formConf.value);
                }
                f.setValues(values);
            }
        }

    }],

    initComponent: function() {
        this.callParent();
        this.items.getAt(0).value      = this.formConf.value;
        this.items.getAt(0).name       = this.formConf.nameS;
        if(this.formConf.minValue != undefined) {
            this.items.getAt(0).minValue = this.formConf.minValue;
        }
        this.items.getAt(1).name       = this.formConf.nameL;
    }
});
