from django.shortcuts import render
from django.db.models import Q
from .models import Company_symbol
from django.http import JsonResponse
import pandas as pd
import numpy as np

# Create your views here.
def uploadData(request):
    df = pd.read_csv("searchBar/nasdaq_screener.csv")
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
    return JsonResponse({'status' : 200,"results":records})



def search_result(request,data): 
    results = Company_symbol.objects.filter(symbol__startswith = data)
    print(results)
    return JsonResponse({'status' : 200,"results":results})
  
    
