(function(exports) {
  "use strict"; // Use ECMAScript 5 strict mode in browsers that support it
  // See http://en.wikipedia.org/wiki/Comma-separated_values

  var regexp = /"((?:[^"\\]|\\.)*)"|([^,\s]+)|,\s*(?=,|$)|^\s*,/g

  exports.calculate = function(original) {
    var lines = original.split(/\n+\s*/);
    var commonLength = lines[0].match(regexp).length;
    var r = [];

    var removeQuotes = function(field) {
      var removecomma = field.replace(/,\s*$/, '');
      var remove1stquote = removecomma.replace(/^\s*"/, '');
      var removelastquote = remove1stquote.replace(/"\s*$/, '');
      var removeescapedquotes = removelastquote.replace(/\\"/, '"');
      return removeescapedquotes;
    };
if (window.localStorage) {
  localStorage.original = original;
}
    for (var t in lines) {
      var temp = lines[t];
      var m = temp.match(regexp);
      var result = [];
      var error = false;

      // Skip empty lines and commentaries
      if (temp.match(/(^\s*$)|(^#.*)/)) continue;
      if (m) {
        result = m.map(removeQuotes);
        error = (commonLength != m.length);
        var rowclass = error? 'error' : '';
        r.push({ value: result, rowClass: rowclass });
      }
    }
    var template = fillTable.innerHTML;
    finaltable.innerHTML = _.template(template, {items: r});

    return r;
  };
})(this);