from django.urls import path, re_path
from .views import *
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    re_path(r'^$', index, name='home'),
    re_path(r'^test', test, name='test'),
    re_path(r'^dict_load', dict_load, name='dict_load'),
    re_path(r'^stats_update', stats_update, name='stats_update'),
    re_path(r'^total_stats_update', total_stats_update, name='total_stats_update'),
    re_path(r'^game_stats_update', game_stats_update, name='game_stats_update'),
    re_path(r'^game', game, name='game'),
    re_path(r'^custom', custom, name='custom'),
    re_path(r'^lessons', lessons, name='lessons'),
    re_path(r'^login/$', user_login, name='login'),
    re_path(r'^register/$', register, name='register'),
    re_path(r'^edit_profile/(?P<id>\d+)/$', edit_profile, name='edit_profile'),
    re_path(r'^logout/$', auth_views.LogoutView.as_view(), name='logout'),
    re_path(r'^profile/(?P<id>\d+)/$', user_detail, name='user_detail'),
    re_path(r'^blog/user_posts/(?P<id>\d+)/$', user_posts, name='user_posts'),
    re_path(r'^total_stats/$', total_stats_detail, name='total_stats_detail'),
    re_path(r'^blog/$', blog_list, name='blog_list'),
    re_path(r'^blog/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/'\
        r'(?P<post>[-\w]+)/$',
        post_detail,
        name='post_detail'),
    re_path(r'^delete_comment/(?P<id>\d+)', delete_comment, name='delete_comment'),
    re_path(r'^blog/write', write_post, name='write_post'),
    re_path(r'^blog/drafts', drafts, name='drafts'),
    re_path(r'^blog/edit_post/(?P<id>\d+)', edit_post, name='edit_post'),
    re_path(r'^delete_post/(?P<id>\d+)', delete_post, name='delete_post'),
    re_path(r'^public_post/(?P<id>\d+)', public_post, name='public_post'),
    re_path(r'^draft_post/(?P<id>\d+)', draft_post, name='draft_post'),
]
