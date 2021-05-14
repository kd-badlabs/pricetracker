from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import async_to_sync
import json


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
        data = stockData(ticker,"1m")
        df = pd.DataFrame(data)
        stock["high"]=df.iloc[0].High
        stock["low"]=df.iloc[0].Low
        stock["open"]=df.iloc[0].Open
        stock["close"]=df.iloc[0].Close
        stock["volume"]=df.iloc[0].Volume
        stock["dividends"]=df.iloc[0].Dividends
        self.send(text_data=json.dumps({'price' : stock}))    
        
      
    def disconnect(self , *args, **kwargs): 
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        
      
class Stock_Async(AsyncJsonWebsocketConsumer):
    
    async def connect(self): 
        self.room_name = "stock_consumer"
        self.room_group_name = "stock_consumer_group"
        await (self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        await self.send(text_data=json.dumps({'status' : "Connected"}))
       
    
    async def receive(self, text_data):
        print(text_data)
        await self.send(text_data=json.dumps({'status' : "Data On"}))
             
    async def disconnect(self , *args, **kwargs): 
        print("disconnected")     
    
    async  def send_data(self , event):
        data = json.loads(event.get('value'))
        await self.send(text_data=json.dumps({'price' : data}))
     

       
   

 