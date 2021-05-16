from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import async_to_sync
import json
     
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
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )  
    
    async  def real_time_data(self , event):
        data = json.loads(event.get('value'))
        await self.send(text_data=json.dumps({'price' : data , "status":"RealTimeData"}))
    
    async  def historical_data(self , event):
        data = json.loads(event.get('value'))
        await self.send(text_data=json.dumps({'price' : data, "status":"HistoricalData"}))
     

       
   

 