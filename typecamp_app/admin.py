from django.contrib import admin
from .models import Profile, SiteStatistics, Post, History




class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'quote', 'keys', 'total_stat']

admin.site.register(Profile, ProfileAdmin)

class SiteStatsAdmin(admin.ModelAdmin):
    list_display = ['total_mistakes', 'total_time', 'total_tests', 'total_words', 'total_keys']

admin.site.register(SiteStatistics, SiteStatsAdmin)

admin.site.register(Post)

admin.site.register(History)
# Register your models here.
