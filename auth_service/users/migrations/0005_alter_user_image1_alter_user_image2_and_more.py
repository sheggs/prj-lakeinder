# Generated by Django 4.0.3 on 2022-04-29 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_user_image1_user_image2_user_image3_alter_tags_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image1',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='image2',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='image3',
            field=models.CharField(max_length=255),
        ),
    ]