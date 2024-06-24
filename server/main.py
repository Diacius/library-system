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
    return "<p>Hello, World!</p>"

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
    loanEnd = (currentTimestamp + loanDelta).replace(microsecond=0).isoformat(
    loanID = ran
    db = get_db()
    if not loanTo:
        error = "Person being loaned to is required, please supply a loaner barcode"
    if error is None:
        try:
            db.execute(
                "INSERT INTO loans (loanID, barcode, onLoanTo, loanedOn, dueOn) VALUES (?,?,?,?)",
                (loanID, barcode, loanTo, loanStart, loanEnd)
            )
            db.commit()
        except db.IntegrityError:
            error = "Book already on loan"
            return error
        else:
            return b"{'msg':'succesfully loaned"+ barcode+ "to" + loanTo+"', dueOn:'"+ loanEnd+"'}"
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