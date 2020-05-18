# -*- coding: utf-8 -*-

from flask import Flask, request, render_template

app = Flask(__name__)


def params(uri):
    script = '\n<script src="static/js/jquery-3.5.1.min.js"></script>\n'
    return {
        '/': {
            'title': '',
            'data': None,
            'script': ''
        },
        '/home': {
            'title': '',
            'data': None,
            'script': ''
        },
        '/messages': {
            'title': 'Mensajes - ',
            'data': [x for x in open("./data/messages.dat", "r").read().split('\n') if x.strip()],
            'script': script + '<script src="static/js/messages.js"></script>'
        },
        '/signup': {
            'title': 'Registro - ',
            'data': None,
            'script': script + '<script src="static/js/signup.js"></script>'
        },
        '/login': {
            'title': 'Acceso - ',
            'data': None,
            'script': script + '<script src="static/js/login.js"></script>'
        }
    }[uri]


@app.route('/', methods=['GET'])
@app.route('/home', methods=['GET'])
@app.route('/messages', methods=['GET'])
@app.route('/signup', methods=['GET'])
@app.route('/login', methods=['GET'])
def serve():
    uri = str(request.url_rule)

    if uri == '/':
        uri = '/home'

    p = params(uri)

    return render_template('main.html', title=p['title'], file=uri[1:], data=p['data'], scripts=p['script'])


def processForm(title, fields):
    missing = []
    data = [f"<h1>Data from Form: {title}</h1>"]
    for field in fields:
        value = request.form.get(field, None)
        if value is None:
            missing.append(field)
        data.append(f"<p>{field}: {value}</p>")
    if missing:
        data = ['<h1>Warning</h1>', '<p>Some fields are missing</p>']

    return render_template('modal.html', content=data)


@app.route('/processLogin', methods=['POST'])
def processLogin():
    return processForm('Login', ['email', 'passwd'])


@app.route('/processSignup', methods=['POST'])
def processSignup():
    return processForm('Sign Up', ['nickname', 'email', 'passwd'])


@app.route('/processMessage', methods=['POST'])
def processMessages():
    missing = []
    field = 'msg'
    value = request.form.get(field, None)
    if value is None:
        missing.append(field)
    if missing:
        return render_template('modal.html', content=['<h1>Warning</h1>', '<p>Some fields are missing</p>'])
    with open('./data/messages.dat', 'a') as messages:
        messages.write(f"{value}\n")
        messages.close()

    return 'success'


# app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True, port=8001)
