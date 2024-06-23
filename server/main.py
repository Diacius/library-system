from flask import Flask, request, Response
import sqlite3

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/bookinfo', methods=['GET'])
def bookinfo():
    con = sqlite3.connect("demodb.sqlite")
    cur = con.cursor()
    error = None
    request.form['barcode']
    con = sqlite3.connect("demodb.sqlite")
    cur = con.cursor()
