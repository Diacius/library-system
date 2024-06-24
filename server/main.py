from flask import Flask, request, Response, flash, session
from flask_cors import CORS
import sqlite3, json
from flask import current_app, g


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
app = Flask(__name__)
CORS(app)
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/bookinfo')
def bookinfo():
    con = sqlite3.connect("demodb.sqlite")
    cur = con.cursor()
    query = cur.execute("SELECT * FROM books WHERE barcode =" + request.args.get("barcode"))
    book = query.fetchone()
    con.close()
    return Response(json.dumps(book), status=200)
@app.route('/bookmoreinfo')
def bookmoreinfo():
    con = sqlite3.connect("demodb.sqlite")
    cur = con.cursor()
    query = cur.execute("SELECT * FROM bookinfo WHERE barcode =" + request.args.get("barcode"))
    book = query.fetchone()
    con.close()
    return Response(json.dumps(book), status=200)
@app.route('/borrow')
def borrow():
    loanTo = request.form['loanTo']
    loanLength = request.form['loanLength']
    barcode = request.form['bookBarcode']
    db = get_db
    if not loanTo:
        error = "Person being loaned to is required, please supply a loaner barcode"
    if error is None:
        try:
            db.execute(
                "INSERT INTO loans (barcode, onLoanTo, loanedOn, dueOn) VALUES (?,?,?,?)",
                (barcode, loanTo, currentTimestamp, currentTimestamp + loanLength)
            )
        except db.IntegrityError:
            error = "Book already on loan"
        else:
            return f"succesfully loaned {barcode} to {loanTo}"
    flash(error)