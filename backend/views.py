from django.shortcuts import render
from channels.layers import  get_channel_layer
from asgiref.sync import async_to_sync
from django.http import JsonResponse
from .thread import CreateStockData

import pandas as pd
import yfinance as yf
import json

# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')



  
def stockData_period(ticker,period,interval):
    data = yf.download(tickers=ticker, period=period, interval=interval)
    stock_price={"price":[],"volume":""}
    stock_data=[]
    stock_volume=[]
    df = pd.DataFrame(data)
    df = df.drop(['Adj Close'], axis = 1)
    df =df.reset_index()
    df["Datetime"] = df["Datetime"].astype(int)
    data_list =df.to_dict('records')
    return data_list

# Request for Historical data
def historical_Data(request,data):
    ticker=(data.split("_"))[0]
    period=(data.split("_"))[1]
    interval=(data.split("_"))[2]
    df = stockData_period(ticker,period,interval)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
                    'stock_consumer_group' , {
                        'type' : 'historical_data',
                        'value' : json.dumps(df)
                    }           
                )
    return JsonResponse({'status' : 200})



# Request for Real time data  
tic=""
getData=None
def realtimeData(request,ticker):
    global tic
    global getData
    if tic=="":
        tic= ticker
        getData = CreateStockData(tic)
        getData.start()     
    elif tic != "" and tic != ticker:

        getData.raise_exception()
        getData.kill()
        getData.join()
        
        tic=ticker
        getData = CreateStockData(tic)
        getData.start()
        
    elif ticker=="STOP":
        getData.raise_exception()
        getData.kill()
        getData.join()
        
          
    return JsonResponse({'status' : 200})








        
    

      


