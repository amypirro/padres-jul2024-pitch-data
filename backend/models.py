from pydantic import BaseModel, Field
from datetime import date
from typing import Literal


class Batter(BaseModel):
    batter_bam_id: int
    batter_name_first: str
    batter_name_last: str


class Batters(BaseModel):
    batters: list[Batter]


class BatterEvent(BaseModel):
    batter_bam_id: int
    batter_name_first: str
    batter_name_last: str
    event_type: str | None
    bottom: bool
    event_counts: int | None

class BatEvents(BaseModel):
    strikeout: int
    single: int
    double: int
    triple: int
    home_run: int
    walk: int
    field_out: int

class BatterEvents(BaseModel):
    batter_events: list[BatterEvent]

class BatterEventsTest(BaseModel):
    batter: Batter
    home_events: BatEvents
    away_events: BatEvents


