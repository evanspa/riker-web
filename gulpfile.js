"use strict";

var gulp = require("gulp");
var path = require("path")
var rename = require("gulp-rename");
var gutil = require("gulp-util");
var open = require("gulp-open"); //Open a URL in a web browser
var browserify = require("browserify"); // Bundles JS
var babelify = require("babelify");
var envify = require("envify");
var source = require("vinyl-source-stream"); // Use conventional text streams with Gulp
var buffer = require("vinyl-buffer");
var less = require("gulp-less");
var concat = require("gulp-concat"); //Concatenates files
var lint = require("gulp-eslint"); //Lint JS files, including JSX
var exec = require("child_process").exec;
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;

var config = {
    port: 80,
    devBaseUrl: "https://www.rikerapp.com",
    paths: {
        ejs: "./src/index.ejs",
        devEjs: "./src/index.dev.ejs",
        js:   [
            "./src/**/*.js",
            "./src/**/*.jsx"
        ],
        fonts: [
            "./src/fonts/*",
            "node_modules/react-widgets/dist/fonts/*"
        ],
        less: [
            "./src/less/**/*.less"
        ],
        css: [
            "node_modules/bootstrap/dist/css/bootstrap.css",
            "node_modules/bootstrap/dist/css/bootstrap-theme.css",
            "node_modules/react-widgets/dist/css/*",
            "node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css",
            "node_modules/react-table/react-table.css",
            "node_modules/animate.css",
            "src/css/riker.css",
            "src/css/riker-home-background.css",
            "src/css/riker-loading.css"
        ],
        images:         "./src/images/**",
        favicon:        "./src/favicon.ico",
        clientRenderJs: "./src/client-render.jsx",
        serverJs:       "./src/riker-server.js",
        clientRenderDist: "./dist/client",
        serverRenderDist: "./dist/server"
    },
    devGaTrackingId: "__REMOVED__",
    prodGaTrackingId: "__REMOVED__",
    testStripeKey: "__REMOVED__",
    prodStripeKey: "__REMOVED__",
    subscriptionAmountInCents: 1149,
    appleId: "__REMOVED__",
    facebookAppId: "__REMOVED__"
}

gulp.task("ejs", function() {
    gulp.src(config.paths.ejs)
        .pipe(rename("index.html"))
        .pipe(gulp.dest(config.paths.clientRenderDist));
    gulp.src(config.paths.ejs)
        .pipe(gulp.dest(config.paths.serverRenderDist))
        .pipe(livereload());
});

gulp.task("ejs-dev", function() {
    gulp.src(config.paths.devEjs)
        .pipe(rename("index.html"))
        .pipe(gulp.dest(config.paths.clientRenderDist));
    gulp.src(config.paths.ejs)
        .pipe(gulp.dest(config.paths.serverRenderDist))
        .pipe(livereload());
});

function createBundler() {
    return browserify({
        entries:      [ config.paths.clientRenderJs ],
        transform:    [ [ babelify, {presets: [ "es2015", "react-latest", "stage-2" ]}],
                        [ envify, { RIKER_VERSION: argv.rikerVersion,
                                    USE_HASH_HISTORY: argv.useHashHistory } ] ],
        cache:        {},
        packageCache: {}
    })
}

gulp.task("bundleDevClientJsAndReload", function() {
    process.env.NODE_ENV = 'development';
    process.env.GA_TRACKING_ID = config.devGaTrackingId;
    process.env.APPLE_ID = config.appleId;
    process.env.FACEBOOK_APP_ID = config.facebookAppId;
    process.env.STRIPE_KEY = config.testStripeKey;
    process.env.RIKER_SUBSCRIPTION_IN_CENTS = config.subscriptionAmountInCents;
    process.env.RIKER_VERSION = argv.rikerVersion;
    process.env.USE_HASH_HISTORY = argv.useHashHistory;
    createBundler()
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"))
        .pipe(livereload());
});

gulp.task("bundleClientJs", function() {
    process.env.NODE_ENV = 'development';
    process.env.GA_TRACKING_ID = config.devGaTrackingId;
    process.env.APPLE_ID = config.appleId;
    process.env.FACEBOOK_APP_ID = config.facebookAppId;
    process.env.STRIPE_KEY = config.testStripeKey;
    process.env.RIKER_SUBSCRIPTION_IN_CENTS = config.subscriptionAmountInCents;
    process.env.RIKER_VERSION = argv.rikerVersion;
    process.env.USE_HASH_HISTORY = argv.useHashHistory;
    createBundler()
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"));
});

