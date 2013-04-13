/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 04:34
 *
 * Reference: http://gskinner.com/RegExr/
 * http://www.freeformatter.com/mime-types-list.html#mime-types-list
 */

exports.URL = {
    default : 'http://www.telenor.com'
}

exports.Middleware = {
    default : {
        Depth : 1,
        Width : 10
    }
}

exports.State = {
    pause : 'pause',
    run : 'run',
    stop : 'stop'
}

exports.URLRegexp = {
    Steady : {
        v1 : /http[s]?:\/\/([a-z|0-9]+[\\.])*[a-z|0-9]{2,9}([/|a-z|0-9-*.*?*_*=])*/gmi,
        /**
         * known bug: https://ssl
         */
        v2 : /http[s]?:\/\/([a-z|0-9]+[\\.])*[a-z|0-9]{2,9}([/|a-z|0-9-*.*?_=%&])*/gmi,
        /**
         * current version
         *
         */
        v3: /http[s]?:\/\/([a-z|0-9]+[\\.])+[a-z|0-9]{2,9}([/|a-z|0-9-*.*?_=%&])*/gmi
    },
    Experimental : {
        /**
         *  does not work yep: aim to match
         *  vision: www.g.com
         */
        v1 : /(http[s]?:\/\/([a-z|0-9]+[\\.]*)|\/|([a-z|0-9]+[\\.]))[a-z|0-9]{2,9}([/|a-z|0-9-*.*?*_*=])*/gmi,
        /**
         * hasn't implemented
         * vision: match: 'https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'
         */
        v2 : ""
    }
}

exports.SaveFile = {
    default : {
        DataToSave : '',
        IsAppend : false,
        FileName : 'URLCrawler.txt',
        Encoding : 'utf8'
    }
}

// a list of content type that can be improved
exports.ContentType = {
    html : 'text/html',
    pdf : 'application/pdf',
    doc : 'application/msword',
    img : 'image/',
    jpg : 'image/jpeg',
    png : 'image/png',
    js : 'application/javascript',
    css : 'text/css'
    // etc etc
}

