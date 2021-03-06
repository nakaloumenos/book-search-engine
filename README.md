# Book Search Engine

An application that searches for books using the [Google Books API](https://developers.google.com/books/docs/overview).

You can find a deployed version of the app on [Heroku](https://secret-sea-45295.herokuapp.com) or running it locally following the instructions.

### About

This is an `Node.js` application using `Express.js` framework, that utilizes the `Google Books API` to retrieve the following information about books:

* Title
* Main author
* Publishing company
* Cover
* A link to an external page for more information

The app sends the request to Google's API, with user's input as parameters, using `axios`.
After getting a response, books that are missing any of the desired information are filtered.

The view part of the app is developed using `Handlebars.js` and `Bootstrap`.

### Running the app

Once inside the app's directory:

1. Install dependencies

```
npm install
```

2. Run the tests (Optional)

```
npm test
```

3. Start the server

```
node src/app.js
```

At this point in your terminal you should the following message:

```
Server listening at: 5000!
```

Now navigate to [http://localhost:5000/](http://localhost:5000/) in your favourite web browser. Happy searching!