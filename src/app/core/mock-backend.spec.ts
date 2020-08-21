import { MockBackend } from './mock-backend';

describe('MockBackend', () => {
  it('should create an instance', () => {
    expect(new MockBackend()).toBeTruthy();
  });
});
