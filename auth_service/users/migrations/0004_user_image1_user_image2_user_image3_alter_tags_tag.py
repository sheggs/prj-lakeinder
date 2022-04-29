# Generated by Django 4.0.3 on 2022-04-22 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_date_of_birth_user_sex'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image1',
            field=models.TextField(default='https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Boris_Johnson_official_portrait_%28cropped%29.jpg/220px-Boris_Johnson_official_portrait_%28cropped%29.jpg'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='image2',
            field=models.TextField(default='https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Boris_Johnson_official_portrait_%28cropped%29.jpg/220px-Boris_Johnson_official_portrait_%28cropped%29.jpg'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='image3',
            field=models.TextField(default='https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Boris_Johnson_official_portrait_%28cropped%29.jpg/220px-Boris_Johnson_official_portrait_%28cropped%29.jpg'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tags',
            name='tag',
            field=models.CharField(choices=[('Cooking', 'Cooking'), ('Partying', 'Partying'), ('Sports', 'Sports'), ('Football', 'Football'), ('Traveling', 'Traveling'), ('Theater', 'Theater'), ('Dancing', 'Dancing'), ('Politics', 'Politics'), ('Photography', 'Photography'), ('Music', 'Music'), ('Video Games', 'Video Games')], max_length=255),
        ),
    ]