import sqlite3

NEW_DB_NAME = input("What should the filename of the database be? :")

# Connect to DB using name
con = sqlite3.connect(NEW_DB_NAME)
# Make a cursor
cur = con.cursor()

# Create the tables
cur.execute("""
CREATE TABLE bookinfo (
	barcode NUMERIC NOT NULL,
	moreinfo TEXT,
	CONSTRAINT bookinfo_pk PRIMARY KEY (barcode)
);
""")
cur.execute("""
CREATE TABLE books (
	barcode NUMERIC NOT NULL,
    ISBN NUMERIC,
    title TEXT,
    author TEXT,
	CONSTRAINT books_pk PRIMARY KEY (barcode)
);""")
cur.execute("""
CREATE TABLE loans (
	loanID INTEGER NOT NULL,
	barcode TEXT,
	loanTo TEXT,
	loanStart TEXT,
	loanEnd TEXT,
	CONSTRAINT loans_pk PRIMARY KEY (loanID)
);
""")
cur.execute("""
CREATE TABLE users (
	barcode NUMERIC NOT NULL,
	name INTEGER,
	CONSTRAINT users_pk PRIMARY KEY (barcode)
);
""")