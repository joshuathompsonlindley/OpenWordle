import * as GameOption from '../../openwordle_client/build/option.js';

describe('Check if the GameEventManager', function () {
  beforeEach(function () {
    cy.visit(GameOption.url);
    cy.wait(500);

    cy.intercept('GET', `${GameOption.url}/is_valid_word/right`, { fixture: 'is_valid_word.json' }).as('right_valid_word');
    cy.intercept('GET', `${GameOption.url}/is_valid_word/wrong`, { fixture: 'is_valid_word.json' }).as('wrong_valid_word');
    cy.intercept('GET', `${GameOption.url}/is_valid_word/maybe`, { fixture: 'is_valid_word.json' }).as('maybe_valid_word');
    cy.intercept('GET', `${GameOption.url}/current_status/right`, { fixture: 'right_word.json' }).as('right_word');
    cy.intercept('GET', `${GameOption.url}/current_status/wrong`, { fixture: 'wrong_word.json' }).as('wrong_word');
    cy.intercept('GET', `${GameOption.url}/current_status/maybe`, { fixture: 'maybe_word.json' }).as('maybe_word');
  });

  it('triggers the keyboardEnterInputEvent', function () {

  });

  it('triggers the keyboardAlphaInputEvent', function () {

  });

  it('triggers the keyboardBackspaceInputEvent', function () {
    
  });

  it('triggers the gameOverEvent', function () {
    
});

});