from django.db import models
from django.conf import settings


def keys_default():
    return {'keyq':0, 'keyw':0, 'keye':0, 'keyr':0, 'keyt':0, 'keyy':0, 'keyu':0, 'keyi':0, 'keyo':0, 'keyp':0, 'bracketleft':0, 'bracketright':0, 'keya':0, 'keys':0, 'keyd':0, 'keyf':0, 'keyg':0, 'keyh':0, 'keyj':0, 'keyk':0, 'keyl':0, 'semicolon':0, 'quote':0, 'keyz':0, 'keyx':0, 'keyc':0, 'keyv':0, 'keyb':0, 'keyn':0, 'keym':0, 'comma':0, 'period':0, 'slash':0}


    

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    quote = models.CharField(max_length=200, null=True)
    keys = models.JSONField('keys', default=keys_default)
    def __str__(self):
        return 'Profile for user {}'.format(self.user.username)

    
    

# Create your models here.
