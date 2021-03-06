const Class = require('cify');
const Directive = require('./directive');
const utils = require('ntils');
const Expression = require('./expression');
const directives = require('./directives');

const DEFAULT_PREFIX = 'm';

/**
 * 模板编译器
 * 可以通过指定「前缀」或「指令集」构建实例
 */
const Compiler = new Class({
  $name: 'Compiler',

  /**
   * 构造一个编译器
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor: function (options) {
    options = options || utils.create(null);
    options.directives = options.directives || [];
    this.prefix = options.prefix || DEFAULT_PREFIX;
    this.directives = directives.concat(options.directives);
  },

  /**
   * 解析要匹配的名称
   * @param {string} name 要解析的名称字符串
   * @param {string} type 指令类型
   * @param {HTMLNode} node 当前 HTML 元素结点
   * @returns {Object} 解析后的对象
   */
  _parseMatchInfo: function (name, type, node) {
    let parts = name.toLowerCase().split(':');
    let info = {
      type: type,
      compiler: this,
      node: node
    };
    if (parts.length > 1) {
      info.prefix = parts[0];
      info.name = parts[1];
      info.decorates = parts.slice(2);
    } else {
      info.prefix = null;
      info.name = parts[0];
      info.decorates = [];
    }
    return info;
  },

  /**
   * 查找所有匹配的指令
   * @param {Object} matchInfo 匹配信息
   * @returns {Array} 指令列表
   */
  _findDirectives: function (matchInfo) {
    return this.directives.filter(function (Directive) {
      return Directive.definition.test(matchInfo);
    }, this);
  },

  /**
   * 创建一个指令实例
   * @param {Directive} Directive 指令类
   * @param {Object} options 指令构建选项
   * @returns {Directive} 指令实例
   */
  _createDirectiveInstance: function (Directive, options) {
    options.compiler = this;
    options.prefix = this.prefix;
    return new Directive(options);
  },

  /**
   * 初始化一个编译完成的 handler
   * @param {function} handler 编译后的的模板函数
   * @returns {void} 无返回
   */
  _bindHandler: function (handler) {
    //排序 directives
    handler.directives = handler.directives.sort(function (a, b) {
      return b.level - a.level;
    });
    //初始化 directives
    let boundDirectives = [];
    utils.each(handler.directives, function (index, directive) {
      directive.index = index;
      directive.bind();
      boundDirectives.push(directive);
      //移除完成绑定的指令对应的 attribute
      if (directive.remove !== false && directive.attribute) {
        directive.node.removeAttribute(directive.attribute.name);
      }
      //如果遇到一个「终态」指令，停止向下初始化
      if (directive.final) {
        return handler.final = true;
      }
    }, this);
    handler.directives = boundDirectives;
  },

  /**
   * 编译一个元素本身
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileElement: function (handler, node) {
    let matchInfo = this._parseMatchInfo(node.nodeName, Directive.TE, node);
    let elementDirectives = this._findDirectives(matchInfo);
    elementDirectives.forEach(function (Directive) {
      handler.directives.push(this._createDirectiveInstance(Directive, {
        handler: handler,
        node: node,
        decorates: matchInfo.decorates
      }));
    }, this);
  },

  /**
   * 编译一个元素所有 attributes 
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileAttributes: function (handler, node) {
    utils.toArray(node.attributes).forEach(function (attribute) {
      let matchInfo = this._parseMatchInfo(attribute.name, Directive.TA, node);
      let attributeDirectives = this._findDirectives(matchInfo);
      attributeDirectives.forEach(function (Directive) {
        let definition = Directive.definition;
        handler.directives.push(this._createDirectiveInstance(Directive, {
          handler: handler,
          node: node,
          attribute: attribute,
          expression: definition.literal ?
            attribute.value : new Expression(attribute.value),
          decorates: matchInfo.decorates
        }));
      }, this);
    }, this);
  },

  /**
   * 编译所有子结点
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileChildren: function (handler, node) {
    if (handler.final) return;
    utils.toArray(node.childNodes).forEach(function (childNode) {
      let childHandler = this.compile(childNode);
      childHandler.parent = this;
      handler.children.push(childHandler);
    }, this);
  },

  /**
   * 编译一个模板
   * @param {HTMLNode} node 模板根元素
   * @param {Object} options 选项
   * @returns {function} 模板函数
   */
  compile: function (node, options) {
    if (!node) {
      throw new Error('Invalid node for compile');
    }
    options = options || utils.create(null);
    //定义编译结果函数
    let handler = function (scope) {
      if (utils.isNull(scope)) scope = utils.create(null);
      handler.directives.forEach(function (directive) {
        directive.scope = scope;
        directive.execute(scope);
      }, this);
      handler.children.forEach(function (childHandler) {
        childHandler(scope);
      }, this);
    };
    //--
    handler.dispose = function () {
      handler.directives.forEach(function (directive) {
        directive.unbind();
      }, this);
      handler.children.forEach(function (childHandler) {
        childHandler.dispose();
      }, this);
    };
    handler.node = node;
    //定义 children & directives 
    handler.directives = [];
    handler.children = [];
    //编译相关指令
    if (options.element !== false) this._compileElement(handler, node);
    if (options.attribute !== false) this._compileAttributes(handler, node);
    this._bindHandler(handler);
    if (options.children !== false) this._compileChildren(handler, node);
    //返回编译后函数
    return handler;
  }

});

module.exports = Compiler;