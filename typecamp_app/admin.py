from django.contrib import admin
from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'quote', 'keys']

admin.site.register(Profile, ProfileAdmin)
# Register your models here.
