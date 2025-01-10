from pydantic import BaseModel


class Batter(BaseModel):
    batter_bam_id: int
    batter_name_first: str
    batter_name_last: str


class Batters(BaseModel):
    batters: list[Batter]


class BatEvents(BaseModel):
    """
    Counts for various batter outcomes on terminating pitch
    """

    strikeout: int
    single: int
    double: int
    triple: int
    home_run: int
    walk: int
    field_out: int


class BatterEvents(BaseModel):
    """
    Home and Away counts for various batter outcomes on terminating pitch for a single batter
    """

    batter: Batter
    home_events: BatEvents
    away_events: BatEvents


class BatterEvent(BaseModel):
    """
    (Unused) Alternative structure for get_batter_events response
    """

    batter_bam_id: int
    batter_name_first: str
    batter_name_last: str
    event_type: str | None
    bottom: bool
    event_counts: int | None
