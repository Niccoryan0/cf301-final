'use strict';

// to learn more about the cheerio library and what it is doing, look at their documentation: https://www.npmjs.com/package/cheerio
const cheerio = require('cheerio');

/* ------------------------------------------------------------------------------------------------

Write a function named updateFavoriteFood that given the list below, uses jQuery to update the <li> with the attribute `data-favoriteFood="favoriteFood"` from bananas to cherries. 
------------------------------------------------------------------------------------------------ */

$ = createSnippetWithJQuery(`
  <ul>
    <li>apples</li>
    <li data-favoriteFood="favoriteFood">bananas</li>
    <li>carrots</li>
    <li>beans</li>
    <li>coffee</li>
  </ul>
`);

const updateFavoriteFood = () => {
// Solution code here ...
}

describe('Testing challenge', () => {
  test('It should replace the word banana with cherries', () => {
    updateFavoriteFood();
    expect($('li[data-favoriteFood="favoriteFood"]').text()).toStrictEqual('cherries');
  })
});

function createSnippetWithJQuery(html){
  return cheerio.load(html);
};
