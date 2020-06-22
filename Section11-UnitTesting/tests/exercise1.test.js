const lib = require('../exercise1')

describe('fizzBuzz', () => {
    it('shoud throw an exeption if unpit iz not a num', () => {
        expect(() => { lib.fizzBuzz('a') }).toThrow()
        expect(() => { lib.fizzBuzz(null) }).toThrow()
        expect(() => { lib.fizzBuzz(undefined) }).toThrow()
        expect(() => { lib.fizzBuzz({}) }).toThrow()
    })

    it('should return FizzBuzz if input is divisibly by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz')
    })

    it('should return Fizz if input is divisibly by 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz')
    })
    
    it('should return FizzBuzz if input is divisibly and 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz')
    })

    it('should return input if input is not divisible', () => {
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1)
    })
})