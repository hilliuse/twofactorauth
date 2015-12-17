---
---
(function (root, $) {
    $('.menu .dropdown').dropdown();
    $('span.popup.exception').popup({
      hoverable: true
    });
    $('a.popup.exception').popup();
}(window, jQuery));

$(document).ready(function() {
    $("img").unveil(50);
});

// Angular
const APPDATA = {{site.data | jsonify}};
function appConfig() {}

angular
  .module('twoFactorAuth', [])
  .config(appConfig);
  // .constant(‘APPDATA’, APPDATA);

function mainCtrl() {
  var vm = this;
  var searchRegex;
  vm.search = '';

  buildRegex = function(string) {
    string = string.replace(/[^\w\s]/, '');
    searchRegex = new RegExp(string, 'i');
    return searchRegex;
  }

  showWebsite = function(name) {
    var show = !vm.search || vm.search.length < 1 || searchRegex.test(name.replace(/[^\w\s]/, ''));
    return show;
  }

  vm.websiteShown = function (sectionId, website) {
    return vm.visibilityMap[sectionId][website];
  }

  vm.anyWebsiteShown = function (sectionId) {
    var anyShown = false;
    angular.forEach(vm.visibilityMap[sectionId], function(shown, website){
      anyShown = anyShown || shown;
    });
    return anyShown;
  }

  vm.buildVisibilityMap = function() {
    buildRegex(vm.search);
    vm.visibilityMap = {};
    angular.forEach(APPDATA.main.sections, function(section){
      vm.visibilityMap[section.id] = {};
      angular.forEach(APPDATA[section.id].websites, function(website){
        vm.visibilityMap[section.id][website.name] = showWebsite(website.name);
      });
    });
    return vm.visibilityMap;
  }
  vm.buildVisibilityMap();
}

angular
  .module('twoFactorAuth')
  .controller('mainCtrl', mainCtrl);
