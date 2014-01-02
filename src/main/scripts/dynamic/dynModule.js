/*
 * This program is free software; you can redistribute it and/or modify it under the
 * terms of the GNU Lesser General Public License, version 2.1 as published by the Free Software
 * Foundation.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this
 * program; if not, you can obtain a copy at http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
 * or from the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 *
 * Copyright 2013 Pentaho Corporation. All rights reserved.
 */
/**
 * RequireJS Plugin which maintains a collection of Logical Modules and their dependencies. The dependency list for
 * these logical modules or Dynamic Modules is described in the RequireJS Config object.
 *
 * Scripts simply require the Dynamic Module by name as the argument to this plugin ["dynModule!MODULE_NAME"]. An array
 * of the module dependencies is passed to the loading function. Combined these capabilies form a simple plugin
 * mechanism.
 *
 * Example. Load all Home Screen modules
 *
 * pen.require.config({
 *  dynamicModules: {
 *    "myModule/myHomeScreenModule" : "homeScreen",
 *    "anotherModule/homeScreenPlugin" : "homeScreen",
 *  }
 * });
 *
 * pen.require( [ "dynModule!homeScreen" ], function( arrayOfHomeScreenModules ){ });
 *
 */
pen.define({
  /**
   * Flag indicating that the module has processed the RequireJS config object.
   */
  configProcessed : false,
  /**
   * Object mapping logical module names (Dynamic Module) to an array of physical module dependencies.
   */
  dynamicModules : {},
  /**
   * RequireJS Plugin function.
   * @param name name of the dynamic module to load
   * @param req requireJs instance
   * @param onload function to call once the dynamic module is satisfied
   * @param config RequireJS config object. We extract Dynamic Module definitions from this
   */
  load: function (name, req, onload, config) {
    debugger;
    // We don't have a better place for this, as we need the config.
    this.processConfig(config);

    // require the Dynamic Module dependencies as extracted from the config.
    req(this.getDynModule(name), function () {
      // pass the arguments to the original onload function
      onload.call(null, arguments);
    });
  },
  /**
   * Extract Dynamic Module defnitions from the RequireJS config object.
   * @param config
   */
  processConfig : function(config){
    "use strict";
    if(this.configProcessed){
      return;
    }
    for(var module in config.dynamicModules){
      this.getDynModule(config.dynamicModules[module]).push(module);
    }
    this.configProcessed = true;
  },
  /**
   * Convenience method for retriving the dynamic module definition.
   *
   * @param module
   * @returns an array of module dependencies.
   */
  getDynModule : function(module){
    "use strict";
    if(!this.dynamicModules[module]){
      this.dynamicModules[module] = [];
    }
    return this.dynamicModules[module];
  }
});