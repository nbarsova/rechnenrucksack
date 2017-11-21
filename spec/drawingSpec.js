describe("StringUtilSpec", function() {
  var stringSpec;

  beforeEach(function () {
    module('RechnenRucksack');
    inject(function ($injector) {
      stringsUtilService = $injector.get('StringUtilService');
    });
  });

  it("splits empty string", function() {
      var result = stringsUtilService.breakAnyString("", 4);
      console.log(result);
      expect(result).toEqual([]);
    });

it("splits string with threshold aaaa bbbb 4", function() {
    var result = stringsUtilService.breakAnyString("aaaa bbbb", 4);
    console.log(result);
    expect(result).toEqual(['aaaa', 'bbbb']);
  });

  it("splits string with aaa bbbb 4", function() {
    var result = stringsUtilService.breakAnyString("aaa bbbb", 4);
    expect(result).toEqual(['aaa','bbbb']);
  });

  it("splits string with aaabbbb 4", function() {
    var result = stringsUtilService.breakAnyString("aaabbbb", 4);
    expect(result).toEqual(['aaab','bbb']);
  });

  it("splits string with aaa aa bb bbb 6", function() {
    var result = stringsUtilService.breakAnyString("aaa aa bb bbb", 6);
    expect(result).toEqual(['aaa aa','bb bbb']);
  });

  it("splits шла саша по шоссе", function() {
    var result = stringsUtilService.breakAnyString("шла саша по шоссе и сосала сушку", 10);
    expect(result).toEqual(['шла саша','по шоссе и','сосала', 'сушку']);
  });
});
