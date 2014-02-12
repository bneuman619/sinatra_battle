require "spec_helper"

feature "The Homepage" do
  scenario "by default it works" do
    visit("/")
    expect(page).to have_content('Offense')
  end

  scenario "on first load, player id is not on the page" do
    visit("/")
    expect(page).to_not have_content("player1")
  end

  scenario "after 'signing up', player id is on the page" do
    visit("/player1")
    visit("/")
    expect(page).to have_content("player1")
  end
end
