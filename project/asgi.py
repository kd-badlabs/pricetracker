
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


import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from stock.consumers import *
from channels.routing import get_default_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dropdjango.settings")
django.setup()
application = get_default_application() 


ws_patterns =[ 
    path('wss/new/',Stock_Async.as_asgi()) ,  
]

application = ProtocolTypeRouter({
    "websocket": URLRouter(ws_patterns),
})

 

 