import {v4 as uuid} from 'uuid'

const username = uuid().slice(0,5)
const email = `${username}@tester.com`
const password = `${username}6580`

//Setting cypress to navigate the site

describe('User Form', () => {
    it('navigation to the site', () => {
        cy.visit('http://localhost:3000')
    })

    it('can submit new users (happy)', ()=> {
        cy.get('input[name="name"]')
            .type(username)
            .should('have.value', username)
    

        cy.get('input[name="email"]')
            .type(email)
            .should('have.value', email)

        cy.get('input[name="password"]')
            .type(password)
            .should('have.value', password)

        cy.get('[type="checkbox"]').check()

        cy.get('button').click()



})


})