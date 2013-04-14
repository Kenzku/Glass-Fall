/**
 * Author: Ken
 * Date: 13/04/2013
 * Time: 23:09
 */
QUnit.config.autostart = false;
require(['/test/urlCrawler_deskop_test.js'], function (testModule) {
        QUnit.start();
        testModule.RunTests();
    }
);
