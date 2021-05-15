from django.shortcuts import render
from channels.layers import  get_channel_layer
from asgiref.sync import async_to_sync
from django.http import JsonResponse
from .thread import CreateStockData



# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')


def tickerStatus(request,tickerStatus):
    getData = CreateStockData(tickerStatus)
    getData.raise_exception()
    getData.start()
    return JsonResponse({'status' : 200})


tic=""
getData=None
def ticker(request,ticker):
    global tic
    global getData
    if tic=="":
        tic= ticker
        getData = CreateStockData(tic)
        getData.start()     
    elif tic != "" and tic != ticker:
        tic=ticker
        getData.raise_exception()
        getData.kill()
        getData.join()
        getData = CreateStockData(tic)
        getData.start()
          
    return JsonResponse({'status' : 200})








        
    

      


