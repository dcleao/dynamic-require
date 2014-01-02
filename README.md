dynamic-require
===============
This project contains a RequireJS plugin to which allows the creation of an AMD module who's sole purpose is to require other
dependencies. This list of dependencies is built from additions to the RequireJS configuration.


Configuration
===============
pen.require.config({
  
  dynamicModules: {
    "common-ui/util/PentahoSpinner" : "testModule",
    "common-ui/util/BusyIndicator" : "testModule"
  }
  
});

The above configuration defined a module "testModule" with two dependencies, PentahoSpinner and BusyIndicator. Usage is simple

  pen.require( ["dynModule!testModule"], function(arrayOfDependencies){} );

Testing this module is as easy as calling "mvn test".
