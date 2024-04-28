from urllib import response
from flask import Flask, request
from flask import jsonify
 
import json
 
from flask_cors import CORS, cross_origin
 
app = Flask(__name__)
cors = CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024
app.config['CORS_HEADERS'] = 'Content-Type'
 
 
@app.route('/main', methods=['POST'])

def handle_post():
    data = request.data
    
    response = {
        "success": True,
        "message": "Data received",
        "data": "data"
    }

    # 使用 jsonify 将字典转换为 JSON 格式并返回
    d = jsonify(response, status=200, mimetype='application/json')
    return str(data)[2:-1]
 
if __name__ == '__main__':
    app.run(port=5001)