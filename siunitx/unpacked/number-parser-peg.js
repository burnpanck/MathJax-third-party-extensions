define([], function () { return (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleIndices = { start: 0 },
        peg$startRuleIndex   = 0,

        peg$consts = [
          function(prod) {
          	prod.forEach(function(fac){
              	var nums = [fac.num,fac.denom];
                  nums = nums.map(function(num){
                  	if(num===null)return num;
                      // TODO: scientific-notation/fixed-exponent
                  	postproc(num.re);
                  	postproc(num.im,false,true);
                  	postproc(num.exp,true);
                      // TODO: retain-unity-mantissa retain-zero-exponent
                      num = fmtComplExp(num);
                  	return num;
                  });
                  fac.num = nums[0];
                  fac.denom = nums[1];
              });
          	return prod;
          },
          function(head, tail) {
          	var ret=[head];
              tail.forEach(function(f){ret.push(f[1]);});
              return ret;
          },
          "x",
          { type: "literal", value: "x", description: "\"x\"" },
          function(num) {return num;},
          "/",
          { type: "literal", value: "/", description: "\"/\"" },
          function(num, denom) {
          	return {num:num, denom:denom && denom[3]};
          },
          function(rel, mantissa, exp) {
          	mantissa.exp = exp && exp[1];
              mantissa.rel = rel && rel[0];
          	return mantissa;
          },
          function(re, im) {
          	var res = re[0] && re[0][0];
              re = re[1];
              re.sign = res;
              var ims = im && im[1];
              im = im && im[3];
              if(im) im.sign = ims;
          	return {
              	re: re,
                  im: im,
              }
          },
          function(sign, num, uncert) {
          	var n = num.frac.length;
              var m = uncert.frac.length;
              num.frac = num.frac + '0'.repeat(Math.max(0,m-n));
              uncert.frac = uncert.frac + '0'.repeat(Math.max(0,n-m));
              num.uncert = uncert.int + uncert.frac;
              num.sign = sign && sign[0];
          	return {re:num};
          },
          function(num, root) {
          	num.root = root; return num;
          },
          function(root, num) {
          	num.root = root; return num;
          },
          { type: "other", description: "complexRoot" },
          /^[ij]/,
          { type: "class", value: "[ij]", description: "[ij]" },
          /^[eEdD]/,
          { type: "class", value: "[eEdD]", description: "[eEdD]" },
          function(sign, exponent) {
          	exponent.sign = sign && sign[0];
              return exponent;
          },
          /^[+\-]/,
          { type: "class", value: "[+-]", description: "[+-]" },
          function() { return text(); },
          "+-",
          { type: "literal", value: "+-", description: "\"+-\"" },
          "\\pm",
          { type: "literal", value: "\\pm", description: "\"\\\\pm\"" },
          function() {return '\\pm';},
          "-+",
          { type: "literal", value: "-+", description: "\"-+\"" },
          "\\mp",
          { type: "literal", value: "\\mp", description: "\"\\\\mp\"" },
          function() {return '\\mp';},
          "<<",
          { type: "literal", value: "<<", description: "\"<<\"" },
          "\\ll",
          { type: "literal", value: "\\ll", description: "\"\\\\ll\"" },
          function() {return '\\ll';},
          "<",
          { type: "literal", value: "<", description: "\"<\"" },
          function() {return '<';},
          "<=",
          { type: "literal", value: "<=", description: "\"<=\"" },
          "\\le",
          { type: "literal", value: "\\le", description: "\"\\\\le\"" },
          "q",
          { type: "literal", value: "q", description: "\"q\"" },
          function() {return '\\le';},
          ">>",
          { type: "literal", value: ">>", description: "\">>\"" },
          "\\gg",
          { type: "literal", value: "\\gg", description: "\"\\\\gg\"" },
          function() {return '\\gg';},
          ">",
          { type: "literal", value: ">", description: "\">\"" },
          function() {return '>';},
          ">=",
          { type: "literal", value: ">=", description: "\">=\"" },
          "\\ge",
          { type: "literal", value: "\\ge", description: "\"\\\\ge\"" },
          function() {return '\\ge';},
          /^[.,]/,
          { type: "class", value: "[.,]", description: "[.,]" },
          "(",
          { type: "literal", value: "(", description: "\"(\"" },
          ")",
          { type: "literal", value: ")", description: "\")\"" },
          function(num, uncert) {
          	uncert = uncert && uncert[3];
              num.uncert = uncert;
              return num;
          },
          { type: "other", description: "decimal" },
          function(int, rest) {
          	var sep = rest && rest[1];
              var frac = rest && rest[2] && rest[2][1];
              return {int: int, sep:sep, frac:frac || ''};
          },
          function(sep, frac) {
          	return {int: '', sep:sep, frac:frac};
          },
          { type: "other", description: "integer" },
          function() { return parseInt(text(), 10); },
          /^[0-9]/,
          { type: "class", value: "[0-9]", description: "[0-9]" },
          function() {return text();},
          { type: "other", description: "whitespace" },
          /^[ \t\n\r]/,
          { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" }
        ],

        peg$bytecode = [
          peg$decode("%;>/:#;!/1$;>/($8#: #!!)(#'#(\"'#&'#"),
          peg$decode("%;#/_#$%;>/,#;\"/#$+\")(\"'#&'#06*%;>/,#;\"/#$+\")(\"'#&'#&/)$8\":!\"\"! )(\"'#&'#"),
          peg$decode("%2\"\"\"6\"7#/:#;>/1$;#/($8#:$#! )(#'#(\"'#&'#"),
          peg$decode("%;$/b#%;>/D#2%\"\"6%7&/5$;>/,$;$/#$+$)($'#(#'#(\"'#&'#.\" &\"/)$8\":'\"\"! )(\"'#&'#"),
          peg$decode("%%;6/,#;>/#$+\")(\"'#&'#.\" &\"/T#;%/K$%;>/,#;+/#$+\")(\"'#&'#.\" &\"/*$8#:(##\"! )(#'#(\"'#&'#"),
          peg$decode("%%%;//,#;>/#$+\")(\"'#&'#.\" &\"/,#;8/#$+\")(\"'#&'#/\\#%;>/>#;//5$;>/,$;'/#$+$)($'#(#'#(\"'#&'#.\" &\"/)$8\":)\"\"! )(\"'#&'#"),
          peg$decode("%%;//,#;>/#$+\")(\"'#&'#.\" &\"/W#;9/N$;>/E$;-/<$;>/3$;9/*$8&:*&#%$ )(&'#(%'#($'#(#'#(\"'#&'#"),
          peg$decode(";(.# &;)"),
          peg$decode("%;8/;#;>/2$;*/)$8#:+#\"\" )(#'#(\"'#&'#"),
          peg$decode("%;*/;#;>/2$;8/)$8#:,#\"\" )(#'#(\"'#&'#"),
          peg$decode("<4.\"\"5!7/=.\" 7-"),
          peg$decode("%40\"\"5!71/\\#;>/S$%;,/,#;>/#$+\")(\"'#&'#.\" &\"/2$;9/)$8$:2$\"! )($'#(#'#(\"'#&'#"),
          peg$decode("%43\"\"5!74/& 8!:5! )"),
          peg$decode("%26\"\"6677.) &28\"\"6879/& 8!::! )"),
          peg$decode("%2;\"\"6;7<.) &2=\"\"6=7>/& 8!:?! )"),
          peg$decode(";-.) &;..# &;,"),
          peg$decode("%2@\"\"6@7A.) &2B\"\"6B7C/& 8!:D! )"),
          peg$decode("%2E\"\"6E7F/& 8!:G! )"),
          peg$decode("%2H\"\"6H7I.G &%2J\"\"6J7K/7#2L\"\"6L7M.\" &\"/#$+\")(\"'#&'#/& 8!:N! )"),
          peg$decode("%2O\"\"6O7P.) &2Q\"\"6Q7R/& 8!:S! )"),
          peg$decode("%2T\"\"6T7U/& 8!:V! )"),
          peg$decode("%2W\"\"6W7X.G &%2Y\"\"6Y7Z/7#2L\"\"6L7M.\" &\"/#$+\")(\"'#&'#/& 8!:[! )"),
          peg$decode(";0.; &;2.5 &;1./ &;3.) &;5.# &;4"),
          peg$decode("4\\\"\"5!7]"),
          peg$decode("%;9/z#%;>/\\#2^\"\"6^7_/M$;>/D$;=/;$;>/2$2`\"\"6`7a/#$+&)(&'#(%'#($'#(#'#(\"'#&'#.\" &\"/)$8\":b\"\"! )(\"'#&'#"),
          peg$decode("<;:.# &;;=.\" 7c"),
          peg$decode("%;=/k#%;>/M#;7/D$%;>/,#;=/#$+\")(\"'#&'#.\" &\"/#$+#)(#'#(\"'#&'#.\" &\"/)$8\":d\"\"! )(\"'#&'#"),
          peg$decode("%;7/;#;>/2$;=/)$8#:e#\"\" )(#'#(\"'#&'#"),
          peg$decode("<%;=/& 8!:g! )=.\" 7f"),
          peg$decode("%$4h\"\"5!7i/,#0)*4h\"\"5!7i&&&#/& 8!:j! )"),
          peg$decode("<$4l\"\"5!7m0)*4l\"\"5!7m&=.\" 7k")
        ],

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleIndices)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleIndex = peg$startRuleIndices[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$decode(s) {
      var bc = new Array(s.length), i;

      for (i = 0; i < s.length; i++) {
        bc[i] = s.charCodeAt(i) - 32;
      }

      return bc;
    }

    function peg$parseRule(index) {
      var bc    = peg$bytecode[index],
          ip    = 0,
          ips   = [],
          end   = bc.length,
          ends  = [],
          stack = [],
          params, i;

      while (true) {
        while (ip < end) {
          switch (bc[ip]) {
            case 0:
              stack.push(peg$consts[bc[ip + 1]]);
              ip += 2;
              break;

            case 1:
              stack.push(void 0);
              ip++;
              break;

            case 2:
              stack.push(null);
              ip++;
              break;

            case 3:
              stack.push(peg$FAILED);
              ip++;
              break;

            case 4:
              stack.push([]);
              ip++;
              break;

            case 5:
              stack.push(peg$currPos);
              ip++;
              break;

            case 6:
              stack.pop();
              ip++;
              break;

            case 7:
              peg$currPos = stack.pop();
              ip++;
              break;

            case 8:
              stack.length -= bc[ip + 1];
              ip += 2;
              break;

            case 9:
              stack.splice(-2, 1);
              ip++;
              break;

            case 10:
              stack[stack.length - 2].push(stack.pop());
              ip++;
              break;

            case 11:
              stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
              ip += 2;
              break;

            case 12:
              stack.push(input.substring(stack.pop(), peg$currPos));
              ip++;
              break;

            case 13:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1]) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 14:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] === peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 15:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] !== peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 16:
              if (stack[stack.length - 1] !== peg$FAILED) {
                ends.push(end);
                ips.push(ip);

                end = ip + 2 + bc[ip + 1];
                ip += 2;
              } else {
                ip += 2 + bc[ip + 1];
              }

              break;

            case 17:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (input.length > peg$currPos) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 18:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 19:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 20:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 21:
              stack.push(input.substr(peg$currPos, bc[ip + 1]));
              peg$currPos += bc[ip + 1];
              ip += 2;
              break;

            case 22:
              stack.push(peg$consts[bc[ip + 1]]);
              peg$currPos += peg$consts[bc[ip + 1]].length;
              ip += 2;
              break;

            case 23:
              stack.push(peg$FAILED);
              if (peg$silentFails === 0) {
                peg$fail(peg$consts[bc[ip + 1]]);
              }
              ip += 2;
              break;

            case 24:
              peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];
              ip += 2;
              break;

            case 25:
              peg$savedPos = peg$currPos;
              ip++;
              break;

            case 26:
              params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
              for (i = 0; i < bc[ip + 3]; i++) {
                params[i] = stack[stack.length - 1 - params[i]];
              }

              stack.splice(
                stack.length - bc[ip + 2],
                bc[ip + 2],
                peg$consts[bc[ip + 1]].apply(null, params)
              );

              ip += 4 + bc[ip + 3];
              break;

            case 27:
              stack.push(peg$parseRule(bc[ip + 1]));
              ip += 2;
              break;

            case 28:
              peg$silentFails++;
              ip++;
              break;

            case 29:
              peg$silentFails--;
              ip++;
              break;

            default:
              throw new Error("Invalid opcode: " + bc[ip] + ".");
          }
        }

        if (ends.length > 0) {
          end = ends.pop();
          ip = ips.pop();
        } else {
          break;
        }
      }

      return stack[0];
    }


    function incIntStr(str){
    	var m = str.length;
        var k=m-1;
        while(k>=0 && str[k]==='9') k--;
        if(k>=0){
        	str = str.slice(0,k)
        		+ '123456789'[parseInt(str[k])]
        		+ '0'.repeat(m-k-1);
        } else str = '1' + '0'.repeat(m);
        return str;
    }
    function postproc(num,no_rounding,retain_plus){
    	if(num===null)return;
    	var n;
        // -- explicit signs
        if(num.sign === null)
        	num.sign = options['explicit-sign'] || null;
        else if(!retain_plus && num.sign === '+' && !options['retain-explicit-plus'])
        	num.sign = null;
        // -- remove leading zeros
        num.int = num.int.replace(/^00*/,'')
        // -- missing zeros
    	if(!num.int) //&& options['add-integer-zero']
        	num.int = '0';
        if(num.sep && !num.frac) //&& options['add-decimal-zero']
        	num.frac = '0';
        // -- minimum integer digits
        n = options['minimum-integer-digits'] - num.int.length
        if(n>0)
        	num.int = '0'.repeat(n) + num.int;
        // -- rounding
        // TODO: disable rounding when non-digits present in number
    	if(!no_rounding && num.uncert===null){ //&& options['round-mode']!=='off'
            if(true){//options['round-mode']==='figures')
            	n = num.int.replace(/^00*/,'').length;
                if(n)
                	n += num.frac.length;
                else
                	n = num.frac.replace(/^00*/,'').length;
            } else
            	n = num.frac.length;  // round-mode = places
            n -= 3; //options['round-precision'];
            switch(Math.sign(n)){
            case 1:
            	// Too many digits
                var comb = num.int + num.frac;
                var dir = Math.sign(parseInt(comb[comb.length-n])-5);
                if(!dir && n>1 && parseInt(comb.slice(1-n)))
                	dir = 1;
                comb = comb.slice(0,-n);
                if(!dir){
                	// exactly half
                    switch(options['round-half']){
                    case 'up': // actually: up in magnitude
                    	dir = 1;
                        break;
                    default:
                    case 'even':
                    	dir = parseInt(comb[comb.length-1])&1 ? 1 : -1;
                        break;
                    }
                }
                if(dir===1) comb = incIntStr(comb);
                if(n<num.frac.length){
                	// decimal result
                    num.int = comb.slice(0,n-num.frac.length);
                    num.frac = comb.slice(n-num.frac.length);
                } else {
                	// integer result
                    num.int = comb + '0'.repeat(n-num.frac.length);
                    num.sep = null;
                    num.frac = '';
                }
                break
            case -1:
            	// Too few digits
                if(num.sep || options['round-integer-to-decimal']){
                	num.sep = num.sep || '.';
                	num.frac += '0'.repeat(-n);
                }
                break
            };
        };
    	if(
        	false //options['zero-decimal-to-integer']
            && !(num.frac && parseInt(num.frac))
        ) {num.frac=null;num.sep=null;};
    };
    function fmtDecimal(num){
      var integer = num.int;
      var fractional = num.frac;

      var gd = options['group-digits'];
      var md = options['group-minimum-digits'];
      var gs = '{' + options['group-separator'] + '}';
      var dm = '{' + (
      	options['copy-decimal-marker'] || true
        ? num.sep
        : options['output-decimal-marker']
      ) + '}';

      var sign = (num.sign || '');

    //  integer = integer || '0';
      var l = integer.length;
      if(l>=md && (gd==='true' || gd==='integer')){
        l-=3;
        for(;l>0;l-=3){
    	    integer = integer.slice(0,l) + gs + integer.slice(l);
        }
      }

      if(!num.sep)
    	  return sign + integer;

      l = fractional.length;
      if(l>=md && (gd==='true' || gd==='decimal')){
        l-=1+(l-1)%3;
        for(;l>0;l-=3){
    	    fractional = fractional.slice(0,l) + gs + fractional.slice(l);
        }
      }

      return (
        sign
      	+ integer
        + dm
        + fractional
      );
    };

    function fmtComplExp(num){
    	var ob='',cb='';
        if(num.exp && options['bracket-numbers']){
        	ob = (options['open-bracket'] || '(') + ' ';
    		cb = ' ' + (options['close-bracket'] || ')');
        }

    	var re = num.re && fmtDecimal(num.re);
        var im = null;
        if(num.im){
        	var cr = (
              options['copy-complex-root'] || true
              ? num.im.root
              : options['output-complex-root']
            );
        	im = fmtDecimal(num.im);
            if(options['complex-root-position'] === 'before-number')
            	im = cr+im;
            else
            	im = im+cr;
        }
        var ret = num.rel ? num.rel+' ' : '';
        if(re !== null) {
        	if(im === null) ret += re;
            else ret += ob + re + ' ' + im + cb;
        } else if(im !== null) ret += im;
        else error('neither re nor im given'); // should never happen

        if(num.exp){
        	var exp = fmtDecimal(num.exp);
        	var oem = options['output-exponent-marker'];
        	if(oem)
            	ret += ' ' + oem + ' ' + exp;
            else
            	ret += (
                	' ' + (options['exponent-product'] || '\\times')
                    + ' ' + (options['exponent-base'] || '10')
                    + '^{' + exp + '}'
                );
        }
        return ret;
    };



    peg$result = peg$parseRule(peg$startRuleIndex);

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})(); });