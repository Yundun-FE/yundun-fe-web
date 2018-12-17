// / <reference types="Cypress" />
/* eslint-env mocha */
/* global cy, File */

//
// very first two tests
//
it('loads the app', () => {
  cy.visit('/')
  cy.contains('云盾官网')
})

it('product page', () => {
  cy.visit('#/product/index')
})

it('product page-3', () => {
  cy.visit('#/product/id/4')
})

it('setting', () => {
  cy.visit('#/setting/index')
})

it('account', () => {
  cy.visit('#/account/index')
})

it('cmd', () => {
  cy.visit('#/cmd/index')
})
