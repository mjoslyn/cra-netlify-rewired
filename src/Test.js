var createReactClass = require("create-react-class");
var h = require("react-hyperscript");
var hh = require("hyperscript-helpers")(h); // ← Notice the (h)

var Test = createReactClass({
  render: function() {
    return hh.div("#test-id", "This is some text in a " + this.props.name);
  }
});

exports.test = Test;
