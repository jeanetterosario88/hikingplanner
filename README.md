# THE HIKING PLANNER


## INTRODUCTION

This project builds the The Hiking Planner, a site where anyone can read and create hikes (trails) for a city of their choosing.

## OVERVIEW

This is a single-page application that uses:

* Ruby on Rails as an API

* Javascript

* HTML

* CSS

* ActiveRecord

* RESTful routes

* SQL Lite

This application implements two Ruby classes: Location & Trail. This application is not user-based. Anyone can add a City of their own choosing if it does not already exist. They can add or just read the Trails, or hikes, listed under each city. The city list is sorted alphabetically, to make it easier to read. Upon clicking on a city, a modal pops up with each trail as it's own "card". The trailcards are sorted by amount of likes, with the trails with the highest ratings appearing on the top. Anyone can add their own trail card, as well, if they would like to contribute.


## DEVELOPMENT

Fork and clone this project. Try this app in your local environment. 

Run the following commands inside this project's directory, making sure you're initially in the "backend" folder.

    $ bundle install

    $ rails db:migrate


    $ rails db:seed (if applicable)


Start up local server while in the backend directory

    $ rails s


For interactive console

    $ rails console


To get a visual, go to the frontend/src folder and run: 

    $ open index.html


## FUTURE IMPROVEMENTS

* Add notes functionality, where people can comment on trails

* Add images from the image-url information to trailcards

## CONTRIBUTING

Bug reports and pull requests are welcome on GitHub at https://github.com/jeanetterosario88/hikingplanner.git Contributors are expected to adhere to the Contributor Covenant code of conduct.

## LICENSE

The project is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

# hikingplanner
