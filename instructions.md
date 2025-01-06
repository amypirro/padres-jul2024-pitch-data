Instructions:
I’ve attached a CSV with pitch data for the month of July for the 2024 Padres. We are looking for you to create a small web application that will:

- Have a small data structure for storing the data from the CSV.
- Have a backend that acts as the API layer that will serve this data. It should allow for some amount of filtering or sorting.
- Have a front end capable of allowing users to interact with the data and analyze it more deeply in interesting ways. Pick one or two aspects about the data you'd like to focus on -- some ideas could be pitcher's pitch type performance, batter's swing or contact performance, pitcher vs batter matchups, maybe some kind of leaderboard or each player's performance over time, etc. Its up to you really. We encourage you to make this part visually appealing (perhaps by using d3 or other visualization libraries).
- Be easy to setup and run quickly without errors.
- Have code that is easy to read and demonstrates good infrastructure principles.
- You can choose whatever tech stack you like. We use PostgreSQL (database), Python (Flask backend) and Javascript (AngularJS frontend) but we encourage you to use whatever you are most comfortable with.

Submission:
Please submit the project by sending us a link to your GitHub repo or project files along with any install/setup directions by end of day on Friday, Jan 10th.

Data Explainer:

The baseball data is a modified, flattened version of what you can find with MLB’s GUMBO API. We hope that the flattened version should be easier to work with for development purposes. You will see various “bam_id” fields, these are MLB’s identifiers. Here's some info about the data to help you understand it better:

Metadata about the game itself:

game_date, game_bam_id, venue_bam_id, venue, league, away_team, home_team,

Pitch metadata and game state:

guid, pitch_seq, is_pitch, is_pickoff, is_stepoff, is_pitchout, is_balk, terminating, pitch_code, pitch_result, event_type, description, inning, bottom, at_bat_number,

pre_balls, pre_strikes, pre_outs, pre_basecode, pre_vscore, pre_hscore, pre_r1_bam_id, pre_r2_bam_id, pre_r3_bam_id,

post_balls, post_strikes, post_outs, post_basecode, post_vscore, post_hscore, post_r1_bam_id, post_r2_bam_id, post_r3_bam_id, runners_going

Pitcher info:

pitcher_team_bam_id, pitcher_team, pitcher_bam_id, pitcher_name_first, pitcher_name_last, pitcher_set, pitcher_side, pitcher_type,

Batter info:

batter_team_bam_id, batter_team, batter_bam_id, batter_name_first, batter_name_last, batter_side, batter_position,

Other fielders:

catcher_bam_id, b1_bam_id, b2_bam_id, b3_bam_id, ss_bam_id, lf_bam_id, cf_bam_id, rf_bam_id, fielder_position, fielder_bam_id,

Pitch Characteristics:

strikezone_top, strikezone_bot, pitch_type, rel_speed, rel_angle, rel_direction, rel_side, rel_height, plate_time, spin_axis, spin_rate, horz_break, vert_break, induced_vert_break, zone_time, zone_speed, tilt, extension, plate_x, plate_z,

Batted Ball/Bat:

hit_trajectory, hit_exit_speed, hit_vertical_angle, hit_horizontal_angle, hit_distance, hit_bearing, hit_swing_speed, hit_contact_x, hit_contact_y, hit_contact_z, vertical_bat_angle, horizontal_bat_angle, vertical_bat_attack_angle, horizontal_bat_attack_angle, bat_speed, wild_pitch, passed_ball, in_zone, swing, contact, in_play, ball, called_strike, swinging_strike, chase, foul, bunt_attempt