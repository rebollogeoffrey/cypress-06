describe('Account Management', () => {
    let user = require("../fixtures/userData.json")

    it(`Create account for ${user.fullName}`, () => {
        cy.visit('https://preprod.backmarket.fr/fr-fr/register')

        // Register
        cy.get('[data-qa=accept-cta]').click()

        // Get an input, type into it
        cy.get('#firstName').type(user.firstName)
        //  Verify that the value has been updated
        cy.get('input[id="firstName"]').should('have.value', user.firstName)

        // Get an input, type into it
        cy.get('#lastName').type(user.lastName)
        //  Verify that the value has been updated
        cy.get('input[id="lastName"]').then(actualValue => {
            expect(actualValue).to.have.value(user.lastName)
        })

        // Get an input, type into it
        cy.get('#signup-email').type(user.email)
        //  Verify that the value has been updated
        cy.get('input[id="signup-email"]').then(actualValue => {
            expect(actualValue).to.have.value(user.email)
        })

        // Get an input, type into it
        cy.get('#signup-password').type(user.password)
        //  Verify that the value has been updated
        cy.get('input[id="signup-password"]').then(actualValue => {
            expect(actualValue).to.have.value(user.password)
        })

        // Register
        cy.get('[data-qa=signup-submit-button]').click()
        // Vérify the URL after click
        cy.url().should('include', '/dashboard')
    })

    it.only(`Change Password for ${user.fullName}`, async () => {
        cy.visit("https://preprod.backmarket.fr/fr-fr")
        cy.get('[data-qa=accept-cta]').click()


        // Click on the connexion button & check the user is not already connected
        cy.get('a[href="/auth/login?next=%2Ffr-fr%2Fdashboard"]').click()
        cy.url().should('include', 'https://accounts.preprod.backmarket.fr/fr-fr/email')

        // Insert in the right input - email
        cy.get('input[id="email"]').type(user.email)
        cy.get('input[id="email"]').then(actualValue => {
            expect(actualValue).to.have.value(user.email)
        })

        // Submit the value with the button
        cy.get('button[id="submit-login"]').click()
        cy.url().should('include', 'https://accounts.preprod.backmarket.fr/fr-fr/email/login?')

        // Click on Password Forget
        cy.get('a[href="https://preprod.backmarket.fr/password-reset?origin=auth&email=25c1b49e-8ca4-45eb-98e4-0f2769e56c82%40mailslurp.com"]').click()

        // Check the value of the input and Validate to receive the email
        cy.get('input[id="email"]').should('have.value', user.email)
        cy.get('button[data-test="password-reset-submit-button"]').click()



        // Check Email
        cy.mailslurp()
            .then(async mailslurp => {
                const email = await mailslurp.waitForLatestEmail(user.inboxId, 30000, true);

                const regex = '[0-9a-zA-Z.+_/~-]{430}';
                const pattern = `<a href="https://clicks.backmarket.com/f/a/${regex}" style="color:#3366CC;text-decoration:underline">Mon mot de passe</a>`


                const result = await mailslurp.emailController.getEmailContentMatch({
                    contentMatchOptions: { pattern },
                    emailId: email.id,
                });

                const resultHREF = result.matches[0].slice(9, 473)
                cy.wrap(resultHREF).as('linkResetPassword')

                cy.log(resultHREF)
                cy.visit(resultHREF)

            })

        // Insert in the right input - Password
        cy.get('input[id="newPassword"]').type(user.newPassword)
        cy.get('input[id="newPassword"]').then(actualValue => {
            expect(actualValue).to.have.value(user.newPassword)
        })
        // Insert in the right input - Password
        cy.get('input[id="newPasswordConfirmation"]').type(user.newPassword)
        cy.get('input[id="newPasswordConfirmation"]').then(actualValue => {
            expect(actualValue).to.have.value(user.newPassword)
        })

        // Register the changed password
        cy.get('span[class="_2GvJDBxS"]').click()
        cy.url().should('include', 'https://accounts.preprod.backmarket.fr/fr-fr/email')

        // Insert in the right input - email
        cy.get('input[id="email"]').type(user.email)
        cy.get('input[id="email"]').then(actualValue => {
            expect(actualValue).to.have.value(user.email)
        })

        // Submit the value with the button
        cy.get('button[id="submit-login"]').click()
        cy.url().should('include', 'https://accounts.preprod.backmarket.fr/fr-fr/email/login?')

        // Insert in the right input - Password
        cy.get('input[id="password"]').type(user.password)
        cy.get('input[id="password"]').then(actualValue => {
            expect(actualValue).to.have.value(user.password)
        })

        // Submit the value with the button
        cy.get('button[id="submit"]').click()
        cy.url().should('include', 'https://accounts.preprod.backmarket.fr/')
    })
})