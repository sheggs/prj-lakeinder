# Generated by Django 4.0.3 on 2022-04-22 15:43

from django.db import migrations, models
import django.utils.timezone
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(default=django.utils.timezone.now, validators=[users.models.User.validate_is_of_age]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='sex',
            field=models.IntegerField(default=0, validators=[users.models.User.validate_sex]),
        ),
    ]
