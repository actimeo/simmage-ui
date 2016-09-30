const path = require('path');
const Blueprint   = require('ember-cli/lib/models/blueprint');
const dynamicPathParser = require('angular-cli/utilities/dynamic-path-parser');
const getFiles = Blueprint.prototype.files;

module.exports = {
  description: '',

  availableOptions: [
  ],

  normalizeEntityName: function (entityName) {
    this.entityName = entityName;
    var parsedPath = dynamicPathParser(this.project, entityName);

    this.dynamicPath = parsedPath;
    return parsedPath.name;
  },

  locals: function (options) {
    return {
      dynamicPath: this.dynamicPath.dir
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
      }
    };
  },

  afterInstall: function (options) {
    options.entity.name = path.join(this.entityName, this.dasherizedModuleName);
    options.flat = true;
    options.route = false;
    options.inlineTemplate = false;
    options.inlineStyle = false;
    options.prefix = true;
    options.spec = true;
    return Blueprint.load(path.join(__dirname, '../component')).install(options);
  }
};