exports.TestArray = [ 'http://www.w3.org/1999/xhtml',
    'http://opengraphprotocol.org/schema/',
    'http://www.facebook.com/2008/fbml',
    'http://www.telenor.com/wp-content/plugins/sitepress-multilingual-cms/res/css/language-selector.css?v=2.7.1',
    'http://remysharp.com/2009/01/07/html5-enabling-script/',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/icons/apple-touch-icon-iphone.png',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/icons/apple-touch-icon-ipad.png',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/icons/apple-touch-icon-iphone4.png',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/icons/tel_symbol_icon_16.ico',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/icons/fb_tel_sym.gif',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/icons/fb_tel_sym.gif',
    'http://www.telenor.com',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/style.css?1365158117',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/css/ie.css',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/js/jquery-1.9.1.min.js',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/js/slides.min.jquery.js',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/loading.gif',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/js/modernizr-latest.js',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/js/globalpresence.js?ver=3.5.1',
    'http://www.telenor.com/xmlrpc.php?rsd',
    'http://www.telenor.com/wp-includes/wlwmanifest.xml',
    'http://www.telenor.com/',
    'http://www.telenor.com/wp-content/plugins/sitepress-multilingual-cms/res/js/sitepress.js',
    'http://www.telenor.com/no/',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/tel_logo.jpg',
    'http://www.telenor.com/local-websites/',
    'http://www.telenor.com/about-us/',
    'http://www.telenor.com/innovation/',
    'http://www.telenor.com/corporate-responsibility/',
    'http://www.telenor.com/people-and-opportunities/',
    'http://www.telenor.com/news-and-media/',
    'http://www.telenor.com/investor-relations/',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/front_slider_left_arrow.png',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/images/front_slider_right_arrow.png',
    'http://www.telenor.com/wp-content/uploads/2013/02/KL_2011_17_medium_campaign1.jpg',
    'http://www.telenor.com/news-and-media/press-releases/2013/100-million-more-kids-online-by-2017-telenor-calls-for-action-to-make-internet-safer/',
    'http://www.telenor.com/mwc2013/',
    'http://www.telenor.com/wp-content/uploads/2013/02/mozilla-open-web-device1.png',
    'http://www.telenor.com/news-and-media/press-releases/2013/telenor-to-rollout-firefox-os-smartphones-in-2013',
    'http://www.telenor.com/mwc2013/',
    'http://www.telenor.com/news-and-media/articles/2013/is-your-next-app-asian',
    'http://www.telenor.com/wp-content/uploads/2013/03/iStock_000020649912Small-230x153.jpg',
    'http://www.telenor.com/news-and-media/articles/2013/is-your-next-app-asian',
    'http://www.telenor.com/news-and-media/press-releases/2013/global-mobile-operators-issue-joint-principles-on-freedom-of-expression-and-privacy/',
    'http://www.telenor.com/wp-content/uploads/2013/03/freedom_expression-230x153.jpg',
    'http://www.telenor.com/news-and-media/press-releases/2013/global-mobile-operators-issue-joint-principles-on-freedom-of-expression-and-privacy/',
    'http://www.telenor.com/news-and-media/articles/2013/who-listens-to-what-and-how/',
    'http://www.telenor.com/wp-content/uploads/2013/03/listening-to-music-230x153.jpg',
    'http://www.telenor.com/news-and-media/articles/2013/who-listens-to-what-and-how/',
    'http://www.telenor.com/news-and-media/articles/2013/easypaisa-is-a-mobile-money-sprinter/',
    'http://www.telenor.com/wp-content/uploads/2013/03/RoarB-230x153.jpg',
    'http://www.telenor.com/news-and-media/articles/2013/easypaisa-is-a-mobile-money-sprinter/',
    'http://www.telenor.com/news-and-media/articles/2013/does-mobile-growth-mean-economic-development/',
    'http://www.telenor.com/wp-content/uploads/2013/03/Tonne-panel-230x153.jpg',
    'http://www.telenor.com/news-and-media/articles/2013/does-mobile-growth-mean-economic-development/',
    'http://www.telenor.com/news-and-media/articles/2013/checking-facebook-in-the-arctic/',
    'http://www.telenor.com/wp-content/uploads/2013/03/Arctic-Boat1-230x153.jpg',
    'http://www.telenor.com/news-and-media/articles/2013/checking-facebook-in-the-arctic/',
    'http://www.telenor.com/news-and-media/press-releases/2013/google-and-telenor-norway-make-it-easier-to-buy-apps-and-games-on-google-play/',
    'http://www.telenor.com/news-and-media/press-releases/',
    'http://www.w3.org/TR/html4/loose.dtd',
    'http://www.w3.org/2005/Atom',
    'http://search.twitter.com/search?q=%23didyouknow',
    'https://twitter.com/TelenorGroup',
    'http://t.co/aN8K70Ia5N',
    'http://t.co/aN8K70Ia5N',
    'http://www.w3.org/2005/Atom',
    'http://twitter.com/telenorgroup',
    'http://www.telenor.com/investor-relations/the-share/',
    'http://www.telenor.com/investor-relations/financial-calendar/',
    'http://www.telenor.com/corporate-responsibility/human-rights/',
    'http://www.telenor.com/corporate-responsibility/reporting/sustainability-report/',
    'http://telenor.com/?page_id=21',
    'http://telenor.com/?page_id=163',
    'http://telenor.com/?page_id=38',
    'http://telenor.com/?page_id=60',
    'http://telenor.com/?page_id=100',
    'http://telenor.com/?page_id=63',
    'http://telenor.com/?page_id=106',
    'http://telenor.com/?page_id=111',
    'http://telenor.com/?page_id=169',
    'http://telenor.com/?page_id=151',
    'http://telenor.com/?page_id=477',
    'http://telenor.com/?page_id=485',
    'http://telenor.com/?page_id=494',
    'http://telenor.com/?page_id=499',
    'http://telenor.com/?page_id=514',
    'http://telenor.com/?page_id=516',
    'http://telenor.com/?page_id=521',
    'http://telenor.com/?page_id=196',
    'http://telenor.com/?page_id=206',
    'http://telenor.com/?page_id=218',
    'http://telenor.com/?page_id=220',
    'http://telenor.com/?page_id=232',
    'http://telenor.com/?page_id=251',
    'http://telenor.com/?page_id=258',
    'http://www.telenor.com/?page_id=18380',
    'http://www.telenor.com/?page_id=21284',
    'http://telenor.com/?page_id=276',
    'http://telenor.com/?page_id=17532',
    'http://telenor.com/?page_id=310',
    'http://telenor.com/?page_id=361',
    'http://telenor.com/?page_id=369',
    'http://telenor.com/?page_id=371',
    'http://telenor.com/?page_id=386',
    'http://telenor.com/?page_id=17184',
    'http://telenor.com/?page_id=388',
    'http://telenor.com/?page_id=566',
    'http://telenor.com/?page_id=569',
    'http://telenor.com/?page_id=571',
    'http://telenor.com/?page_id=581',
    'http://telenor.com/?page_id=635',
    'http://telenor.com/?page_id=644',
    'http://telenor.com/?page_id=730',
    'http://telenor.com/?page_id=741',
    'http://telenor.com/?page_id=797',
    'http://telenor.com/?page_id=802',
    'http://telenor.com/?page_id=812',
    'http://telenor.com/?page_id=596',
    'http://telenor.com/?page_id=815',
    'http://telenor.com/?page_id=852',
    'http://telenor.com/?page_id=858',
    'http://telenor.com/?page_id=863',
    'http://telenor.com/?page_id=623',
    'http://telenor.com/?page_id=869',
    'http://telenor.com/?page_id=872',
    'http://twitter.com/TelenorGroup',
    'http://www.youtube.com/telenorgroup',
    'http://www.linkedin.com/company/telenor-group',
    'http://www.telenor.com/about-us/contact-us/',
    'http://www.telenor.com/about-this-website/',
    'http://www.telenor.com/privacy-statement/',
    'http://www.telenor.com/wp-content/themes/telenorgroup-white/assets/js/retina.js' ]

