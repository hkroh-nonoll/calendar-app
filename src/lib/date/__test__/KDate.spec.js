function getUser(id) {
  return {
    id,
    email: `user${id}@test.com`
  };
}

test('한글 테스트명', () => {
  expect(getUser(1)).toEqual({
    id: 1,
    email: `user1@test.com`
  });
});

test('null', () => {
  const n = null;
  expect(n).toBeNull();           // only null
  // expect(n).toBeUndefined();      // only undefined 
  expect(n).not.toBeUndefined();  // opposite of toBeUndefined
  expect(n).not.toBeTruthy();     // Anything that an if statement treats as true  
  expect(n).toBeFalsy();          // Anything that an if statement treats as false 
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});


test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// float값 테스트 시, toEqual 대신에 toBeCloseTo를 사용해야합니다.
// toEqual 사용시 미세하게 값이 다르게 나올 수 있어 테스트가 틀릴수도 있습니다.

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  expect(value).toBeCloseTo(0.3);
});

// Strings
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});


const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer'
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});

describe(`# NativeBridge Environment.getWifiConnected TEST`, () => {
  // before(() => {
  // });

  it('wait for before', done => {
    done();
  });

  describe('# native getWifiConnected not defined', () => {
    it(` getWifiConnected isSupport`, () => {
      expect(shoppingList).toContain('beer');
    });
  });
});

test('This is a sample', () => {
  expect(true).toBe(true);
});
