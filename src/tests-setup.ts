import 'babel-polyfill';

declare global {
  namespace testing {
    function getSpyArgumentsForCall(spy: () => any, callNumber: number): any[];
  }
}

// tslint:disable-next-line:no-string-literal
window['testing'] = <typeof testing> {
  getSpyArgumentsForCall: (spy, callNumber) => (spy as jasmine.Spy).calls.argsFor(callNumber)
};

// This gets replaced by karma webpack with the updated files on rebuild
// tslint:disable-next-line:variable-name
const __karmaWebpackManifest__ = [];

// require all modules ending in "_test" from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /\.tests\.ts$/);

function inManifest(path) {
  return __karmaWebpackManifest__.indexOf(path) >= 0;
}

let runnable = testsContext.keys().filter(inManifest);
// Run all tests if we didn't find any changes
if (runnable.length === 0) {
  runnable = testsContext.keys();
}

runnable.forEach(testsContext);

/**
 *  Tests Conventions
 *
 *
 *  - use AAA (Arrange-Act-Assert) unit testing pattern
 *
 *  - describe('{DomainObjectInTest}', () => { ... })
 *
 *  - it('should {ActDescription} when / with {CaseDescription}', () => { ... })
 *
 *  - test cases must be decoupled from each other,
 *    e.g Test-A must succeed no matter whether Test-B fail or not
 *
 *  - each test must assert for only one thing,
 *    e.g instead of having only one it('should create order') test
 *    in which you assert for order's pending status and for published order created message,
 *    you must have it('should create order with pending status') and it('should publish order created message when create order')
 *
 *  - dont forget to clean up tests in jasmine's afterEach / afterAll hooks
 */