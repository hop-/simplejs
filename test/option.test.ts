import { expect } from 'chai';
import { Option, Variant } from '../src/option';

describe('Option', () => {
  let subject: Option<number>;

  context('when is some(12)', () => {
    before(() => {
      subject = Option.some(12);
    });

    it('should return the value eqauled to 12', () => {
      expect(subject.value).to.be.equal(12);
    });

    it('should return the Some variant', () => {
      expect(subject.variant).to.be.equal(Variant.Value.Some);
    });

    it('should return true for isSome() method', () => {
      expect(subject.isSome()).to.be.equal(true);
    });

    it('should return false for isNone() method', () => {
      expect(subject.isNone()).to.be.equal(false);
    });
  });

  context('when is none', () => {
    before(() => {
      subject = Option.none();
    });

    it('should return the None variant', () => {
      expect(subject.variant).to.be.equal(Variant.Value.None);
    });

    it('should return false for isSome() method', () => {
      expect(subject.isSome()).to.be.equal(false);
    });

    it('should return true for isNone() method', () => {
      expect(subject.isNone()).to.be.equal(true);
    });

    it('should throw error when getting the value', () => {
      const valueCaller = () => subject.value;

      expect(valueCaller).to.throw(Error);
    });
  });
});
