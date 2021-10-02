## Take Home Homework (Day 4)

Create a new application using Create React App with the following pages:

1. Login page at path `/login`.  (See test No <a href="#id33">33</a>.)

2. Register page at path `/register`.  (See test No <a href="#id16">16</a>.)

3. Home page: shows list of movies.  (See test No <a href="#id26">26</a>.)

4. Movie details page at path `/movie/<movieId>`:  (See test No <a href="#id31">31</a>.)

- Show the details and comments for the movie.  (See test No <a href="#id22">22</a>.)

- Users that are logged in are allowed to add comment for the movie.  (See test No <a href="#id33">33</a>.)

5. Movie comment can be deleted by the user that created it.  (See test No <a href="#id31">31</a>, <a href="#id32">32</a>.)

# Notes:

- To register, use `https://<your-service>.herokuapp.com/docs/#/auth/register`

- To login, use `https://<your-service>.herokuapp.com/docs/#/auth/login`

- All the operations related to movies and their comments are available at
`https://<your-service>.herokuapp.com/docs/#/movie`

- To know if a comment is created by the user, check the userId property on the 
comment and the userId of the user, which can be retrieved from
`https://<your-service>.herokuapp.com/docs/#/auth/getProfile`

# Other requirements:
1. You should have at least 3 tests.  (see [`src/components/button.test.jsx`](https://github.com/encore428/movies/blob/master/src/components/button.test.jsx), [`src/components/label.test.jsx`](https://github.com/encore428/movies/blob/master/src/components/label.test.jsx), [`src/domains/movie/components/movie-item.test.jsx`](https://github.com/encore428/movies/blob/master/src/domains/movie/components/movie-item.test.jsx).)
 
1. The comment form should be validated.  (see [`src/domains/movie/components/movie-details.jsx`](https://github.com/encore428/movies/blob/master/src/domains/movie/components/movie-details.jsx).)

1. The movie listing should have Next and Prev button to show more movies.  (See test No <a href="#id28">28</a>, <a href="#id29">29</a>, <a href="#id30">30</a>.)

1. You should deploy your application to Netlify and submit the URL together with your code. (https://boring-galileo-dc314c.netlify.app/)

1. There is no requirements on the actual design and look and field, you can design yourself 
or get inspiration from Dribble: `https://dribbble.com/tags/tmdb`

# Notes:
- In order for Netlify to always serve index.html file, you need to add a 
`_redirects` file in public folder.  See [Netlify docs](https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/?_ga=2.249985294.969834175.1629299695-714944149.1629299695).


# Deployment

The app has been deployed to Netlify as below:

https://boring-galileo-dc314c.netlify.app/


During the deployment, there were two additional tasks required just because of Netlify:

1. CI=False, refer to [shoppingcart](https://github.com/encore428/shoppingcart).

1. Create file `_redirects` in `/public` folder (next to index.html), with this line `/* /index.html 200`.  Refer to 
this [article](https://ridbay.medium.com/react-routing-and-netlify-redirects-fd1f00eeee95).


# Testing

<table>
   <tr><th>No</th><th>Action</th><th>Expected results</th></tr>
   
   <tr><td colspan="3"> Begin the test for user name encore7</td></tr>
   
   <tr><td>1.</td><td>Open the URL: https://boring-galileo-dc314c.netlify.app/.</td>
       <td>See home page, and 5 movies, with title, release date, backdrop picture.</td></tr>
   <tr><td>2.</td><td>Click on any one movie</td>
       <td>URL changes to https://boring-galileo-dc314c.netlify.app/movie/{movieId} where movieId is the id of the chosen movie, for which movie old title, title, release date. poster, overview, and reviews (no review at the moment) are shown.</td></tr>
   <tr><td>3.</td><td>Click Login</td>
       <td>URL change to https://boring-galileo-dc314c.netlify.app/login, Login page appears.</td></tr>
   <tr><td>4.</td><td>Click Register new user button</td>
       <td>URL change to https://boring-galileo-dc314c.netlify.app/register, Register page appears.</td></tr>
   <tr><td>5.</td><td>Enter invalid Email, click Register</td>
       <td>Name is mandatory.</td></tr>
   <tr><td>6.</td><td>Enter name as encore7, click Register.</td>
       <td>Email is invalid.</td></tr>
   <tr><td>7.</td><td>Enter email encore7@gmail.com, click Register.</td>
       <td>Password is required.</td></tr>
   <tr><td>8.</td><td>Enter 1234 as password, click Register.</td>
       <td>Password2 is required.</td></tr>
   <tr><td>9.</td><td>Enter 1234 as password2, click Register.</td>
       <td>Error message appears on top "Minimum password length is 8 characters, try again."</td></tr>
   <tr><td>10.</td><td>Enter 12345678 as password, click Register.</td>
       <td>Error message appears on top "Password do not match, try again."</td></tr>
   <tr><td>11.</td><td>Enter 12345678 as password2, click Register.</td>
       <td>Registration successful, URL changes to https://boring-galileo-dc314c.netlify.app/login, at login screen.</td></tr>
   <tr><td>12.</td><td>Enter email encore7@gmail.com, click Login.</td>
       <td>Password is required.</td></tr>
   <tr><td>13.</td><td>Enter 1234 as password, click Login.</td>
       <td>Error message appears on top "Fail to login."</td></tr>
   <tr><td>14.</td><td>Enter 12345678 as password, click Login.</td>
       <td>URL changes to https://boring-galileo-dc314c.netlify.app/movie/{movieId} where
   movieId correspond to the one before clicking Login.</td></tr>
   <tr><td>15.</td><td>Create a 4 star review.</td>
       <td>Review appears below movie details, submitted by encore7, delete button is visible.</td></tr>
   
   <tr><td colspan="3"> Open another session for user name encore8</td></tr>
   
   <tr><th>No</th><th>Action</th><th>Expected results</th></tr>
   <tr><td>16.</td><td id='id16'>Open another browser, enter URL https://boring-galileo-dc314c.netlify.app/register</td>
       <td>On register screen.</td></tr>
   <tr><td>17.</td><td>Enter encore7, encore7@gmail.com, abcdefgh, abcdefgh, click Register.</td>
       <td>Error message appears on top "Email encore7@gmail.com already registered"</td></tr>
   <tr><td>18.</td><td>Enter encore8, encore8@gmail.com, 12345678, 12345678, click Register.</td>
       <td>Registration successful, URL changes to https://boring-galileo-dc314c.netlify.app/login, at login screen.</td></tr>
   <tr><td>19.</td><td>Enter email encore8@gmail.com, password 12345678, click Login.</td>
       <td>URL changes to https://boring-galileo-dc314c.netlify.app/movie, a list of 5 movies are displayed.</td></tr>
   <tr><td>20.</td><td>Change URL to https://boring-galileo-dc314c.netlify.app/movie/{movieId} where movieId is from the encore7 test.</td>
       <td>The same movie details are shown, with the review posted by encore7.</td></tr>
   <tr><td>21.</td><td>Post a 2 star review.</td>
       <td>Review added.  Only review by encore8 has the delete button.</td></tr>
   
   <tr><td colspan="3"> switch to browser of encore7</td></tr>
   
   <tr><th>No</th><th>Action</th><th>Expected results</th></tr>
   <tr><td>22.</td><td id='id22'>Go to browser of encore7, refresh page.</td>
       <td>Stay on the same movie page, two reviews are visible, only review by encore7 has delete button.</td></tr>
   <tr><td>23.</td><td>encore7 delete own review.</td>
       <td>Stay on the same movie page, review by encore7 disappears.</td></tr>
   
   <tr><td colspan="3"> switch to browser of encore8</td></tr>
   
   <tr><th>No</th><th>Action</th><th>Expected results</th></tr>
   <tr><td>24.</td><td>Go to browser of encore8.</td>
       <td>On the same movie page, both reviews are still visible, only review by encore8 has delete button.</td></tr>
   <tr><td>25.</td><td>Refresh page.</td>
       <td>On the same movie page, reviews by encore7 disappears, review by encore8 re still visible and with delete button.</td></tr>
   <tr><td>26.</td><td id='id26'>Click "React Homework - day 4"</td>
       <td>URL changes to https://boring-galileo-dc314c.netlify.app/, 5 movies visible on screen.</td></tr>
   <tr><td>27.</td><td>click "Movies"</td>
       <td>URL changes to https://boring-galileo-dc314c.netlify.app/movie, another 5 movies visible on screen.</td></tr>
   <tr><td>28.</td><td id='id28'>click "Prev" button</td>
       <td>Nothing happens.</td></tr>
   <tr><td>29.</td><td id='id29'>Click "Next" button</td>
       <td>Another 5 movies visible on screen.</td></tr>
   <tr><td>30.</td><td id='id30'>Click "Prev" button.</td>
       <td>Another 5 movies visible on screen.</td></tr>
   <tr><td>31.</td><td id='id31'>Change URL to https://boring-galileo-dc314c.netlify.app/movie/{movieId} where movieId is from the encore7.</td>
       <td>The same movie details are shown, with the review posted by encore8 appearing with delete button.</td></tr>
   <tr><td>32.</td><td id='id32'>Click Logout button.</td>
       <td>On the same movie page, review input form disappears, reviews by encore8 stays but without delete button.</td></tr>
   <tr><td>33.</td><td id='id33'>Change URL to https://boring-galileo-dc314c.netlify.app/login.</td>
       <td>URL changes to https://boring-galileo-dc314c.netlify.app/login, at login screen.</td></tr>
   <tr><td>34.</td><td>Enter email encore8@gmail.com, password 12345678, click Login.</td>
       <td>URL changes to https://boring-galileo-dc314c.netlify.app/movie/{movieId} where movie is the one on screen before clicking Login.
   The same movie details are shown, review input form reapperas, review posted by encore8 appears with delete button.</td></tr>
   <tr><td>35.</td><td>Delete the review.</td>
       <td>Review disappears.</td></tr>

   
   <tr><td colspan="3"> switch to browser of encore7</td></tr>
   
   <tr><th>No</th><th>Action</th><th>Expected results</th></tr>
   <tr><td>36.</td><td>Go to browser of encore7.</td>
       <td>The same movie shown on the screen, with review by encore8 still visible.</td></tr>
   <tr><td>37.</td><td>Click Logout.</td>
       <td>The same movie shown on the screen, review input form disappears, review by encore8 still visible.</td></tr>
   <tr><td>38.</td><td>Refresh page</td>
       <td>The same movie shown on the screen, review by encore8 disappears.</td></tr>
   </table>

