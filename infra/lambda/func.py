import json
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('cloud-resume-table-visitors')

def lambda_handler(event, context):
    response = table.get_item(Key={
            'id':'1'
        })

    visits = response['Item']['visits'] 
    visits += 1

    print(visits)
    response = table.put_item(Item={
            'id':'1',
            'visits': visits
        })


    return visits