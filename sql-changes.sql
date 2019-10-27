update body_segment set name = 'uPPer body', updated_at = current_timestamp where id = 0;
update muscle_group set name = 'shoulDers', updated_at = current_timestamp where id = 0;
update muscle set canonical_name = 'Deltoids', updated_at = current_timestamp where id = 0;
update muscle_alias set alias = 'yo yo', updated_at = current_timestamp where id = 0 and muscle_id = 0;
update movement set canonical_name = 'yyy', updated_at = current_timestamp where id = 0;
update movement_alias set alias = 'yyyy', updated_at = current_timestamp where id = 0 and movement_id = 0;
update movement_variant set name = 'Sleddy', updated_at = current_timestamp where id = 64;
update cardio_type set name = 'Walking', updated_at = current_timestamp where id = 14;
update walking_pace set name = 'Super Hi', updated_at = current_timestamp where id = 2;
