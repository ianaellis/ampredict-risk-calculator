/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};

exports.$ = $;
exports.$$ = $$;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function thermometer(name, goalAmount, progressAmount, animate) {
    "use strict";

    var $thermo = name,
        $progress = $(".progress", $thermo),
        $goal = $(".goal", $thermo),
        percentageAmount;

    goalAmount = goalAmount || parseFloat($goal.text()), progressAmount = progressAmount || parseFloat($progress.text()), percentageAmount = Math.min(Math.round(progressAmount / goalAmount * 1000) / 10, 100); //make sure we have 1 decimal point

    $goal.find(".amount").text();
    $progress.find(".amount").text();

    $progress.find(".amount").hide();
    if (animate !== false) {
        $progress.animate({
            "height": percentageAmount + "%"
        }, 1200, function () {
            $(this).find(".amount").fadeIn(200);
        });
    } else {
        $progress.css({
            "height": percentageAmount + "%"
        });
        $progress.find(".amount").fadeIn(200);
    }
}

$(document).ready(function () {

    thermometer("#mortality");
    thermometer("#reamputation");
    thermometer("#basicMobility");
    thermometer("#advancedMobility");
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (57)\nFor more information on which environments are supported please see:\nhttps://github.com/sass/node-sass/releases/tag/v4.5.0\n    at module.exports (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\node-sass\\lib\\binding.js:13:13)\n    at Object.<anonymous> (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\node-sass\\lib\\index.js:14:35)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)\n    at Module.require (module.js:596:17)\n    at require (internal/module.js:11:18)\n    at Object.<anonymous> (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\sass-loader\\lib\\loader.js:3:14)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)\n    at Module.require (module.js:596:17)\n    at require (internal/module.js:11:18)\n    at loadLoader (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\loadLoader.js:13:17)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:362:2)\n    at NormalModule.doBuild (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModule.js:129:2)\n    at NormalModule.build (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModule.js:180:15)\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModule.js:141:35\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:170:18\n    at loadLoader (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\loadLoader.js:27:11)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:173:18\n    at loadLoader (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\loadLoader.js:36:3)\n    at iteratePitchingLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\loader-runner\\lib\\LoaderRunner.js:362:2)\n    at NormalModule.doBuild (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModule.js:129:2)\n    at NormalModule.build (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModule.js:180:15)\n    at Compilation.buildModule (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\Compilation.js:142:10)\n    at moduleFactory.create (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\Compilation.js:424:9)\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModuleFactory.js:242:4\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModuleFactory.js:93:13\n    at Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\tapable\\lib\\Tapable.js:204:11\n    at NormalModuleFactory.params.normalModuleFactory.plugin (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\CompatibilityPlugin.js:52:5)\n    at NormalModuleFactory.applyPluginsAsyncWaterfall (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\tapable\\lib\\Tapable.js:208:13)\n    at onDoneResolving (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModuleFactory.js:68:11)\n    at onDoneResolving (Z:\\Programming\\Projects\\learnnode\\dang-thats-delicious\\node_modules\\webpack\\lib\\NormalModuleFactory.js:189:6)\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _bling = __webpack_require__(0);

__webpack_require__(1)();

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map