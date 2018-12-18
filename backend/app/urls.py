from django.urls import path
from .views import *
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
# router.register(r'user', UserViewSet)
router.register(r'games', GameViewSet)
router.register(r'play', PlayViewSet)
# router.register(r'user', UserViewSet)
# router.register(r'accounts', AccountViewSet)
urlpatterns = router.urls + [
    # path('', root),
]