from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
# from accounts.models import NewUser
from django.conf import settings

# Create your models here.
class Household(models.Model):
  name = models.CharField(max_length=100)

  def __str__(self):
      return self.name

# class User(models.Model):
#   household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='users')
#   username = models.CharField(max_length=100)
#   email = models.EmailField(unique=True)
#   admin = models.BooleanField()
#   image = models.TextField()

#   def __str__(self):
#       return self.username 

# class User(AbstractBaseUser, PermissionsMixin):
#   email = models.EmailField(unique=True)
#   username = models.CharField(max_length=150, unique=True)
#   household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='users')
#   admin = models.BooleanField()
#   image = models.TextField()

#   def __str__(self):
#       return self.username 

#   is_staff = models.BooleanField(default=False)
#   is_active = models.BooleanField(default=True)

#   USERNAME_FIELD = 'email'
#   REQUIRED_FIELDS = ['username', 'household']

#   def __str__(self):
#       return self.username

class Chore(models.Model):
  household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='chores')
  doer = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='chores')
  name = models.CharField(max_length=100)
  notes = models.TextField(null=True, blank=True)
  priority = models.PositiveSmallIntegerField()
  done = models.BooleanField(default=False)

  def __str__(self):
    return self.name