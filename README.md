# Moltenite

The goal of this project is to implement a link aggregator (reddit clone) by using HTML and Javascript / ECMAScript.
Mini project link aggregator

Use Cases 

Acceptance Criterias:

● The entries should be persisted within the session but must not be persisted permanently (e.g.: stored in a database).  
● If the user does not enter all required data, he should receive feedback about the missing fields   
● If the validation fails (e.g. a title which is longer than 60 characters), it should not be possible to save the entry  

Vote entries:

As a user I want to vote on all existing entries. It should be possible to upvote and downvote an entry. Acceptance Criterias:
● Each upvote increases the vote counter by 1     
● Each downvote decreases the vote counter by 1       
● A newly added entry starts with a vote counter of 0       
● The vote counter must not be higher than 10         
● The list must be resorted if the counter changes        

Show entries:

As a user I want to see existing and new entries in a list based view. The title must be displayed and must link to the website which was provided by the user.

Acceptance Criterias:

● The list must be sorted (descended) by the vote counters. This means an entry with a counter of 6 is positioned higher than an entry with a counter of 3          
● The design of the solution should somewhat be similar to the one in the following screenshot. You are permitted to use a frontend framework like bootstrap or foundation.       
