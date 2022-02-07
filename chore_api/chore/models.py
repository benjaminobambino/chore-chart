from django.db import models

# Create your models here.
class Household(models.Model):
  name = models.CharField(max_length=100)

  def __str__(self):
      return self.name

class User(models.Model):
  household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='household')
  username = models.CharField(max_length=100)
  email = models.EmailField()
  password_digest = models.CharField(max_length=100)
  admin = models.BooleanField()
  image = models.TextField()
