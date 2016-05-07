angular
  .module('sandbox', [])
  .controller('sandboxCtrl', sandboxCtrl);

function sandboxCtrl() {
  var vm = this;
  initialize();

  vm.addOrRemoveItem = addOrRemoveItem;
  vm.openItemOptions = openItemOptions;
  vm.calculateStyle = calculateStyle;

  function initialize() {

    vm.itemOptionsOpen = false;
    vm.containerClass = 'flex-container';
    vm.containerOptions = [{
      attr: 'flex-direction',
      choices: [
        new Choice('row', true),
        new Choice('row-reverse'),
        new Choice('column'),
        new Choice('column-reverse')
      ]
    }, {
      attr: 'flex-wrap',
      choices: [
        new Choice('nowrap', true),
        new Choice('wrap'),
        new Choice('wrap-reverse')
      ]
    }, {
      attr: 'align-items',
      choices: [
        new Choice('flex-start', true),
        new Choice('flex-end'),
        new Choice('center'),
        new Choice('baseline'),
        new Choice('stretch'),
      ]
    }, {
      attr: 'justify-content',
      choices: [
        new Choice('flex-start', true),
        new Choice('flex-end'),
        new Choice('center'),
        new Choice('space-between'),
        new Choice('space-around')
      ]
    }, {
      attr: 'align-content',
      choices: [
        new Choice('flex-start', true),
        new Choice('flex-end'),
        new Choice('center'),
        new Choice('space-between'),
        new Choice('space-around'),
        new Choice('stretch')
      ]
    }, ];

    vm.itemOptions = [{
      attr: 'align-self',
      choices: [
        new Choice('auto', true),
        new Choice('flex-start'),
        new Choice('flex-end'),
        new Choice('center'),
        new Choice('baseline'),
        new Choice('stretch')
      ]
    }, {
      attr: 'flex-basis'
    }, {
      attr: 'flex-grow'
    }, {
      attr: 'flex-shrink'
    }, {
      attr: 'order'
    }];

    vm.items = [];
    for (var i = 0; i < 5; i++) {
      addOrRemoveItem(true);
    };
    vm.activeItem = null;
    initializeContainerStyling();
  }

  function initializeContainerStyling() {
    vm.containerStyle = {};
    for (var i = 0; i < vm.containerOptions.length; i++) {
      var option = vm.containerOptions[i];
      if (!option.choices) {
        vm.containerStyle[option.attr] = null;
      } else {
        for (var j = 0; j < option.choices.length; j++) {
          if (option.choices[j].default) {
            vm.containerStyle[option.attr] = option.choices[j].value;
            break;
          }
        }
      }
    }
  }

  function Choice(value, isDefault) {
    return {
      value: value,
      default: isDefault || false
    };
  }

  function FlexItem(label) {
    var styles = {};
    for (var i = 0; i < vm.itemOptions.length; i++) {
      var option = vm.itemOptions[i];
      if (!option.choices) {
        styles[option.attr] = null;
      } else {
        for (var j = 0; j < option.choices.length; j++) {
          if (option.choices[j].default) {
            styles[option.attr] = option.choices[j].value;
            break;
          }
        }
      }

    }
    return {
      label: label,
      style: styles
    };
  }

  function addOrRemoveItem(shouldAdd) {

    if (shouldAdd) {
      vm.items.push(new FlexItem(vm.items.length + 1));
    } else if (vm.items.length > 1) {
      vm.items.pop();
    }
  }

  function openItemOptions(item) {
    var opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
    if (opened != true) {      
      $("button.navbar-toggle").click();
    } else if (vm.activeItem == item) {
      vm.activeItem = null;
      $("button.navbar-toggle").click();
      return;
    }
    vm.activeItem = item;

  }

  function calculateStyle(item) {
    var style = angular.copy(item.style);
    if (style['flex-basis'] && typeof style['flex-basis'] !== 'string') {
      style['flex-basis'] += '%';
    }
    return style;
  }

}