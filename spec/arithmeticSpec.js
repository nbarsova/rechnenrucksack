describe("ArithmeticServiceSpec", function() {
  var arithmetic;

  beforeEach(function () {
    module('EquationsGenerator');
    inject(function ($injector) {
      arithmetic = $injector.get('ArithmeticService');
    });
  });

// Testing prime Check
  it("6 is not prime", function() {
    var result = arithmetic.isPrime(6);
    expect(result).not.toBe(true);
  });

  it("5 is prime", function() {
    var result =  arithmetic.isPrime(5);
    expect(result).toBe(true);
  });

 // Testing random generatedEquations

  it ("random generation, in bounds [0, 10]", function () {
    var result =  arithmetic.normalRandom(0, 10);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });

  it ("random generation in bounds [5, 5]", function () {
    var result =  arithmetic.normalRandom(5, 5);
    expect(result).toBe(5);
  });

  it ("random generation, wrong bounds [10, 0]", function () {
    expect (function () {  arithmetic.normalRandom(10, 0);}).toThrow();
  });

  it ("random generation, bounds are number literals", function () {
    var result = arithmetic.normalRandom("0", "10");
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });

  it ("random generation, bounds are not numbers", function () {
    expect (function () { arithmetic.normalRandom("zero", "ten")}).toThrow();
  });

  // testing generation of equations set

  var complexity;
  var steps=[];
  var ops=[];

  it ("Equation set generation, incorrect input, empty step list", function ()
  {
    steps=[];
    ops=[];
    ops.push('+');
    complexity=10;
    expect (function () { arithmetic.createEquationSet(steps, ops, complexity)}).toThrow();
  });

  it ("Equation set generation, incorrect input, empty operations list", function ()
  {
    steps=[];
    steps.push(1);
    ops=[];
    complexity=10;
    expect (function () { arithmetic.createEquationSet(steps, ops, complexity)}).toThrow();
  });


  it ("Equation set generation, incorrect input, complexity not a number", function ()
  {
    steps=[];
    steps.push(1);
    ops=[];
    ops.push('+');
    complexity="ten";
    expect (function () { arithmetic.createEquationSet(steps, ops, complexity)}).toThrow();
  });
});
