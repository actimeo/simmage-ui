const path = require('path');
const Blueprint   = require('ember-cli/lib/models/blueprint');
const dynamicPathParser = require('angular-cli/utilities/dynamic-path-parser');
const getFiles = Blueprint.prototype.files;
const stringUtils = require('ember-cli-string-utils');

module.exports = {
  description: '',

  availableOptions: [
  ],

  normalizeEntityName: function (entityName) {
    this.entityName = entityName;
    var parsedPath = dynamicPathParser(this.project, entityName);

    this.dynamicPath = parsedPath;

    var defaultPrefix = '';
    if (this.project.ngConfig &&
        this.project.ngConfig.apps[0] &&
        this.project.ngConfig.apps[0].prefix) {
      defaultPrefix = this.project.ngConfig.apps[0].prefix + '-';
    }
    this.selector = stringUtils.dasherize(defaultPrefix + parsedPath.name);

    if (this.selector.indexOf('-') === -1) {
      this._writeStatusToUI(chalk.yellow, 'WARNING', 'selectors should contain a dash');
    }

    return parsedPath.name;
  },

  locals: function (options) {
    this.styleExt = 'css';
    if (this.project.ngConfig &&
        this.project.ngConfig.defaults &&
        this.project.ngConfig.defaults.styleExt) {
      this.styleExt = this.project.ngConfig.defaults.styleExt;
    }

    return {
      dynamicPath: this.dynamicPath.dir,
      selector: this.selector,
      styleExt: this.styleExt
    };
  },

  files: function() {
    var fileList = getFiles.call(this);
    return fileList;
  },

  fileMapTokens: function (options) {
    // Return custom template variables here.
    this.dasherizedModuleName = options.dasherizedModuleName;
    return {
      __path__: () => {
        this.generatePath = this.dynamicPath.dir
          + path.sep
          + options.dasherizedModuleName;
        return this.generatePath;
      },
      __styleext__: () => {
        return this.styleExt;
      }
    };
  },

  afterInstall: function (options) {
      return;
  }
};
