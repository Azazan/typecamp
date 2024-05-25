from django.urls import path, re_path
from .views import *

urlpatterns = [
    re_path(r'^$', index, name='home'),
    re_path(r'^test', test, name='test'),
    re_path(r'^game', game, name='game'),
    re_path(r'^lessons', lessons, name='lessons')
]
