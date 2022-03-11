import * as GameOption from '../../openwordle_client/build/option.js';

describe('Check if the renderer has loaded the game correctly and it', function () {
  beforeEach(function () {
    cy.visit(GameOption.url);
    cy.wait(500);

    cy.clearLocalStorage();
    cy.wait(500)

    cy.visit(GameOption.url);
    cy.wait(500);

    cy.intercept('GET', `${GameOption.url}/is_valid_word/right`, { fixture: 'is_valid_word.json' }).as('right_valid_word');
    cy.intercept('GET', `${GameOption.url}/is_valid_word/wrong`, { fixture: 'is_valid_word.json' }).as('wrong_valid_word');
    cy.intercept('GET', `${GameOption.url}/is_valid_word/maybe`, { fixture: 'is_valid_word.json' }).as('maybe_valid_word');
    cy.intercept('GET', `${GameOption.url}/current_status/right`, { fixture: 'right_word.json' }).as('right_word');
    cy.intercept('GET', `${GameOption.url}/current_status/wrong`, { fixture: 'wrong_word.json' }).as('wrong_word');
    cy.intercept('GET', `${GameOption.url}/current_status/maybe`, { fixture: 'maybe_word.json' }).as('maybe_word');
  });

  it('renders the GameBoard elements from GameOption props properly', function () {
    // Check the title
    cy.title().should('contain', GameOption.gameTitle);

    // Check the header
    cy.get('header').should('include.text', GameOption.gameTitle).should('be.visible');

    // Check the game board
    cy.get('.gameboard .letter').should('have.length', (GameOption.gameBoardLength * GameOption.gameBoardRowLength));
  });

  it('renders the elements for the game keyboard', function () {
    // Make sure the key rows are correct
    cy.get('.keyboard').should('have.length', 3);
    cy.get('.keyboard.long').should('have.length', 1);
    cy.get('.keyboard.short').should('have.length', 2);

    // Make sure the enter key is visible
    cy.get('.keyboard .key.enter').should('have.text', '⏎').should('be.visible');

    // Make sure the backspace key is visible
    cy.get('.keyboard .key.backspace').should('have.text', '⌫').should('be.visible');

    // Make sure the right amount of letters are visible
    cy.get('.keyboard.long .key').should('have.length', 10).should('be.visible');
    cy.get('.keyboard.short .key').should('have.length', 18).should('be.visible');
  });

  it('renders the cell animation transition', function () {

    // Play first answer
    cy.get('.keyboard .key.letter#w').click();
    cy.wait(500);
    cy.get('.keyboard .key.letter#r').click();
    cy.wait(500);
    cy.get('.keyboard .key.letter#o').click();
    cy.wait(500);
    cy.get('.keyboard .key.letter#n').click();
    cy.wait(500);
    cy.get('.keyboard .key.letter#g').click();

    // Enter the first answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@wrong_valid_word').then(_ => {
      cy.wait('@wrong_word').then(_ => {
        // Assert previous active row has .submitted class
        cy.get('.gameboard .letter.one.active')
          .prev().should('have.class', 'submitted')
          .prev().should('have.class', 'submitted')
          .prev().should('have.class', 'submitted')
          .prev().should('have.class', 'submitted')
          .prev().should('have.class', 'submitted');
      });
    });

  });

  it('renders the cell colour', function () {
    // Play first answer
    cy.get('.keyboard .key.letter#w').click();
    cy.get('.keyboard .key.letter#r').click();
    cy.get('.keyboard .key.letter#o').click();
    cy.get('.keyboard .key.letter#n').click();
    cy.get('.keyboard .key.letter#g').click();

    // Enter the first answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@wrong_valid_word').then(_ => {
      cy.wait('@wrong_word').then(_ => {
        // Assert previous active row has .submitted class
        cy.get('.gameboard .letter.one.active')
          .prev().should('have.class', '⬛')
          .prev().should('have.class', '⬛')
          .prev().should('have.class', '⬛')
          .prev().should('have.class', '⬛')
          .prev().should('have.class', '⬛');
      });
    });

    cy.wait(2000);

    // Play second answer
    cy.get('.keyboard .key.letter#m').click();
    cy.get('.keyboard .key.letter#a').click();
    cy.get('.keyboard .key.letter#y').click();
    cy.get('.keyboard .key.letter#b').click();
    cy.get('.keyboard .key.letter#e').click();

    // Enter the second answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@maybe_valid_word').then(_ => {
      cy.wait('@maybe_word').then(_ => {
        // Assert previous active row has .submitted class
        cy.get('.gameboard .letter.one.active')
          .prev().should('have.class', '🟨')
          .prev().should('have.class', '🟨')
          .prev().should('have.class', '🟨')
          .prev().should('have.class', '🟨')
          .prev().should('have.class', '🟨');
      });
    });

    cy.wait(2000);

    // Play third answer
    cy.get('.keyboard .key.letter#r').click();
    cy.get('.keyboard .key.letter#i').click();
    cy.get('.keyboard .key.letter#g').click();
    cy.get('.keyboard .key.letter#h').click();
    cy.get('.keyboard .key.letter#t').click();

    // Enter the third answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@right_valid_word').then(_ => {
      cy.wait('@right_word').then(_ => {
        // Assert previous active row has .submitted class
        // We can't test individual elements because the game loop
        // will render the modal and remove .active from the current row.
        cy.get('.gameboard .letter.🟩').should('have.length', 5);
      });
    });
  });

  it('renders the correct state into a cell', function () {
    // Play first answer
    cy.get('.keyboard .key.letter#w').click();
    cy.get('.keyboard .key.letter#r').click();
    cy.get('.keyboard .key.letter#o').click();
    cy.get('.keyboard .key.letter#n').click();
    cy.get('.keyboard .key.letter#g').click();

    // Enter the first answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@wrong_valid_word').then(_ => {
      cy.wait('@wrong_word').then(_ => {
        // Assert previous active row has .submitted class
        cy.get('.gameboard .letter.one.active')
          .prev().should('contain.text', 'g')
          .prev().should('contain.text', 'n')
          .prev().should('contain.text', 'o')
          .prev().should('contain.text', 'r')
          .prev().should('contain.text', 'w');
      });
    });
  });

  it('renders the keyboard colour', function () {
    // Play first answer
    cy.get('.keyboard .key.letter#w').click();
    cy.get('.keyboard .key.letter#r').click();
    cy.get('.keyboard .key.letter#o').click();
    cy.get('.keyboard .key.letter#n').click();
    cy.get('.keyboard .key.letter#g').click();

    // Enter the first answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@wrong_valid_word').then(_ => {
      cy.wait('@wrong_word').then(_ => {
        // Assert keyboard has correct colour class
        cy.get('.keyboard .key.letter#w').should('have.class', '⬛');
        cy.get('.keyboard .key.letter#r').should('have.class', '⬛');
        cy.get('.keyboard .key.letter#o').should('have.class', '⬛');
        cy.get('.keyboard .key.letter#n').should('have.class', '⬛');
        cy.get('.keyboard .key.letter#g').should('have.class', '⬛');
      });
    });

    cy.wait(2000);

    // Play second answer
    cy.get('.keyboard .key.letter#m').click();
    cy.get('.keyboard .key.letter#a').click();
    cy.get('.keyboard .key.letter#y').click();
    cy.get('.keyboard .key.letter#b').click();
    cy.get('.keyboard .key.letter#e').click();

    // Enter the second answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@maybe_valid_word').then(_ => {
      cy.wait('@maybe_word').then(_ => {
        // Assert keyboard has correct colour class
        cy.get('.keyboard .key.letter#m').should('have.class', '🟨');
        cy.get('.keyboard .key.letter#a').should('have.class', '🟨');
        cy.get('.keyboard .key.letter#y').should('have.class', '🟨');
        cy.get('.keyboard .key.letter#b').should('have.class', '🟨');
        cy.get('.keyboard .key.letter#e').should('have.class', '🟨');
      });
    });

    cy.wait(2000);

    // Play third answer
    cy.get('.keyboard .key.letter#r').click();
    cy.get('.keyboard .key.letter#i').click();
    cy.get('.keyboard .key.letter#g').click();
    cy.get('.keyboard .key.letter#h').click();
    cy.get('.keyboard .key.letter#t').click();

    // Enter the third answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@right_valid_word').then(_ => {
      cy.wait('@right_word').then(_ => {
        // Assert keyboard has correct colour class
        cy.get('.keyboard .key.letter#r').should('have.class', '🟩');
        cy.get('.keyboard .key.letter#i').should('have.class', '🟩');
        cy.get('.keyboard .key.letter#g').should('have.class', '🟩');
        cy.get('.keyboard .key.letter#h').should('have.class', '🟩');
        cy.get('.keyboard .key.letter#t').should('have.class', '🟩');
      })
    });
  });

  it('renders the winning modal with correct stats', function () {
    // Play first answer
    cy.get('.keyboard .key.letter#r').click();
    cy.get('.keyboard .key.letter#i').click();
    cy.get('.keyboard .key.letter#g').click();
    cy.get('.keyboard .key.letter#h').click();
    cy.get('.keyboard .key.letter#t').click();

    // Enter the third answer
    cy.get('.keyboard .key.enter').click();

    cy.wait('@right_valid_word').then(_ => {
      cy.wait('@right_word').then(_ => {
        cy.wait(1000);
        // Assert keyboard has correct colour class
        cy.get('.modal').should('be.visible');
        cy.get('.modal .win').should('contain.text', GameOption.winMessage);
        cy.get('.modal .games').should('contain.text', "1");
        cy.get('.modal .total').should('contain.text', "1");
        cy.get('.modal .percentage').should('contain.text', "100%");
        cy.get('.graph-row').should('have.length', GameOption.gameBoardLength)
        cy.get('.graph-bar').should('have.length', 1);
      });
    });
  });
});