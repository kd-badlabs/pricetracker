from django.urls import path
from .views import search_result,uploadData

urlpatterns = [
    path('searchresult/<data>/',search_result),
    path('uploadData/',uploadData),  
    path('uploadData_1/',uploadData_1),  
]