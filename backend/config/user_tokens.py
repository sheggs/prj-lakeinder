from django.db import models
from django.utils.translation import gettext_lazy as _


class TagsEnum(models.TextChoices):
    COOKING = "Cooking", _('Cooking')
    PARTYING = "Partying", _('Partying')
    SPORTS = 'Sports', _('Sports')
    FOOTBALL = "Football", _('Football')
    TRAVELING = "Traveling", _('Traveling')
    THEATER = "Theater", _('Theater')

    Dancing = "Dancing", _('Dancing')
    Politics = "Politics", _('Politics')
    Photography = "Photography", _('Photography')
    Music = "Music", _('Music')
    VideoGames = "Video Games", _('Video Games')
  

# 
# 96 -- 45 18mnth  -- 10 admin...