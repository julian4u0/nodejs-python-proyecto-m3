from flask import Flask, render_template, request, redirect, url_for, session
import requests as req
import json

app = Flask(__name__)


@app.route('/all')
def all():
    response = req.post('http://localhost:3000/api/listall')
    # print()
    result = response.json()['res']['data']
    
    if 'userid' in session:
      #print("estas logueado " +  session["userid"])
      return render_template('all.html', houses=result, user= session["userid"])
    else:
      return render_template('all.html', houses=result)

      
    if session.get('userid') == True:
      print("estas logueado")
    if session.get('email') == True:
      print("estas logueado")
    
    return render_template('all.html', houses=result)


@app.route('/')
def home():
    #id = request.args.get('id')
    #response = req.get(f'http://localhost:3000/api/gettask?id={id}')
    #result = response.json()['task']
    return render_template('index.html')


@app.route('/register', methods=['GET'])
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')
@app.route('/logout')
def logout():
  session.pop('userid', None)
  return render_template('login.html')

@app.route('/myhouses')
def myhouses():
  ownerid = session["userid"]
  myhouses = {"ownerid": ownerid}
  response = req.post('http://localhost:3000/api/listmyhouses', json=myhouses)
    # print()
  result = response.json()['res']['data']
  # print(result)
  if 'userid' in session:
    #print("estas logueado " +  session["userid"])
    return render_template('myhouses.html', houses=result, user= session["userid"])
  else:
    return render_template('myhouses.html', houses=result)

@app.route('/newhouse', methods=['GET'])
def newhouse():
    return render_template('newhouse.html', user = session["userid"])

@app.route('/registeruser', methods=['POST'])
def registeruser():
  nombre = request.form['nombre']
  apellido = request.form['apellido']
  email = request.form['email']
  password = request.form['pass']

  adduser = {"nombre": nombre, "apellido": apellido, "email": email, "pass": password}

  response = req.post('http://localhost:3000/api/adduser', json=adduser)
    # bytes a dict
  cont = response.content
  cont = json.loads(cont.decode("utf-8"))
  cont = cont["res"]
    ##############
  print(cont["data"])
  session['userid'] = cont["data"]

  return redirect(url_for('all'))

@app.route('/addhouse', methods=['POST'])
def addhouse():
  title = request.form['title']
  typee = request.form['type']
  address = request.form['address']
  rooms = request.form['rooms']
  price = request.form['price']
  area = request.form['area']
  ownerid = request.form['ownerid']


  addhouse = {"title": title, "type": typee, "address": address, "rooms": rooms, "price": price, "area": area, "ownerid": ownerid}

  response = req.post('http://localhost:3000/api/addhouse', json=addhouse)
    # bytes a dict
  cont = response.content
  cont = json.loads(cont.decode("utf-8"))
  cont = cont["res"]
    ##############
  print(cont)

  return redirect(url_for('myhouses'))

@app.route('/loginuser', methods=['POST'])
def loginuser():
  email = request.form['email']
  password = request.form['pass']


  myuser = {"email": email, "pass": password}

  response = req.post('http://localhost:3000/api/finduser', json=myuser)
    # bytes a dict
  cont = response.content
  cont = json.loads(cont.decode("utf-8"))
  cont = cont["res"]
    ##############
  if cont["success"] == False:
    if cont["error"]["title"] == "not existing":
      return redirect(url_for('login', err = "notexisting"))
    else:
      return redirect(url_for('login', err = "incorrectpass"))
  else:
    print("Buena contraseña bien")
    print(cont["data"])
    session['email'] = email
    session['userid'] = cont["data"]
    return redirect(url_for('all'))


@app.route('/deletehouse')
def deletehouse():
    id = request.args.get('hid')
    deleteData = {"id": id}
    print(id)
    response = req.post('http://localhost:3000/api/deletetask', json=deleteData)
    return redirect(url_for('myhouses'))

@app.route('/edithouse')
def edithouse():
  id = request.args.get('hid')
  reqbody = {"houseid": id}
  
  response = req.post('http://localhost:3000/api/findone', json=reqbody)
  cont = response.content
  cont = json.loads(cont.decode("utf-8"))
  cont = cont["res"]["data"]

  # print("edithousedata")
  # print(cont)


  return render_template('edithouse.html', housedata = cont)


@app.route('/edit', methods=['POST'])
def edit():
  title = request.form['title']
  typee = request.form['type']
  address = request.form['address']
  rooms = request.form['rooms']
  price = request.form['price']
  area = request.form['area']
  ownerid = request.form['ownerid']
  houseid = request.form['houseid']

  editedhouse = {"title": title, "type": typee, "address": address, "rooms": rooms, "price": price, "area": area, "ownerid": ownerid, "houseid": houseid}

  response = req.post('http://localhost:3000/api/edithouse', json=editedhouse)

  
  cont = response.content
  cont = json.loads(cont.decode("utf-8"))
  cont = cont["res"]
    ##############
  if(cont["success"]):
    return redirect(url_for('myhouses'))
  else:
    return redirect(url_for('all'))



@app.route('/ver', methods=['GET'])
def ver():
  
  id = request.args.get('hid')
  reqbody = {"houseid": id}
  
  response = req.post('http://localhost:3000/api/findone', json=reqbody)
  cont = response.content
  cont = json.loads(cont.decode("utf-8"))
  cont = cont["res"]["data"]
  
  return render_template('ver.html', housedata = cont)

if __name__ == "__main__":
  app.secret_key = 'esto-es-una-clave-muy-secreta'
  app.run(debug=True)
