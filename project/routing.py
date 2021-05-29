from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from stock.consumers import *
from django.urls import path

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/new/',Stock_Async.as_asgi())   
        ])
    ),
})