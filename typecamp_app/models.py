from django.db import models
from django.conf import settings

def keys_default():
    return {'q':1, 'w':2}

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quote = models.CharField(max_length=200, null=True)
    keys = models.JSONField('keys', default=keys_default)

    def __str__(self):
        return 'Profile for user {}'.format(self.user.username)

# Create your models here.
