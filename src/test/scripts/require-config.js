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

// Find and inject tests using require
var tests = ["base/test/scripts/testDynamicModules.js"]

pen = {};
pen.require = function() {
  return require.apply(this, arguments);
}
pen.define = function() {
  return define.apply(this, arguments);
}

requirejs.config({

  baseUrl: "base/main/scripts/external",
  dynamicModules: {
    "common-ui/util/PentahoSpinner" : "testModule",
    "common-ui/util/ucsv" : "testModule"
  },
  deps: tests,
  paths: {
    "dynamic": "../dynamic",
    "dynModule" : "../dynamic/dynModule"
  },

  // start test run, once Require.js is done
  callback: function() {
    window.__karma__.start();
  }
});