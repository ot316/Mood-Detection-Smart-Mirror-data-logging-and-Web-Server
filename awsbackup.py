#!/usr/bin/env python3

import logging
import boto3
from botocore.exceptions import ClientError


def upload_file(file_name, bucket, object_name):
    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

upload_file('webserver/emotion_data.csv', 'oli-thompson-siot','Mood_Recognition_Dataset.csv')
print("file uploaded  to AWS")
