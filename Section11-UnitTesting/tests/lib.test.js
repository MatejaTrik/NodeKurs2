const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')

describe('absolute', () => {
    it('should return a positive num if input is positive', () => {
        const result = lib.absolute(22);
        expect(result).toBe(22)
    })
    
    it('should return a positive num if input is negative', () => {
        const result = lib.absolute(-22);
        expect(result).toBe(22)
    })
    
    it('should return a zero num if input is zer0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0)
    })

})

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mateja');
        // expect(result).toMatch(/mateja/i);
        expect(result).toContain('Mateja')
    })
})

describe('getCurrencies', () => {
    it('should return supported currentines', () => {
        const result = lib.getCurrencies();

        //too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //to specific
        expect(result[0]).toBe('USD')
        expect(result[1]).toBe('AUD')
        expect(result[2]).toBe('EUR')
        expect(result.length).toBe(3)

        //proper way
        expect(result).toContain('USD')
        expect(result).toContain('AUD')
        expect(result).toContain('EUR')

        //ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    })
})

describe('getProducts', () => {
    it('should return product with given id', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({ id: 1, price: 10 });

        expect(result).toMatchObject({ id: 1, price: 10 })

        // expect(result).toHaveProperty('id', '1')
    })
})

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        //null
        //undefined
        //NaN
        //''
        //0
        //false 
        const args = [null, undefined, NaN, '', 0, false]
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow()
        })
    })

    it('should return a user object it valid username is passed', () => {
        const result = lib.registerUser('mateja')
        expect(result).toMatchObject({ username: 'mateja' });
        expect(result.id).toBeGreaterThan(0)
    })
    
})

describe('applyDiscount', () => {
    it('Should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading a customer...')
            return { customerId: customerId, points: 20 }
        }

        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)
    })
})

describe('notifycustomer', () => {
    it('should send an email to customer', () => {
        db.getCustomerSync = function(customerId) {
            return { email: 'a' }
        }

        let mailSent = false;

        mail.send = function(email, message) {
            mailSent = true
        }

        lib.notifyCustomer({ customerId: 1 })

        expect(mailSent).toBe(true)
    })
})