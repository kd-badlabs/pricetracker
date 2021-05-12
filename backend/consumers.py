from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
import pandas as pd
import yfinance as yf
import json



stock={"high":0, "low":0,"open":0,"close":0,"volume":0,"dividends":0}

# callfor realtime update
def stockData(tic,per):
    stock = yf.Ticker(tic)
    return stock.history(period=per)

# call for Histrorical data
def stockData_period(ticker,period,interval):
    data = yf.download(tickers=ticker, period=period, interval=interval)
    df = pd.DataFrame(data)
    print (df.head())
    return df

class Stock(WebsocketConsumer):
    def connect(self): 
        self.room_name = "test_consumer"
        self.room_group_name = "test_consumer_group"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
       
        self.accept()
        self.send(text_data=json.dumps({'status' : "Connected"}))
       
        
    
    def receive(self, text_data):
        data =json.loads(text_data)
        ticker= data["text"]
        print(ticker)
        # while True:
        data = stockData(ticker,"1m")
        df = pd.DataFrame(data)
        if stock["high"]!=df.iloc[0].High or stock["low"]!=df.iloc[0].Low or stock["open"]!=df.iloc[0].Open or stock["close"]!=df.iloc[0].Close:
            stock["high"]=df.iloc[0].High
            stock["low"]=df.iloc[0].Low
            stock["open"]=df.iloc[0].Open
            stock["close"]=df.iloc[0].Close
            stock["volume"]=df.iloc[0].Volume
            stock["dividends"]=df.iloc[0].Dividends
            self.send(text_data=json.dumps({'price' : stock}))
                
                
    
    def disconnect(self , *args, **kwargs): 
        print('disconnected')


# callfor realtime update
def stockData(tic,per):
    stock = yf.Ticker(tic)
    return stock.history(period=per)

# call for Histrorical data
def stockData_period(ticker,period,interval):
    data = yf.download(tickers=ticker, period=period, interval=interval)
    df = pd.DataFrame(data)
    print (df.head())
    return df

class Stock_New(AsyncWebsocketConsumer):
    
    async def connect(self): 
        self.room_name = "test_consumer"
        self.room_group_name = "test_consumer_group"
       
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
       
        await self.accept()
        await self.send(text_data=json.dumps({'status' : "Connected"}))
       
        
    
    async def receive(self, text_data):
        data =json.loads(text_data)
        ticker= data["text"]
        print(ticker)
        while True:
            data = stockData(ticker,"1m")
            df = pd.DataFrame(data)
            if stock["high"]!=df.iloc[0].High or stock["low"]!=df.iloc[0].Low or stock["open"]!=df.iloc[0].Open or stock["close"]!=df.iloc[0].Close:
                print(df.head)
                stock["high"]=df.iloc[0].High
                stock["low"]=df.iloc[0].Low
                stock["open"]=df.iloc[0].Open
                stock["close"]=df.iloc[0].Close
                stock["volume"]=df.iloc[0].Volume
                stock["dividends"]=df.iloc[0].Dividends
                self.send(text_data=json.dumps({'price' : stock}))
                
                
    
    async def disconnect(self , *args, **kwargs): 
        print('disconnected')      