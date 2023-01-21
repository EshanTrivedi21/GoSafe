import os
import time
import numpy as np
import tensorflow as tf
from keras.optimizers import Adam
import numpy as np
import cv2
from keras.layers import Dropout

import pymongo


from keras.callbacks import ReduceLROnPlateau

from keras.layers import Dense

from keras.models import Sequential






resnet50_imagnet_model = tf.keras.applications.resnet50.ResNet50(weights="imagenet",include_top=False,input_shape=(256, 256, 3),pooling='max')
model = Sequential()
model.add(resnet50_imagnet_model)
model.add(Dropout(0.20))
model.add(Dense(2048, activation='relu'))
model.add(Dense(1024, activation='relu'))
model.add(Dense(512, activation='relu'))
model.add(Dense(2, activation='sigmoid'))

epochs = 50
batch_size = 128
red_lr = ReduceLROnPlateau(
    monitor='val_acc', factor=0.1, min_delta=0.0001, patience=2, verbose=1)
# setting the VGG model to be trainable.
resnet50_imagnet_model.trainable = True
model.compile(optimizer= Adam(learning_rate=1e-5), loss='binary_crossentropy', metrics=['accuracy'])
model.summary()
checkpoint_path = "binary"
model.load_weights(checkpoint_path)


def call(_id,truth_val):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["hackanova"]
    mycol = mydb["potholes"]


    
    myquery = { "_id": _id }
    newvalues = { "$set": { "Verified": truth_val } }
    mycol.update_one(myquery, newvalues)


def mera_model(a):
    temp = cv2.imread(f"{a}", cv2.IMREAD_COLOR)
    temp = cv2.resize(temp, (256, 256)) 
    temp = np.array(temp)
    temp = np.expand_dims(temp, axis=0)
    pred = np.round(model.predict(temp))
    if pred[0][0] == 1:
        return False
    else:
        return True
path = './public/usercontent/potholes'
os.chdir(path)
k = os.listdir()
while (True):
    time.sleep(1)
    if k != os.listdir():
        l = os.listdir()
        for a in k:
            l.remove(a)
        k = os.listdir()
        for a in l:
            output=mera_model(a)
            a=a[0:-4]
            call(a,output)