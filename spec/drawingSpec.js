describe("DrawingSpec", function() {
  var drawing;

  beforeEach(function () {
    module('RechnenRucksack');
    inject(function ($injector) {
      drawing = $injector.get('TreasureMapDrawingService');
    });
  });

  it("splits empty string", function() {
      var result = drawing.breakAnyString("", 4);
      console.log(result);
      expect(result).toEqual([]);
    });

it("splits string with threshold aaaa bbbb 4", function() {
    var result = drawing.breakAnyString("aaaa bbbb", 4);
    console.log(result);
    expect(result).toEqual(['aaaa', 'bbbb']);
  });

  it("splits string with aaa bbbb 4", function() {
    var result = drawing.breakAnyString("aaa bbbb", 4);
    expect(result).toEqual(['aaa','bbbb']);
  });

  it("splits string with aaabbbb 4", function() {
    var result = drawing.breakAnyString("aaabbbb", 4);
    expect(result).toEqual(['aaab','bbb']);
  });

  it("splits string with aaa aa bb bbb 6", function() {
    var result = drawing.breakAnyString("aaa aa bb bbb", 6);
    expect(result).toEqual(['aaa aa','bb bbb']);
  });
});
