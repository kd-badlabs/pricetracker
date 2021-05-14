from django.shortcuts import render
from channels.layers import  get_channel_layer
from asgiref.sync import async_to_sync
import pandas as pd
import yfinance as yf
import json
import time

interruptions = False

# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')

# call for realtime update
def stockData(tic,per):
    stock = yf.Ticker(tic)
    return stock.history(period=per)

# call for Historical data
def stockData_period(ticker,period,interval):
    data = yf.download(tickers=ticker, period=period, interval=interval)
    df = pd.DataFrame(data)
    print (df.head())
    return df





def tickerStatus(request,tickerStatus):
    interruptions = tickerStatus 
    print(interruptions)
    return render(request, 'frontend/index.html')


async def ticker(request,ticker): 
    interruptions=False
    stock={"high":0, "low":0,"open":0,"close":0,"volume":0,"dividends":0}
    while True:
        if interruptions:
            print(interruptions)
            break
        else:
            channel_layer = get_channel_layer()
            data = stockData(ticker,"1m")
            df = pd.DataFrame(data)
            stock["high"]=df.iloc[0].High
            stock["low"]=df.iloc[0].Low
            stock["open"]=df.iloc[0].Open
            stock["close"]=df.iloc[0].Close
            stock["volume"]=df.iloc[0].Volume
            stock["dividends"]=df.iloc[0].Dividends  
            await (channel_layer.group_send)(
                'stock_consumer_group' , {
                    'type' : 'send_data',
                    'value' : json.dumps(stock)
                }           
            )
            print(stock)
    return render(request, 'frontend/index.html')



      


