import { browser } from 'protractor';
import { SimmageUiPage } from './app.po';

describe('simmage-ui App', function () {
  let page: SimmageUiPage;

  beforeEach(() => {
    page = new SimmageUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateToHome();
    expect(browser.getCurrentUrl()).toMatch(/\/login$/);
  });
});
