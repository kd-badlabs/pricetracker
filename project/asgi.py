
import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import path
from backend.consumers import *

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")

application = get_asgi_application()


ws_patterns =[
    path('ws/test/',Stock.as_asgi()) ,
    path('ws/test_1/',Stock_New.as_asgi())    
]
application = ProtocolTypeRouter({
    "websocket": URLRouter(ws_patterns),
})