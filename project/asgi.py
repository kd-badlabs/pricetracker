
# import os
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.core.asgi import get_asgi_application
# from django.urls import path
# from stock.consumers import *

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")

 
# application = get_asgi_application()    


# ws_patterns =[ 
#     path('ws/new/',Stock_Async.as_asgi()) ,  
# ]


# application = ProtocolTypeRouter({
#     "websocket": URLRouter(ws_patterns),
# })


# import os
# import django
# from channels.routing import get_default_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.urls import path
# from stock.consumers import *


# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
# django.setup()
# application = get_default_application() 


# ws_patterns =[ 
#     path('ws/new/',Stock_Async.as_asgi()) ,  
# ]

# application = ProtocolTypeRouter({
#     "websocket": URLRouter(ws_patterns),
# })



import os

from django.conf.urls import url
from django.core.asgi import get_asgi_application
from django.urls import path
from stock.consumers import *

# Fetch Django ASGI application early to ensure AppRegistry is populated
# before importing consumers and AuthMiddlewareStack that may import ORM
# models.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django_asgi_app = get_asgi_application()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

application = ProtocolTypeRouter({
    # Django's ASGI application to handle traditional HTTP requests
    "http": django_asgi_app,

    # WebSocket chat handler
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/new/',Stock_Async.as_asgi())   
        ])
    ),
})

 

 