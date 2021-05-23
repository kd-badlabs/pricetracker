# Generated by Django 3.2.2 on 2021-05-21 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('searchBar', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company_symbol',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=200)),
                ('industry', models.CharField(max_length=200)),
                ('country', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Company_symbol',
            },
        ),
        migrations.DeleteModel(
            name='Company_symbol_list',
        ),
    ]
