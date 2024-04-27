import cv2

url = "http://192.168.137.216:8080/video"

cap = cv2.VideoCapture(url)


print(cap.isOpened())
while(cap.isOpened()):
    ret, frame = cap.read()
    print('success')
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()


