/**
 * 语言管理器，用来实现本地化。
 * @class Language
 * @module mokit
 */
define(function(require, exports, module) {
	"require:nomunge,exports:nomunge,module:nomunge";
	"use strict";

	var utils = require('./utils'),
		store = require('./store'),
		eventMgr = require('./event');

	//语言表
	var langeuageTable = store.dataCache["$language"] = exports.languages = {};

	exports.languageChange = eventMgr.create(exports, 'languagechange');

	/**
	 * currentName属性
	 */
	utils.defineProperty(exports, 'currentName', {
		get: function() {
			return store.local.get('language:current-name');
		},
		set: function(name) {
			return store.local.set('language:current-name', name);
		}
	}, true);

	var _current = null;
	utils.defineProperty(exports, 'current', {
		get: function() {
			return _current;
		},
		set: function(value) {
			return _current = value;
		}
	}, true);

	/**
	 * 添加系统可用本地化语言配置表
	 * @method addLanguage
	 * @param {Object} languages 语言配置对象
	 * @param {Module} srcModule 当前模块
	 * @static
	 */
	exports.addLanguage = function(languages, srcModule) {
		utils.each(languages, function(name) {
			langeuageTable[name] = (srcModule && srcModule.resovleUri) ? srcModule.resovleUri(this) : this;
		});
	};

	/**
	 * 设置语言
	 * @method setLanguage
	 * @param {String} name 语言表名称
	 * @param {Function} callback 切换完成回调
	 * @static
	 */
	exports.setLanguage = function(name, callback) {
		if (!utils.isString(name)) return;
		var languageUri = langeuageTable[name];
		if (languageUri) {
			require(languageUri, function(rs) {
				exports.current(rs);
				exports.currentName(name);
				exports.languageChange.trigger(name, rs);
				if (callback) callback(name, rs);
			})
		} else {
			console.error('language "' + name + '" not found.');
		}
	};
});