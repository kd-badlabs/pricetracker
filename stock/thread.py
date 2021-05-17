from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import pandas as pd
import yfinance as yf
import json
import threading
import time
import ctypes 
import datetime 



class CreateStockData(threading.Thread):
    
    def __init__(self , ticker,status=False):
        self.ticker = ticker 
        self.killed= False
        threading.Thread.__init__(self)
    
    # call for realtime update
    def stockData(self,ticker,period):
        stock = yf.Ticker(ticker)
        data = stock.history(period=period)
        return data
            
    def run(self):
        try:
            stock={"high":0, "low":0,"open":0,"close":0,"volume":0,"dividends":0}
            while True: 
                
                if self.killed: 
                    break
                else:
                    channel_layer = get_channel_layer()
                    data = self.stockData( self.ticker,"1m")
                    df = pd.DataFrame(data)
                    stock["high"]=df.iloc[0].High
                    stock["low"]=df.iloc[0].Low
                    stock["open"]=df.iloc[0].Open
                    stock["close"]=df.iloc[0].Close
                    stock["volume"]=df.iloc[0].Volume
                    stock["dividends"]=df.iloc[0].Dividends 
                    async_to_sync(channel_layer.group_send)(
                        'stock_consumer_group' , {
                            'type' : 'real_time_data',
                            'value' : json.dumps(stock)
                        }           
                    )
                    time.sleep(1)
        finally :
            print('ended')
    
    
    def get_id(self): 
        # returns id of the respective thread 
        if hasattr(self, '_thread_id'): 
            return self._thread_id 
        for id, thread in threading._active.items(): 
            if thread is self: 
                return id
    
    def raise_exception(self): 
        thread_id = self.get_id() 
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 
              ctypes.py_object(SystemExit)) 
        if res > 1: 
            ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 0) 
            print('Exception raise failure') 
    
    def kill(self): 
        self.killed = True