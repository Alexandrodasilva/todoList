import { CustomUpperCasePipe } from './custom-upper-case.pipe';

describe('CustomUpperCasePipe', () => {

  const customUpperCasePipe = new CustomUpperCasePipe();

  it("should return 'ANGULAR TEST'", () => {
    const textTransformed = customUpperCasePipe.transform('angular test');
    expect(textTransformed).toEqual('ANGULAR TEST');
  });

  it("should return 'ANGULAR TEST'", () => {
    const textTransformed = customUpperCasePipe.transform('ANGULAR TEST');
    expect(textTransformed).toEqual('ANGULAR TEST');
  });
});
