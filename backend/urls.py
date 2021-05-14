from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('ticker/<ticker>/', views.ticker),
    path('tickerStatus/<tickerStatus>/', views.tickerStatus)
]
