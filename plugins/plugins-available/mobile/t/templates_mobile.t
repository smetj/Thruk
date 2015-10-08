use strict;
use warnings;
use Test::More;

BEGIN {
    plan skip_all => 'backends required' if(!-s 'thruk_local.conf' and !defined $ENV{'PLACK_TEST_EXTERNALSERVER_URI'});
    plan tests => 13;
}

BEGIN {
    use lib('t');
    require TestUtils;
    import TestUtils;
}


###########################################################
# check module
SKIP: {
    skip 'external tests', 1 if defined $ENV{'PLACK_TEST_EXTERNALSERVER_URI'};

    use_ok 'Thruk::Controller::mobile';
};

###########################################################
# initialize object config
TestUtils::test_page(
    'url'      => '/thruk/cgi-bin/mobile.cgi',
    'follow'   => 1,
    'like'     => 'Mobile Thruk',
);
