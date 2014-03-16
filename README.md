
This is a Sinatra-based web version of the game Battleship.

My focus during this project was practicing my JavaScript chops, learning about Ajax polling in turn-based games,
and writing good/clear OOJS.

So, the JS is okay while the non-JS (controllers, models) are a messy horrendous hack.

I received some great feedback re: un-messing the controllers from Corey Haines. He also gave me advice on how to apply EDD/TDD to this project.

Now that I finally have time I am trying to go back and apply some of Corey's advice to rewrite the controllers and helpers. It might be better just to start over again, but I am finding it helpful to go bit-by-bit on a program that already 'works'.

-------------------------------------------------------------------------------------------------------------

To run: git clone the repository. Then rake db:create, rake db:migrate, rake db:seed.

The game is in the very early stages. Right now, ship placement for both players is hard-coded and only involves two ships.
You can change the hard-coded ship placement by changing db/seeds.rb and reseeding the database.

Eventually, a new Player will be created for every new game; ships will be placed via some ship placement user flow.

As of now, the only way to identify yourself as player 1 or player2 is to visit localhost:3000/player1 or localhost:3000/player2

Once you visit the appropriate route, your cookie is set and you are ready to play.

Go to localhost:3000 to start playing.

If you lose track of whose turn it is, watch the JavaScript console.

This was one of my very first Sinatra projects, so the logic in the controllers and models is not very well-factored.

However the JavaScript (public/js) is reasonably well-factored. It was my introduction to using Ajax polling to 
implement turn-based gameplay. It was also my first attempt to write OOP JavaScript: separate 'code concerns'
from 'DOM concerns'. (E.g., DefenseTurn does all the Ajax work for talking to the server and listening for 
results for the opponent's turn. DefenseResultsView#render is called by DefenseTurn when results exactly show up.
DefenseResultsView#render displays the results in the browser to the user.

The HTML and CSS are ugly. Please forgive me! I learned a lot about Ajax and polling and JS from the project.
