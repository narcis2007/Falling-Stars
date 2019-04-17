import { FallingStarsUiPage } from './app.po';

describe('falling-stars-ui App', function() {
  let page: FallingStarsUiPage;

  beforeEach(() => {
    page = new FallingStarsUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
