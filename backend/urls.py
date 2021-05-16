from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('realtimeData/<ticker>/', views.realtimeData),
    path('historicalData/<data>/', views.historical_Data),
]