gulp.task("bundleAndCompressClientJs", function() {
    process.env.NODE_ENV = 'production';
    process.env.GA_TRACKING_ID = config.prodGaTrackingId;
    process.env.APPLE_ID = config.appleId;
    process.env.FACEBOOK_APP_ID = config.facebookAppId;
    process.env.STRIPE_KEY = config.prodStripeKey;
    process.env.RIKER_SUBSCRIPTION_IN_CENTS = config.subscriptionAmountInCents;
    process.env.RIKER_VERSION = argv.rikerVersion;
    process.env.USE_HASH_HISTORY = argv.useHashHistory;
    createBundler()
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.clientRenderDist + "/scripts"));
});

gulp.task("bundleDevServerJs", function() {
    // there doesn't seem to be a way to invoke the browserify task with the
    // 'node' option, so, need to revert to invoking browserify on the command-line
    exec("mkdir -p dist/server");
    const browserifyCmd = "browserify --node " + config.paths.serverJs + " -o " + config.paths.serverRenderDist + "/riker-server.js -t [ babelify --presets [ es2015 react-latest stage-2 ] ] -t [ envify --NODE_ENV development --RIKER_SUBSCRIPTION_IN_CENTS " + config.subscriptionAmountInCents + " --GA_TRACKING_ID " + config.devGaTrackingId  + " --APPLE_ID " + config.appleId + " --FACEBOOK_APP_ID " + config.facebookAppId + " --STRIPE_KEY " + config.testStripeKey + " --RIKER_VERSION " + argv.rikerVersion + " --USE_HASH_HISTORY " + argv.useHashHistory + " ]"
    exec(browserifyCmd);
})

gulp.task("bundleServerJs", function() {
    // there doesn't seem to be a way to invoke the browserify task with the
    // 'node' option, so, need to revert to invoking browserify on the command-line
    exec("mkdir -p dist/server");
    const browserifyCmd = "browserify --node " + config.paths.serverJs + " -o " + config.paths.serverRenderDist + "/riker-server.js -t [ babelify --presets [ es2015 react-latest stage-2 ] ] -t [ envify --NODE_ENV production --RIKER_SUBSCRIPTION_IN_CENTS " + config.subscriptionAmountInCents + " --GA_TRACKING_ID " + config.prodGaTrackingId + " --APPLE_ID " + config.appleId + " --FACEBOOK_APP_ID " + config.facebookAppId + " --STRIPE_KEY " + config.prodStripeKey + " --RIKER_VERSION " + argv.rikerVersion + " --USE_HASH_HISTORY " + argv.useHashHistory + " ]"
    exec(browserifyCmd);
})

gulp.task("bundleCss", function() {
    gulp.src(config.paths.css)
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/css"))
        .pipe(livereload());
});

gulp.task("images", function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.clientRenderDist + "/images"))
        .pipe(livereload());
});

gulp.task('less', function () {
    return gulp.src(config.paths.less)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(config.paths.clientRenderDist + "/css"))
        .pipe(livereload());
});

gulp.task("fonts", function() {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.clientRenderDist + "/fonts"))
        .pipe(livereload());
});

gulp.task("lint", function() {
    return gulp.src(config.paths.js)
        .pipe(lint({configFile: "eslint.config.json"}))
        .pipe(lint.format());
});

gulp.task("watch", function() {
    livereload.listen();
    gulp.watch(config.paths.images, ["images"]);
    gulp.watch(config.paths.ejs, ["ejs-dev"]);
    gulp.watch(config.paths.css, ["bundleCss"]);
    gulp.watch(config.paths.js, ["bundleDevClientJsAndReload"]);
});

gulp.task("devServer", ["ejs", "bundleDevClientJsAndReload", "bundleDevServerJs", "fonts", "bundleCss", "less", "images", "lint"]);

gulp.task("devReload", ["ejs-dev", "bundleDevClientJsAndReload", "fonts", "bundleCss", "less", "images", "watch"]);

gulp.task("build", ["ejs", "bundleClientJs", "bundleServerJs", "fonts", "bundleCss", "less", "images", "lint"]);

gulp.task("buildAndCompress", ["ejs", "bundleAndCompressClientJs", "bundleServerJs", "fonts", "bundleCss", "less", "images", "lint"]);

gulp.task("dev", ["ejs", "bundleClientJs", "bundleDevServerJs", "fonts", "bundleCss", "less", "images", "lint"]);
