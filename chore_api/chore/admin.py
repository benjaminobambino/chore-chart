import imp
from django.contrib import admin
from .models import Household, User, Chore

# Register your models here.
admin.site.register(Household)
admin.site.register(User)
admin.site.register(Chore)