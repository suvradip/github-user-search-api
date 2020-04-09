# Project

1. https://api.github.com/search/users?q=<query> (where "query" will be an input from the search input)
2. https://api.github.com/users/<username> (where "username" from the user info of the card clicked)Part

Design a _search page_ for github users which has a "input/search box". Use the first API endpoint for fetching the search results.

-  Show the list of users in 3 grid layout with each user card having a width 300px and containing user avatar, user name, and rounded score.
-  On clicking the card, make second api call following which a modal should pop with following more

details:

1. public_repos
2. followers
3. following
4. created_at
5. show a admin flag if the user is admin.
   ​
   Part 2: The list of user cards should be sortable in following 2 ways:

6. high to low score
7. low to high score​

TODO:

1. Admin marking
2. sorting, mostly part 2
