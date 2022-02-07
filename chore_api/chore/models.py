from django.db import models

# Create your models here.
class Household(models.Model):
  name = models.CharField(max_length=100)
  starter_list = models.BooleanField()
  winner_board = models.BooleanField()

  def __str__(self):
      return self.name

