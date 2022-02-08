from dataclasses import fields
from rest_framework import serializers
from .models import Household, User, Chore

class ChoreSerializer(serializers.HyperlinkedModelSerializer):
  household = serializers.HyperlinkedRelatedField(
    view_name = 'household_detail',
    read_only = True
  )

  household_id = serializers.PrimaryKeyRelatedField(
    queryset = Household.objects.all(),
    source = 'household'
  )

  doer = serializers.HyperlinkedRelatedField(
    view_name = 'user_detail',
    read_only = True
  )

  doer_id = serializers.PrimaryKeyRelatedField(
    queryset = User.objects.all(),
    source = 'user'
  )

  chore_url = serializers.ModelSerializer.serializer_url_field(
    view_name = 'chore_detail'
  )

  class Meta:
    model = Chore
    fields = ('id', 'name', 'notes', 'priority', 'done', 'household', 'household_id', 'doer', 'doer_id', 'chore_url')
    
# class HouseholdSerializer(serializers.HyperlinkedModelSerializer):
