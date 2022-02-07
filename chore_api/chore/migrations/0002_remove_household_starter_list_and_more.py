# Generated by Django 4.0.2 on 2022-02-07 20:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chore', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='household',
            name='starter_list',
        ),
        migrations.RemoveField(
            model_name='household',
            name='winner_board',
        ),
        migrations.AddField(
            model_name='user',
            name='admin',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='household',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='household', to='chore.household'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]