from django.db import models
from django.utils.translation import gettext_lazy as _


class TagsEnum(models.TextChoices):
    COOKING = "Cooking", _('Cooking')
    PARTYING = "Partying", _('Partying')
    SPORTS = 'Sports', _('Sports')
    FOOTBALL = "Football", _('Football')

# 
# 96 -- 45 18mnth  -- 10 admin...