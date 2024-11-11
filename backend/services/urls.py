from services.views import PropertyViewSet
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'properties', PropertyViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
]