from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import User
from autoslug import AutoSlugField
from django.urls import reverse

def keys_default():
    return {'keyq':0, 'keyw':0, 'keye':0, 'keyr':0, 'keyt':0, 'keyy':0, 'keyu':0, 'keyi':0, 'keyo':0, 'keyp':0, 'bracketleft':0, 'bracketright':0, 'keya':0, 'keys':0, 'keyd':0, 'keyf':0, 'keyg':0, 'keyh':0, 'keyj':0, 'keyk':0, 'keyl':0, 'semicolon':0, 'quote':0, 'keyz':0, 'keyx':0, 'keyc':0, 'keyv':0, 'keyb':0, 'keyn':0, 'keym':0, 'comma':0, 'period':0, 'slash':0}

def total_stat_default():
    return {'total_accuracy':0, 'total_wpm':0, 'total_lpm':0, 'total_test_cnt':0,'total_time':0, 'total_mistakes':0}
    

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    quote = models.CharField(max_length=200, null=True, blank=True)
    keys = models.JSONField('keys', default=keys_default)
    wpm = models.IntegerField(default=0)
    total_stat = models.JSONField('total_stats', default=total_stat_default)
    
    def __str__(self):
        return 'Profile for user {}'.format(self.user.username)

class SiteStatistics(models.Model):
    total_mistakes = models.IntegerField(default=0)
    total_time = models.IntegerField(default=0)
    total_tests = models.IntegerField(default=0)
    total_words = models.IntegerField(default=0)
    total_keys = models.IntegerField(default=0)

class Post(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    title = models.CharField(max_length=250)
    slug = AutoSlugField(populate_from='title')
    author = models.ForeignKey(User, related_name='blog_posts', on_delete=models.CASCADE)
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    views = models.IntegerField(default=0)
    
    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('post_detail',
                        args=[self.publish.year,
                              self.publish.strftime('%m'),
                              self.publish.strftime('%d'),
                              self.slug])

    
class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test_date = models.DateTimeField(auto_now=True)
    test_num = models.IntegerField(default=1)
    wpm = models.IntegerField(default=0)
    lpm = models.IntegerField(default=0)
    time = models.IntegerField(default=0)
    mistakes = models.IntegerField(default=0)
    accuracy = models.IntegerField(default=0)

    models.Index(fields=['user', ])
    
    class Meta:
        ordering = ('-test_date',)
    
    

# Create your models here.
