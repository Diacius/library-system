# Backend code

This folder contains the code required to run a backend server.

It's a flask application, and it can be run using the default flask server, or another WSGI server.

The app utilises a SQLite database to store data, you can use the existing `demodb` for testing, or create a blank DB using `createdb.py`

The schema for the DB is:
```
CREATE TABLE bookinfo (
	barcode NUMERIC NOT NULL,
	moreinfo TEXT,
	CONSTRAINT bookinfo_pk PRIMARY KEY (barcode)
);
CREATE TABLE books (
	barcode NUMERIC NOT NULL,
    ISBN NUMERIC,
    title TEXT,
    author TEXT,
	CONSTRAINT books_pk PRIMARY KEY (barcode)
);
CREATE TABLE loans (
	loanID INTEGER NOT NULL,
	barcode TEXT,
	loanTo TEXT,
	loanStart TEXT,
	loanEnd TEXT,
	CONSTRAINT loans_pk PRIMARY KEY (loanID)
);
CREATE TABLE users (
	barcode NUMERIC NOT NULL,
	name INTEGER,
	CONSTRAINT users_pk PRIMARY KEY (barcode)
);
```

bookinfo contains more info about books, `barcode` is the book's barcode and `moreinfo` is text.
books defines the book's barcode in `barcode` its `ISBN`, `title`, and `author`
loans uses a `loanID`, a unique key generated at random, the books barcode `barcode`, the loaner's barcode `loanTo` and dates for the loan in `loanStart` and `loanEnd`
users defines a user using the user's barcode: `barcode`, and their name in `name`