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

class Chore(models.Model):
  household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='chores')
  doer = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='chores')
  name = models.CharField(max_length=100)
  notes = models.TextField(null=True, blank=True)
  priority = models.PositiveSmallIntegerField()
  done = models.BooleanField(default=False)

  def __str__(self):
    return self.name