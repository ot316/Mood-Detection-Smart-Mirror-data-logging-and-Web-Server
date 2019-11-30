import os
import cv2
import datetime
import numpy as np
import pandas as pd
from keras.models import model_from_json
from keras.preprocessing import image

#load model
model = model_from_json(open("model.json", "r").read())

#load weights
model.load_weights('model_weights.h5')

#initialise face detection
face_haar_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

cap=cv2.VideoCapture(0)
count = 0
width = 48
height = 48

try: 
    df = pd.read_csv("emotion_data.csv")
    print("emotion_data loaded")
    
except: 
    df = pd.DataFrame(columns = ["DateTime", "Emotion"])
    df.to_csv("emotion_data.csv")
    df = pd.read_csv("emotion_data.csv")
    print("File emotion_data.csv not found, it has been created.")

while True:
    ret,test_img=cap.read()  # captures frame and returns boolean value and captured image
    if not ret:
        continue
    gray_img= cv2.cvtColor(test_img, cv2.COLOR_BGR2GRAY)
    
    
    #use haar cascades to ientify faces
    faces_detected = face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)

    #convert detected face into correct format for the CNN
    for (x,y,w,h) in faces_detected:
        cv2.rectangle(test_img,(x,y),(x+w,y+h),(255,0,255),thickness=1)
        face=gray_img[y:y+w,x:x+h] #cropping region of interest 
        face=cv2.resize(face,(width,height)) #resize to 48 * 48
        img_pixels = image.img_to_array(face) #create pixel array
        img_pixels = np.expand_dims(img_pixels, axis = 0) 
        img_pixels /= 255 # scale pixel values
        
        #fee image data into CNN
        predictions = model.predict(img_pixels)

        #find max indexed array
        max_index = np.argmax(predictions[0])

        #classifications
        emotions = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')
        
        if max_index != 2: #and max_index != 6: #ignore biased emotions
            predicted_emotion = emotions[max_index]
            if predicted_emotion:
                data = {"DateTime": datetime.datetime.now(), "Emotion": predicted_emotion}
                df = df.append(data, ignore_index=True)
                test_img = cv2.flip(test_img, 1)
                print(predicted_emotion)
                cv2.putText(test_img, predicted_emotion, (int(x), int(y-10)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,0), 2)
                count+=1
                
        if count == 50:
            df.to_csv("emotion_data")
            print("csv file saved")
            count = 0
    
   
    
    resized_img = cv2.resize(test_img, (1000, 700))
    #cv2.imshow('Facial emotion analysis ',resized_img)

    if cv2.waitKey(10) == ord('q'): #wait until 'q' key is pressed
        break

cap.release()
cv2.destroyAllWindows