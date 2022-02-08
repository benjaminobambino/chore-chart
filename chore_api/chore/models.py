from django.db import models

# Create your models here.
class Household(models.Model):
  name = models.CharField(max_length=100)

  def __str__(self):
      return self.name

class User(models.Model):
  household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='users')
  username = models.CharField(max_length=100)
  email = models.EmailField(unique=True)
  admin = models.BooleanField()
  image = models.TextField()

  def __str__(self):
      return self.username 

class Chore(models.Model):
  household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='chores')
  doer = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='chores')
  name = models.CharField(max_length=100)
  notes = models.TextField(null=True, blank=True)
  priority = models.PositiveSmallIntegerField()
  done = models.BooleanField()

  def __str__(self):
    return self.name