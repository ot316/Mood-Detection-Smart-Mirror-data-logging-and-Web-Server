import sys, os
import pandas as pd
import numpy as np
import threading
from sklearn.model_selection import train_test_split
from keras.utils import np_utils
import matplotlib.pyplot as plt

#read trianing data
df=pd.read_csv('Training_Dataset.csv')

y = df['emotion']
X1,X2=[],[]

split_point = int(df.shape[0])/2
first = df.loc[0:split_point]
second = df.loc[split_point:]

def firsthalf(df, X):
    for index, row in df.iterrows():
        val=row['pixels'].split(" ")
        X.append(np.array(val,'float32'))
        
def secondhalf(df, X):
    for index, row in df.iterrows():
        val=row['pixels'].split(" ")
        X.append(np.array(val,'float32'))
    

thread1 = threading.Thread(target=firsthalf, args=(first, X1))
thread2 = threading.Thread(target=secondhalf, args=(second, X2))
thread1.start()
thread2.start()
thread1.join()
thread2.join()

#combine both halves into 
X = X1 + X2

num_labels = 7
width, height = 48, 48

#show first i pictures
i = 2
for data in range(i):
    plt.figure(data)
    plt.imshow(X[data].reshape((width, height)), interpolation='none', cmap='gray')
plt.show()

#splitting into training, validation and testing data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)
X_train, X_valid, y_train, y_valid = train_test_split(X_train, y_train, test_size=0.1, random_state=41)

#categorise data
y_train=np_utils.to_categorical(y_train, num_classes=num_labels)
y_test=np_utils.to_categorical(y_test, num_classes=num_labels)

#normalizing data between oand 1
X_train -= np.mean(X_train, axis=0)
X_train /= np.std(X_train, axis=0)

X_test -= np.mean(X_test, axis=0)
X_test /= np.std(X_test, axis=0)

#reshape data
X_train = X_train.reshape(X_train.shape[0], width, height, 1)
X_test = X_test.reshape(X_test.shape[0], width, height, 1)

#saving the test samples to be used later
np.save('X_train', X_train)
np.save('X_test', X_test)
np.save('y_train', y_train)
np.save('y_test', y_test)