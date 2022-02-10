from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from chore.models import Household

# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):

  email = models.EmailField(_('email address'), unique=True)
  username = models.CharField(max_length=150, unique=True)
  household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='users')
  admin = models.BooleanField()
  image = models.TextField()

  is_staff = models.BooleanField(default=False)
  # is_active = models.BooleanField(default=True)

  # objects = CustomAccountManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username',]

  def __str__(self):
      return self.user_name
      