exports.testHeader = {
    headers: {
        'cache-control': 'private, must-revalidate',
        'content-type': 'text/html; charset=UTF-8',
        date: 'Tue, 09 Apr 2013 17:48:27 GMT',
        expires: 'Tue, 09 Apr 2013 17:48:32 GMT',
        server: 'Apache/2.2.15 (Red Hat)',
        vary: 'Accept-Encoding,Cookie',
        'wp-super-cache': 'Served supercache file from PHP',
        'x-powered-by': 'PHP/5.4.8',
        'transfer-encoding': 'chunked',
        connection: 'keep-alive'
    }
}

exports.readView = {
    example : {
        // byHash
        total_rows: 2,
        offset: 0,
        rows: [
            // two documents returend by the view
            {   id: '8361e3dfb52f0e28784c3cb53400fe12',
                // note: key is now equal to hash
                key: '4cc481ebf9eb04a84177207f2c81805c',
                value: {
                    _id: '8361e3dfb52f0e28784c3cb53400fe12',
                    _rev: '3-e07d7a851ebc5d00b7bc44da3495e2d4',
                    date: '2013-04-09T19:53:27.091Z',
                    URLs: [
                        'http://www.w3.org/1999/xhtml',
                        'http://opengraphprotocol.org/schema/' ],
                    hash: '4cc481ebf9eb04a84177207f2c81805c'
                }
            },

            {   id: '8361e3dfb52f0e28784c3cb5340108c7',
                key: '4cc481ebf9eb04a84177207f2c91835c',
                value: {}
            }
        ]
    }
}