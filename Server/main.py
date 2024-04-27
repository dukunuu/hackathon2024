
from time import sleep
import tornado.ioloop
import tornado.web
import tornado.websocket
import threading
import math
import base64
import numpy as np
import cv2

currentFrame = None

class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print("connect")
        while(True):
            if(currentFrame is not None):  
                cv2.imwrite("frame.jpg", currentFrame)
                _, buffer = cv2.imencode('.jpg', currentFrame)
                base64_str = base64.b64encode(buffer)
                base64_str = str(base64_str, 'utf-8')
                self.write_message(base64_str)
            sleep(0.16)

    def on_message(self, message):
        pass

    def on_close(self):
        cv2.destroyAllWindows()
        print("dis connect")

    
def make_app():
    return tornado.web.Application([
        (r"/websocket", WebSocketHandler),
    ], websocket_ping_interval=30, websocket_ping_timeout=120)

url = "http://192.168.0.129:8080/video"


cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 300)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 300)

# width = 400
# height = 300



def Server():
    app = make_app()
    app.listen(8000)
    print("start")
    tornado.ioloop.IOLoop.current().start()

thread = threading.Thread(target=Server)
thread.start()

while(cap.isOpened()):
    ret, frame = cap.read()
    cv2.imshow('frame',frame)
    currentFrame = frame
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


cap.release()
cv2.destroyAllWindows()
