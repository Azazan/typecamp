from django.urls import path, re_path
from .views import *
from . import views
from django.contrib.auth.views import LogoutView, LoginView

urlpatterns = [
    re_path(r'^$', index, name='home'),
    re_path(r'^test', test, name='test'),
    re_path(r'^dict_load', dict_load, name='dict_load'),
    re_path(r'^game', game, name='game'),
    re_path(r'^custom', custom, name='custom'),
    re_path(r'^lessons', lessons, name='lessons'),
    re_path(r'^login/$', user_login, name='login'),
    re_path(r'^register/$', register, name='register'),
    re_path(r'^logout/$', LogoutView.as_view(), name='logout'),
    re_path(r'^profile/(?P<id>\d)/$', user_detail, name='user_detail')
]
