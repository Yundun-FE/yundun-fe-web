// / <reference types="Cypress" />
/* eslint-env mocha */
/* global cy, File */

//
// very first two tests
//
it('loads the app', () => {
  cy.visit('/')
  cy.contains('云盾官网')

  cy.get('#product_5').click()
})

it('类型选择检查', () => {
  cy.get('#filter_type label:eq(1)').click()
  cy.contains('wp1')
  cy.get('#filter_type label:eq(2)').click()
  cy.contains('cp1')
  cy.get('#filter_type label:eq(3)').click()
  cy.contains('pr1')
  cy.get('#filter_type label:eq(4)').click()
  cy.contains('pp1')
})

it('product page', () => {
  cy.visit('#/product/index')

  cy.get('#btnAdd').click()
  cy.get('#form_title').type('title')
  cy.get('#form_url').type('url')
  cy.get('#form_env').click()
  cy.get('.el-select-dropdown__list li:eq(1)').click()
  cy.get('#form_name').type('name')
  cy.get('#form_setting').type('{}')
  cy.get('#btn-cancel').click()

  cy.get('#btnAdd').click()
  // cy.get('.el-dialog').contains('取 消').click()

  cy.get('#form_title').should('have.value', 'title')
})

// it('product page-3', () => {
//   cy.visit('#/product/id/4')
// })

// it('setting', () => {
//   cy.visit('#/setting/index')
// })

// it('account', () => {
//   cy.visit('#/account/index')
// })

// it('cmd', () => {
//   cy.visit('#/cmd/index')
// })
