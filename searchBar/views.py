from django.shortcuts import render
from django.db.models import Q
from .models import Company_symbol
from django.http import JsonResponse
from django.conf import settings
import pandas as pd
import numpy as np
import os

# Create your views here.
def uploadData(request):
    url ="https://raw.githubusercontent.com/kd-badlabs/pricetracker/main/searchBar/nasdaq_screener.csv"
    df = pd.read_csv(url)
    df.fillna("NA",inplace=True)
    records = df.to_dict('records')
    for record in records: 
        db = Company_symbol(
            symbol=record["Symbol"],
            name=record["Name"],
            industry=record["Industry"],
            country=record["Country"]
            )
        db.save()
    return JsonResponse({'status': 200})


def search_result(request,data): 
    results=Company_symbol.objects.filter(Q(symbol__startswith=data)| Q(name__startswith = data)).values_list()
    return JsonResponse({'status' : 200,"results":list(results)})
  
    
    