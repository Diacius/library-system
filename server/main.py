from flask import Flask, request, Response, flash, session
from flask_cors import CORS
import sqlite3, json, datetime
from flask import current_app, g
app = Flask(__name__)
import random
CORS(app)
app.config["DATABASE"] = "demodb.sqlite"

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

@app.route("/")
def hello_world():
    return Response(b"Hello, World!", status=200)

@app.route('/bookinfo')
def bookinfo():
    con = sqlite3.connect("demodb.sqlite")
    cur = con.cursor()
    query = cur.execute("SELECT * FROM books WHERE barcode =" + request.args.get("barcode"))
    book = query.fetchone()
    if book:
        con.close()
        return Response(json.dumps(book), status=200)
    else:
        return Response(b'["0000000000"]', status=400)
@app.route('/bookmoreinfo')
def bookmoreinfo():
    con = sqlite3.connect("demodb.sqlite")
    cur = con.cursor()
    query = cur.execute("SELECT * FROM bookinfo WHERE barcode =" + request.args.get("barcode"))
    book = query.fetchone()
    con.close()
    return Response(json.dumps(book), status=200)
@app.route('/borrow', methods=["POST"])
def borrow():
    loanTo = request.form['loanTo']
    loanLength = request.form['loanLength']
    barcode = request.form['bookBarcode']
    error = None
    # create delta based on loanLength as number of days
    currentTimestamp = datetime.datetime.now()
    loanDelta = datetime.timedelta(days=int(loanLength))
    loanStart = currentTimestamp.replace(microsecond=0).isoformat()
    loanEnd = (currentTimestamp + loanDelta).replace(microsecond=0).isoformat()
    loanID = random.random()
    db = get_db()
    if not loanTo:
        error = "Person being loaned to is required, please supply a loaner barcode"
    if error is None:
        try:
            print(loanID, barcode, loanTo, loanStart, loanEnd)
            db.execute(
                "INSERT INTO loans (loanID, barcode, loanTo, loanStart, loanEnd) VALUES (?,?,?,?,?)",
                (str(barcode), str(barcode), str(loanTo), str(loanStart), str(loanEnd)))
            db.commit()
            db.close()
        except db.IntegrityError:
            error = "Book already on loan"
            return error
        else:
            db.close()
            return json.dumps({'msg':'succesfully loaned', "loanEnd": loanEnd})
        
    print(error)

@app.route('/getusername', methods=["POST"])
def getuser():
    user = str(request.form['user'])
    print(user)
    error = None
    db = get_db()
    if not user:
        error = "User being lookedup is required, please supply a loaner barcode"
    if error is None:
        a = db.execute("SELECT * FROM users WHERE barcode = ?", (user,))
        row = a.fetchone()
        if row:
            print(row.keys())
            return Response(row["name"], status=200)
        else:
            return Response("user not found", status=400)
    print(error)
    db.close()

@app.route('/returnBook', methods=["GET"])
def returnBook():
    barcode = request.args.get("barcode")
    error = None
    db = get_db()
    if not barcode:
        error = "Person being loaned to is required, please supply a loaner barcode"
    if error is None:
        try:
            b = db.execute("SELECT * FROM loans WHERE barcode = ?", barcode)
            item = b.fetchone()
            print(item)
            if item:
                a = db.execute(
                    "DELETE FROM loans WHERE barcode = ?",
                    barcode)
                db.commit()
        except db.IntegrityError:
            error = "Book already returned"
            return error
        else:
            return json.dumps({'msg':'succesfully returned'})
        
@app.route('/addUser', methods=['POST'])
def addUser():
    usersname = str(request.form['username'])
    error = None
    db = get_db()
    if not usersname:
        error = "The users name is requirement"
    if error is None:
        # Generate an ID for the user
        requestedID = request.form["requestedID"]
        if requestedID:
            # A custom ID was provided
            a = db.execute("INSERT INTO users (barcode, name) VALUES (?,?)", (requestedID, usersname))
            db.commit()
            responseInfo = {"finalID": requestedID, "username": usersname}
            return Response(json.dumps(responseInfo), status=200)
        # 4 digit pseudorandom number
        generatedID = (random.random() * 1000) // 1
        a = db.execute("INSERT INTO users (barcode, name) VALUES (?,?)", (generatedID, usersname))
        db.commit()
        responseInfo = {"finalID": generatedID, "username": usersname}
        return Response(json.dumps(responseInfo), status=200)
@app.route('/addBook', methods=["POST"])
def addBook():
    ISBN = request.form["isbn"]
    title = request.form["title"]
    author = request.form["author"]
    moreinfo = request.form["moreinfo"]
    error = None
    if not ISBN or not title or not author:
        error = "Required value missing, provide ISBN, title and author"
    if error is None:
        barcode = int(random.random() * 1000000 // 1)
        dbob = get_db()
        # Write into DB
        a = dbob.execute("INSERT INTO books (barcode, ISBN, title, author) VALUES (?,?,?,?)", (barcode, ISBN, title, author))
        if moreinfo:
            b = dbob.execute("INSERT INTO bookinfo (barcode, moreinfo) VALUES (?,?)", (barcode,moreinfo))
        dbob.commit()
        responseInfo = {"finalID": barcode}
        return Response(json.dumps(responseInfo), status=200)