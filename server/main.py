from flask import Flask, request, Response
from flask_cors import CORS
import sqlite3, json

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