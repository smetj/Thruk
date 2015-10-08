package Monitoring::Config::Object::Escalation;

use strict;
use warnings;
use parent 'Monitoring::Config::Object::Parent';

=head1 NAME

Monitoring::Config::Object::Escalation - Escalation Object Configuration

=head1 DESCRIPTION

Defaults for Escalation objects

=cut

##########################################################

$Monitoring::Config::Object::Escalation::Defaults = {
    'name'                    => { type => 'STRING', cat => 'Extended' },
    'use'                     => { type => 'LIST', link => 'escalation', cat => 'Basic' },
    'register'                => { type => 'BOOL', cat => 'Extended' },

    'escalation_name'         => { type => 'STRING', cat => 'Basic' },
    'contacts'                => { type => 'LIST',   'link' => 'contact' },
    'contact_groups'          => { type => 'LIST',   'link' => 'contactgroup' },
    'first_notification_time' => { type => 'INT' },
    'last_notification_time'  => { type => 'INT' },

    'notification_interval'   => { type => 'INT' },
    'escalation_period'       => { type => 'STRING', 'link' => 'timeperiod' },
    'escalation_options'      => { type => 'ENUM', values => ['w','u','c','r'], keys => [ 'Ok', 'Warning', 'Critical','Unknown' ] },
};

##########################################################

=head1 METHODS

=head2 BUILD

return new object

=cut
sub BUILD {
    my $class = shift || __PACKAGE__;
    my $coretype = shift;

    return unless($coretype eq 'any' or $coretype eq 'shinken');

    my $self = {
        'type'              => 'escalation',
        'primary_key'       => [ 'host_name', [ 'hostgroup_name' ] ],
        'default'           => $Monitoring::Config::Object::Escalation::Defaults,
        'can_have_no_name'  => 1,
    };
    bless $self, $class;
    return $self;
}

##########################################################

=head1 AUTHOR

Sven Nierlein, 2009-present, <sven@nierlein.org>

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
