from pydantic import BaseModel
from datetime import date
from typing import Literal


class Batter(BaseModel):
    batter_bam_id: int
    batter_name_first: str
    batter_name_last: str

class Batters(BaseModel):
    batters: list[Batter]



# class Pitch(BaseModel):
#     """
#     Represents a single pitch/play (one row in the database).
#     """

#     game_date: date
#     game_bam_id: int # unique identifier for game
#     venue_bam_id: int # unique identifer for venue
#     venue: str
#     league: str
#     away_team: str
#     home_team: str
#     guid: str
#     pitch_seq: int # per batter
#     is_pitch: bool
#     is_pickoff: bool
#     is_stepoff: bool
#     # is_pitchout: bool # all false for this dataset
#     is_balk: bool
#     terminating: bool  # last pitch of AB or not
#     pitch_code: str | int
#     pitch_result: str
#     event_type: str | None
#     description: str | None
#     inning: int
#     bottom: bool
#     at_bat_number: int # for entire game
#     pre_balls: int
#     pre_strikes: int
#     pre_outs: int
#     pre_basecode: int
#     pre_vscore: int
#     pre_hscore: int

#     # RUNNERS ON BASE 1/2/3 BEFORE PITCH
#     # pre_r1_bam_id
#     # pre_r2_bam_id
#     # pre_r3_bam_id

#     post_balls: int
#     post_strikes: int
#     post_outs: int
#     post_basecode: int
#     post_vscore: int
#     post_hscore: int

#     # RUNNERS ON BASE 1/2/3 AFTER PITCH
#     # post_r1_bam_id
#     # post_r2_bam_id
#     # post_r3_bam_id

#     # pitcher_team_bam_id: bool # no idea
#     pitcher_team: str
#     pitcher_bam_id: int
#     pitcher_name_first: str
#     pitcher_name_last: str
#     pitcher_set: str | None
#     pitcher_side: str # leftie or rightie
#     pitcher_type: str # starter or reliever
#     better_team_bam_id: int
#     batter_team: str
#     batter_bam_id: int
#     batter_name_first: str
#     batter_name_last: str
#     batter_side: str # batting leftie or rightie
#     batter_position: int # 10 DH, 11 PH?
#     catcher_bam_id: int
#     # omitted the other field position bam_ids
#     fielder_position: int | None # first to field the ball
#     fielder_bam_id: int | None
#     # strikezone_top
#     # strikezone_bot
#     pitch_type: str | None
#     rel_speed: float | None
#     # rel_angle
#     # rel_direction
#     # rel_side
#     # rel_height
#     plate_time: float | None
#     # spin_axis
#     # spin_rate
#     # horz_break
#     # vert_break
#     # induced_vert_break
#     # zone_time
#     # zone_speed
#     # tilt
#     # extension
#     # plate_x
#     # plate_z
#     hit_trajectory: str | None
#     hit_exit_speed: float | None
#     # hit_vertical_angle
#     # hit_horizontal_angle
#     hit_distance: int | float | None
#     # hit_bearing
#     hit_swing_speed: int | float | None
#     # hit_contact_x
#     # hit_contact_y
#     # hit_contact_z
#     # vertical_bat_angle
#     # horizontal_bat_angle
#     # vertical_bat_attack_angle
#     # horizontal_bat_attack_angle
#     bat_speed: int | float | None
#     wild_pitch: int
#     passed_ball: int
#     in_zone: bool | None
#     swing: bool
#     contact: bool
#     in_play: bool
#     ball: bool
#     called_strike: bool
#     swinging_strike: bool
#     chase: bool
#     foul: bool
#     bunt_attempt: bool
