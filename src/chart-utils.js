import _ from "lodash"
import moment from "moment"
import * as utils from "./utils"
import * as urls from "./urls"
var Promise = require('es6-promise').Promise

////////////////////////////////////////////////////////////////////////////////
// Body Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_BODY_WEIGHT = "bodyWeight"
export const CHART_ID_ARM_SIZE = "armSize"
export const CHART_ID_CHEST_SIZE = "chestSize"
export const CHART_ID_CALF_SIZE = "calfSize"
export const CHART_ID_THIGH_SIZE = "thighSize"
export const CHART_ID_FOREARM_SIZE = "forearmSize"
export const CHART_ID_WAIST_SIZE = "waistSize"
export const CHART_ID_NECK_SIZE = "neckSize"

// Global Chart Configs
export const CHART_ID_GLOBAL_BODY = "bodyGlobal"
export const CHART_ID_GLOBAL_STRENGTH = "strengthGlobal"
export const CHART_ID_GLOBAL_REPS = "repsGlobal"
export const CHART_ID_GLOBAL_REST_TIME = "restTimeGlobal"

////////////////////////////////////////////////////////////////////////////////
// Aggregate Weight Lifted - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_WLTC_ALL = "wltc-all"
export const CHART_ID_WLTC_BODY_SEGMENTS = "wltc-body-segments"
export const CHART_ID_WLTC_MUSCLE_GROUPS = "wltc-muscle-groups"
export const CHART_ID_WLTC_UPPER_BODY_MUSCLE_GROUPS = "wltc-upper-body-muscle-groups"
export const CHART_ID_WLTC_SHOULDERS = "wltc-shoulder-mg"
export const CHART_ID_WLTC_CHEST = "wltc-chest-mg"
export const CHART_ID_WLTC_BACK = "wltc-back-mg"
export const CHART_ID_WLTC_BICEPS = "wltc-biceps-mg"
export const CHART_ID_WLTC_TRICEPS = "wltc-triceps-mg"
export const CHART_ID_WLTC_FOREARMS = "wltc-forearms-mg"
export const CHART_ID_WLTC_ABS = "wltc-abs-mg"
export const CHART_ID_WLTC_LOWER_BODY_MUSCLE_GROUPS = "wltc-lower-body-muscle-groups"
export const CHART_ID_WLTC_QUADS = "wltc-quads-mg"
export const CHART_ID_WLTC_HAMS = "wltc-hams-mg"
export const CHART_ID_WLTC_CALFS = "wltc-calfs-mg"
export const CHART_ID_WLTC_GLUTES = "wltc-glutes-mg"
export const CHART_ID_WLTC_MOVEMENT_VARIANTS = "wltc-movement-variants"
export const CHART_ID_WLTC_MOV_VAR_UPPER_BODY = "wltc-mov-var-upper-body"
export const CHART_ID_WLTC_MOV_VAR_SHOULDERS = "wltc-mov-var-shoulders"
export const CHART_ID_WLTC_MOV_VAR_CHEST = "wltc-mov-var-chest"
export const CHART_ID_WLTC_MOV_VAR_BACK = "wltc-mov-var-back"
export const CHART_ID_WLTC_MOV_VAR_BICEPS = "wltc-mov-var-biceps"
export const CHART_ID_WLTC_MOV_VAR_TRICEPS = "wltc-mov-var-triceps"
export const CHART_ID_WLTC_MOV_VAR_FOREARMS = "wltc-mov-var-forearms"
export const CHART_ID_WLTC_MOV_VAR_ABS = "wltc-mov-var-abs"
export const CHART_ID_WLTC_MOV_VAR_LOWER_BODY = "wltc-mov-var-lower-body"
export const CHART_ID_WLTC_MOV_VAR_QUADS = "wltc-mov-var-quads"
export const CHART_ID_WLTC_MOV_VAR_HAMS = "wltc-mov-var-hams"
export const CHART_ID_WLTC_MOV_VAR_CALFS = "wltc-mov-var-calfs"
export const CHART_ID_WLTC_MOV_VAR_GLUTES = "wltc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Average Weight Lifted - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_AVG_WLTC_ALL = "avg-wltc-all"
export const CHART_ID_AVG_WLTC_BODY_SEGMENTS = "avg-wltc-body-segments"
export const CHART_ID_AVG_WLTC_MUSCLE_GROUPS = "avg-wltc-muscle-groups"
export const CHART_ID_AVG_WLTC_UPPER_BODY_MUSCLE_GROUPS = "avg-wltc-upper-body-muscle-groups"
export const CHART_ID_AVG_WLTC_SHOULDERS = "avg-wltc-shoulder-mg"
export const CHART_ID_AVG_WLTC_CHEST = "avg-wltc-chest-mg"
export const CHART_ID_AVG_WLTC_BACK = "avg-wltc-back-mg"
export const CHART_ID_AVG_WLTC_BICEPS = "avg-wltc-biceps-mg"
export const CHART_ID_AVG_WLTC_TRICEPS = "avg-wltc-triceps-mg"
export const CHART_ID_AVG_WLTC_FOREARMS = "avg-wltc-forearms-mg"
export const CHART_ID_AVG_WLTC_ABS = "avg-wltc-abs-mg"
export const CHART_ID_AVG_WLTC_LOWER_BODY_MUSCLE_GROUPS = "avg-wltc-lower-body-muscle-groups"
export const CHART_ID_AVG_WLTC_QUADS = "avg-wltc-quads"
export const CHART_ID_AVG_WLTC_HAMS = "avg-wltc-hams"
export const CHART_ID_AVG_WLTC_CALFS = "avg-wltc-calfs"
export const CHART_ID_AVG_WLTC_GLUTES = "avg-wltc-glutes"
export const CHART_ID_AVG_WLTC_MOVEMENT_VARIANTS = "avg-wltc-movement-variants"
export const CHART_ID_AVG_WLTC_MOV_VAR_UPPER_BODY = "avg-wltc-mov-var-upper-body"
export const CHART_ID_AVG_WLTC_MOV_VAR_SHOULDERS = "avg-wltc-mov-var-shoulders"
export const CHART_ID_AVG_WLTC_MOV_VAR_CHEST = "avg-wltc-mov-var-chest"
export const CHART_ID_AVG_WLTC_MOV_VAR_BACK = "avg-wltc-mov-var-back"
export const CHART_ID_AVG_WLTC_MOV_VAR_BICEPS = "avg-wltc-mov-var-biceps"
export const CHART_ID_AVG_WLTC_MOV_VAR_TRICEPS = "avg-wltc-mov-var-triceps"
export const CHART_ID_AVG_WLTC_MOV_VAR_FOREARMS = "avg-wltc-mov-var-forearms"
export const CHART_ID_AVG_WLTC_MOV_VAR_ABS = "avg-wltc-mov-var-abs"
export const CHART_ID_AVG_WLTC_MOV_VAR_LOWER_BODY = "avg-wltc-mov-var-lower-body"
export const CHART_ID_AVG_WLTC_MOV_VAR_QUADS = "avg-wltc-mov-var-quads"
export const CHART_ID_AVG_WLTC_MOV_VAR_HAMS = "avg-wltc-mov-var-hams"
export const CHART_ID_AVG_WLTC_MOV_VAR_CALFS = "avg-wltc-mov-var-calfs"
export const CHART_ID_AVG_WLTC_MOV_VAR_GLUTES = "avg-wltc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Weight Lifted Distribution - Carousel and Pie Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_WLDPC_BODY_SEGMENTS = "wlpc-body-segments"
export const CHART_ID_WLDPC_MUSCLE_GROUPS = "wlpc-muscle-groups"
export const CHART_ID_WLDPC_UPPER_BODY_MUSCLE_GROUPS = "wlpc-upper-body-muscle-groups"
export const CHART_ID_WLDPC_LOWER_BODY_MUSCLE_GROUPS = "wlpc-lower-body-muscle-groups"
export const CHART_ID_WLDPC_SHOULDERS = "wlpc-shoulder-mg"
export const CHART_ID_WLDPC_CHEST = "wlpc-chest-mg"
export const CHART_ID_WLDPC_BACK = "wlpc-back-mg"
export const CHART_ID_WLDPC_TRICEPS = "wlpc-triceps-mg"
export const CHART_ID_WLDPC_ABS = "wlpc-abs-mg"
export const CHART_ID_WLDPC_MOVEMENT_VARIANTS = "wlpc-movement-variants"
export const CHART_ID_WLDPC_MOV_VAR_UPPER_BODY = "wlpc-mov-var-upper-body"
export const CHART_ID_WLDPC_MOV_VAR_SHOULDERS = "wlpc-mov-var-shoulders"
export const CHART_ID_WLDPC_MOV_VAR_CHEST = "wlpc-mov-var-chest"
export const CHART_ID_WLDPC_MOV_VAR_BACK = "wlpc-mov-var-back"
export const CHART_ID_WLDPC_MOV_VAR_BICEPS = "wlpc-mov-var-biceps"
export const CHART_ID_WLDPC_MOV_VAR_TRICEPS = "wlpc-mov-var-triceps"
export const CHART_ID_WLDPC_MOV_VAR_FOREARMS = "wlpc-mov-var-forearms"
export const CHART_ID_WLDPC_MOV_VAR_ABS = "wlpc-mov-var-abs"
export const CHART_ID_WLDPC_MOV_VAR_LOWER_BODY = "wlpc-mov-var-lower-body"
export const CHART_ID_WLDPC_MOV_VAR_QUADS = "wlpc-mov-var-quads"
export const CHART_ID_WLDPC_MOV_VAR_HAMS = "wlpc-mov-var-hams"
export const CHART_ID_WLDPC_MOV_VAR_CALFS = "wlpc-mov-var-calfs"
export const CHART_ID_WLDPC_MOV_VAR_GLUTES = "wlpc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Weight Lifted Distribution - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_WLDTC_BODY_SEGMENTS = "wldtc-body-segments"
export const CHART_ID_WLDTC_MUSCLE_GROUPS = "wldtc-muscle-groups"
export const CHART_ID_WLDTC_UPPER_BODY_MUSCLE_GROUPS = "wldtc-upper-body-muscle-groups"
export const CHART_ID_WLDTC_SHOULDERS = "wldtc-shoulder-mg"
export const CHART_ID_WLDTC_CHEST = "wldtc-chest-mg"
export const CHART_ID_WLDTC_BACK = "wldtc-back-mg"
export const CHART_ID_WLDTC_TRICEPS = "wldtc-triceps-mg"
export const CHART_ID_WLDTC_ABS = "wldtc-abs-mg"
export const CHART_ID_WLDTC_LOWER_BODY_MUSCLE_GROUPS = "wldtc-lower-body-muscle-groups"
export const CHART_ID_WLDTC_MOVEMENT_VARIANTS = "wldtc-movement-variants"
export const CHART_ID_WLDTC_MOV_VAR_UPPER_BODY = "wldtc-mov-var-upper-body"
export const CHART_ID_WLDTC_MOV_VAR_SHOULDERS = "wldtc-mov-var-shoulders"
export const CHART_ID_WLDTC_MOV_VAR_CHEST = "wldtc-mov-var-chest"
export const CHART_ID_WLDTC_MOV_VAR_BACK = "wldtc-mov-var-back"
export const CHART_ID_WLDTC_MOV_VAR_BICEPS = "wldtc-mov-var-biceps"
export const CHART_ID_WLDTC_MOV_VAR_TRICEPS = "wldtc-mov-var-triceps"
export const CHART_ID_WLDTC_MOV_VAR_FOREARMS = "wldtc-mov-var-forearms"
export const CHART_ID_WLDTC_MOV_VAR_ABS = "wldtc-mov-var-abs"
export const CHART_ID_WLDTC_MOV_VAR_LOWER_BODY = "wldtc-mov-var-lower-body"
export const CHART_ID_WLDTC_MOV_VAR_QUADS = "wldtc-mov-var-quads"
export const CHART_ID_WLDTC_MOV_VAR_HAMS = "wldtc-mov-var-hams"
export const CHART_ID_WLDTC_MOV_VAR_CALFS = "wldtc-mov-var-calfs"
export const CHART_ID_WLDTC_MOV_VAR_GLUTES = "wldtc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Aggregate Reps - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_RTC_ALL = "rtc-all"
export const CHART_ID_RTC_BODY_SEGMENTS = "rtc-body-segments"
export const CHART_ID_RTC_MUSCLE_GROUPS = "rtc-muscle-groups"
export const CHART_ID_RTC_UPPER_BODY_MUSCLE_GROUPS = "rtc-upper-body-muscle-groups"
export const CHART_ID_RTC_SHOULDERS = "rtc-shoulder-mg"
export const CHART_ID_RTC_CHEST = "rtc-chest-mg"
export const CHART_ID_RTC_BACK = "rtc-back-mg"
export const CHART_ID_RTC_BICEPS = "rtc-biceps-mg"
export const CHART_ID_RTC_TRICEPS = "rtc-triceps-mg"
export const CHART_ID_RTC_FOREARMS = "rtc-forearms-mg"
export const CHART_ID_RTC_ABS = "rtc-abs-mg"
export const CHART_ID_RTC_LOWER_BODY_MUSCLE_GROUPS = "rtc-lower-body-muscle-groups"
export const CHART_ID_RTC_QUADS = "rtc-quads-mg"
export const CHART_ID_RTC_HAMS = "rtc-hams-mg"
export const CHART_ID_RTC_CALFS = "rtc-calfs-mg"
export const CHART_ID_RTC_GLUTES = "rtc-glutes-mg"
export const CHART_ID_RTC_MOVEMENT_VARIANTS = "rtc-movement-variants"
export const CHART_ID_RTC_MOV_VAR_UPPER_BODY = "rtc-mov-var-upper-body"
export const CHART_ID_RTC_MOV_VAR_SHOULDERS = "rtc-mov-var-shoulders"
export const CHART_ID_RTC_MOV_VAR_CHEST = "rtc-mov-var-chest"
export const CHART_ID_RTC_MOV_VAR_BACK = "rtc-mov-var-back"
export const CHART_ID_RTC_MOV_VAR_BICEPS = "rtc-mov-var-biceps"
export const CHART_ID_RTC_MOV_VAR_TRICEPS = "rtc-mov-var-triceps"
export const CHART_ID_RTC_MOV_VAR_FOREARMS = "rtc-mov-var-forearms"
export const CHART_ID_RTC_MOV_VAR_ABS = "rtc-mov-var-abs"
export const CHART_ID_RTC_MOV_VAR_LOWER_BODY = "rtc-mov-var-lower-body"
export const CHART_ID_RTC_MOV_VAR_QUADS = "rtc-mov-var-quads"
export const CHART_ID_RTC_MOV_VAR_HAMS = "rtc-mov-var-hams"
export const CHART_ID_RTC_MOV_VAR_CALFS = "rtc-mov-var-calfs"
export const CHART_ID_RTC_MOV_VAR_GLUTES = "rtc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Average Reps - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_AVG_RTC_ALL = "avg-rtc-all"
export const CHART_ID_AVG_RTC_BODY_SEGMENTS = "avg-rtc-body-segments"
export const CHART_ID_AVG_RTC_MUSCLE_GROUPS = "avg-rtc-muscle-groups"
export const CHART_ID_AVG_RTC_UPPER_BODY_MUSCLE_GROUPS = "avg-rtc-upper-body-muscle-groups"
export const CHART_ID_AVG_RTC_SHOULDERS = "avg-rtc-shoulder-mg"
export const CHART_ID_AVG_RTC_CHEST = "avg-rtc-chest-mg"
export const CHART_ID_AVG_RTC_BACK = "avg-rtc-back-mg"
export const CHART_ID_AVG_RTC_BICEPS = "avg-rtc-biceps-mg"
export const CHART_ID_AVG_RTC_TRICEPS = "avg-rtc-triceps-mg"
export const CHART_ID_AVG_RTC_FOREARMS = "avg-rtc-forearms-mg"
export const CHART_ID_AVG_RTC_ABS = "avg-rtc-abs-mg"
export const CHART_ID_AVG_RTC_LOWER_BODY_MUSCLE_GROUPS = "avg-rtc-lower-body-muscle-groups"
export const CHART_ID_AVG_RTC_QUADS = "avg-rtc-quads-mg"
export const CHART_ID_AVG_RTC_HAMS = "avg-rtc-hams-mg"
export const CHART_ID_AVG_RTC_CALFS = "avg-rtc-calfs-mg"
export const CHART_ID_AVG_RTC_GLUTES = "avg-rtc-glutes-mg"
export const CHART_ID_AVG_RTC_MOVEMENT_VARIANTS = "avg-rtc-movement-variants"
export const CHART_ID_AVG_RTC_MOV_VAR_UPPER_BODY = "avg-rtc-mov-var-upper-body"
export const CHART_ID_AVG_RTC_MOV_VAR_SHOULDERS = "avg-rtc-mov-var-shoulders"
export const CHART_ID_AVG_RTC_MOV_VAR_CHEST = "avg-rtc-mov-var-chest"
export const CHART_ID_AVG_RTC_MOV_VAR_BACK = "avg-rtc-mov-var-back"
export const CHART_ID_AVG_RTC_MOV_VAR_BICEPS = "avg-rtc-mov-var-biceps"
export const CHART_ID_AVG_RTC_MOV_VAR_TRICEPS = "avg-rtc-mov-var-triceps"
export const CHART_ID_AVG_RTC_MOV_VAR_FOREARMS = "avg-rtc-mov-var-forearms"
export const CHART_ID_AVG_RTC_MOV_VAR_ABS = "avg-rtc-mov-var-abs"
export const CHART_ID_AVG_RTC_MOV_VAR_LOWER_BODY = "avg-rtc-mov-var-lower-body"
export const CHART_ID_AVG_RTC_MOV_VAR_QUADS = "avg-rtc-mov-var-quads"
export const CHART_ID_AVG_RTC_MOV_VAR_HAMS = "avg-rtc-mov-var-hams"
export const CHART_ID_AVG_RTC_MOV_VAR_CALFS = "avg-rtc-mov-var-calfs"
export const CHART_ID_AVG_RTC_MOV_VAR_GLUTES = "avg-rtc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Reps Distribution - Carousel and Pie Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_RDPC_BODY_SEGMENTS = "rpc-body-segments"
export const CHART_ID_RDPC_MUSCLE_GROUPS = "rpc-muscle-groups"
export const CHART_ID_RDPC_UPPER_BODY_MUSCLE_GROUPS = "rpc-upper-body-muscle-groups"
export const CHART_ID_RDPC_LOWER_BODY_MUSCLE_GROUPS = "rpc-lower-body-muscle-groups"
export const CHART_ID_RDPC_SHOULDERS = "rpc-shoulder-mg"
export const CHART_ID_RDPC_CHEST = "rpc-chest-mg"
export const CHART_ID_RDPC_BACK = "rpc-back-mg"
export const CHART_ID_RDPC_TRICEPS = "rpc-triceps-mg"
export const CHART_ID_RDPC_ABS = "rpc-abs-mg"
export const CHART_ID_RDPC_MOVEMENT_VARIANTS = "rpc-movement-variants"
export const CHART_ID_RDPC_MOV_VAR_UPPER_BODY = "rpc-mov-var-upper-body"
export const CHART_ID_RDPC_MOV_VAR_SHOULDERS = "rpc-mov-var-shoulders"
export const CHART_ID_RDPC_MOV_VAR_CHEST = "rpc-mov-var-chest"
export const CHART_ID_RDPC_MOV_VAR_BACK = "rpc-mov-var-back"
export const CHART_ID_RDPC_MOV_VAR_BICEPS = "rpc-mov-var-biceps"
export const CHART_ID_RDPC_MOV_VAR_TRICEPS = "rpc-mov-var-triceps"
export const CHART_ID_RDPC_MOV_VAR_FOREARMS = "rpc-mov-var-forearms"
export const CHART_ID_RDPC_MOV_VAR_ABS = "rpc-mov-var-abs"
export const CHART_ID_RDPC_MOV_VAR_LOWER_BODY = "rpc-mov-var-lower-body"
export const CHART_ID_RDPC_MOV_VAR_QUADS = "rpc-mov-var-quads"
export const CHART_ID_RDPC_MOV_VAR_HAMS = "rpc-mov-var-hams"
export const CHART_ID_RDPC_MOV_VAR_CALFS = "rpc-mov-var-calfs"
export const CHART_ID_RDPC_MOV_VAR_GLUTES = "rpc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Reps Distribution - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_RDTC_BODY_SEGMENTS = "rdtc-body-segments"
export const CHART_ID_RDTC_MUSCLE_GROUPS = "rdtc-muscle-groups"
export const CHART_ID_RDTC_UPPER_BODY_MUSCLE_GROUPS = "rdtc-upper-body-muscle-groups"
export const CHART_ID_RDTC_SHOULDERS = "rdtc-shoulder-mg"
export const CHART_ID_RDTC_CHEST = "rdtc-chest-mg"
export const CHART_ID_RDTC_BACK = "rdtc-back-mg"
export const CHART_ID_RDTC_TRICEPS = "rdtc-triceps-mg"
export const CHART_ID_RDTC_ABS = "rdtc-abs-mg"
export const CHART_ID_RDTC_LOWER_BODY_MUSCLE_GROUPS = "rdtc-lower-body-muscle-groups"
export const CHART_ID_RDTC_MOVEMENT_VARIANTS = "rdtc-movement-variants"
export const CHART_ID_RDTC_MOV_VAR_UPPER_BODY = "rdtc-mov-var-upper-body"
export const CHART_ID_RDTC_MOV_VAR_SHOULDERS = "rdtc-mov-var-shoulders"
export const CHART_ID_RDTC_MOV_VAR_CHEST = "rdtc-mov-var-chest"
export const CHART_ID_RDTC_MOV_VAR_BACK = "rdtc-mov-var-back"
export const CHART_ID_RDTC_MOV_VAR_BICEPS = "rdtc-mov-var-biceps"
export const CHART_ID_RDTC_MOV_VAR_TRICEPS = "rdtc-mov-var-triceps"
export const CHART_ID_RDTC_MOV_VAR_FOREARMS = "rdtc-mov-var-forearms"
export const CHART_ID_RDTC_MOV_VAR_ABS = "rdtc-mov-var-abs"
export const CHART_ID_RDTC_MOV_VAR_LOWER_BODY = "rdtc-mov-var-lower-body"
export const CHART_ID_RDTC_MOV_VAR_QUADS = "rdtc-mov-var-quads"
export const CHART_ID_RDTC_MOV_VAR_HAMS = "rdtc-mov-var-hams"
export const CHART_ID_RDTC_MOV_VAR_CALFS = "rdtc-mov-var-calfs"
export const CHART_ID_RDTC_MOV_VAR_GLUTES = "rdtc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Aggregate Time Between Sets - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_TBSTC_ALL = "tbstc-all"
export const CHART_ID_TBSTC_BODY_SEGMENTS = "tbstc-body-segments"
export const CHART_ID_TBSTC_MUSCLE_GROUPS = "tbstc-muscle-groups"
export const CHART_ID_TBSTC_UPPER_BODY_MUSCLE_GROUPS = "tbstc-upper-body-muscle-groups"
export const CHART_ID_TBSTC_SHOULDERS = "tbstc-shoulder-mg"
export const CHART_ID_TBSTC_CHEST = "tbstc-chest-mg"
export const CHART_ID_TBSTC_BACK = "tbstc-back-mg"
export const CHART_ID_TBSTC_BICEPS = "tbstc-biceps-mg"
export const CHART_ID_TBSTC_TRICEPS = "tbstc-triceps-mg"
export const CHART_ID_TBSTC_FOREARMS = "tbstc-forearms-mg"
export const CHART_ID_TBSTC_ABS = "tbstc-abs-mg"
export const CHART_ID_TBSTC_LOWER_BODY_MUSCLE_GROUPS = "tbstc-lower-body-muscle-groups"
export const CHART_ID_TBSTC_QUADS = "tbstc-quads-mg"
export const CHART_ID_TBSTC_HAMS = "tbstc-hams-mg"
export const CHART_ID_TBSTC_CALFS = "tbstc-calfs-mg"
export const CHART_ID_TBSTC_GLUTES = "tbstc-glutes-mg"
export const CHART_ID_TBSTC_MOVEMENT_VARIANTS = "tbstc-movement-variants"
export const CHART_ID_TBSTC_MOV_VAR_UPPER_BODY = "tbstc-mov-var-upper-body"
export const CHART_ID_TBSTC_MOV_VAR_SHOULDERS = "tbstc-mov-var-shoulders"
export const CHART_ID_TBSTC_MOV_VAR_CHEST = "tbstc-mov-var-chest"
export const CHART_ID_TBSTC_MOV_VAR_BACK = "tbstc-mov-var-back"
export const CHART_ID_TBSTC_MOV_VAR_BICEPS = "tbstc-mov-var-biceps"
export const CHART_ID_TBSTC_MOV_VAR_TRICEPS = "tbstc-mov-var-triceps"
export const CHART_ID_TBSTC_MOV_VAR_FOREARMS = "tbstc-mov-var-forearms"
export const CHART_ID_TBSTC_MOV_VAR_ABS = "tbstc-mov-var-abs"
export const CHART_ID_TBSTC_MOV_VAR_LOWER_BODY = "tbstc-mov-var-lower-body"
export const CHART_ID_TBSTC_MOV_VAR_QUADS = "tbstc-mov-var-quads"
export const CHART_ID_TBSTC_MOV_VAR_HAMS = "tbstc-mov-var-hams"
export const CHART_ID_TBSTC_MOV_VAR_CALFS = "tbstc-mov-var-calfs"
export const CHART_ID_TBSTC_MOV_VAR_GLUTES = "tbstc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Average Time Between Sets - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_AVG_TBSTC_ALL = "avg-tbstc-all"
export const CHART_ID_AVG_TBSTC_BODY_SEGMENTS = "avg-tbstc-body-segments"
export const CHART_ID_AVG_TBSTC_MUSCLE_GROUPS = "avg-tbstc-muscle-groups"
export const CHART_ID_AVG_TBSTC_UPPER_BODY_MUSCLE_GROUPS = "avg-tbstc-upper-body-muscle-groups"
export const CHART_ID_AVG_TBSTC_SHOULDERS = "avg-tbstc-shoulder-mg"
export const CHART_ID_AVG_TBSTC_CHEST = "avg-tbstc-chest-mg"
export const CHART_ID_AVG_TBSTC_BACK = "avg-tbstc-back-mg"
export const CHART_ID_AVG_TBSTC_BICEPS = "avg-tbstc-biceps-mg"
export const CHART_ID_AVG_TBSTC_TRICEPS = "avg-tbstc-triceps-mg"
export const CHART_ID_AVG_TBSTC_FOREARMS = "avg-tbstc-forearms-mg"
export const CHART_ID_AVG_TBSTC_ABS = "avg-tbstc-abs-mg"
export const CHART_ID_AVG_TBSTC_LOWER_BODY_MUSCLE_GROUPS = "avg-tbstc-lower-body-muscle-groups"
export const CHART_ID_AVG_TBSTC_QUADS = "avg-tbstc-quads-mg"
export const CHART_ID_AVG_TBSTC_HAMS = "avg-tbstc-hams-mg"
export const CHART_ID_AVG_TBSTC_CALFS = "avg-tbstc-calfs-mg"
export const CHART_ID_AVG_TBSTC_GLUTES = "avg-tbstc-glutes-mg"
export const CHART_ID_AVG_TBSTC_MOVEMENT_VARIANTS = "avg-tbstc-movement-variants"
export const CHART_ID_AVG_TBSTC_MOV_VAR_UPPER_BODY = "avg-tbstc-mov-var-upper-body"
export const CHART_ID_AVG_TBSTC_MOV_VAR_SHOULDERS = "avg-tbstc-mov-var-shoulders"
export const CHART_ID_AVG_TBSTC_MOV_VAR_CHEST = "avg-tbstc-mov-var-chest"
export const CHART_ID_AVG_TBSTC_MOV_VAR_BACK = "avg-tbstc-mov-var-back"
export const CHART_ID_AVG_TBSTC_MOV_VAR_BICEPS = "avg-tbstc-mov-var-biceps"
export const CHART_ID_AVG_TBSTC_MOV_VAR_TRICEPS = "avg-tbstc-mov-var-triceps"
export const CHART_ID_AVG_TBSTC_MOV_VAR_FOREARMS = "avg-tbstc-mov-var-forearms"
export const CHART_ID_AVG_TBSTC_MOV_VAR_ABS = "avg-tbstc-mov-var-abs"
export const CHART_ID_AVG_TBSTC_MOV_VAR_LOWER_BODY = "avg-tbstc-mov-var-lower-body"
export const CHART_ID_AVG_TBSTC_MOV_VAR_QUADS = "avg-tbstc-mov-var-quads"
export const CHART_ID_AVG_TBSTC_MOV_VAR_HAMS = "avg-tbstc-mov-var-hams"
export const CHART_ID_AVG_TBSTC_MOV_VAR_CALFS = "avg-tbstc-mov-var-calfs"
export const CHART_ID_AVG_TBSTC_MOV_VAR_GLUTES = "avg-tbstc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Time Between Sets Distribution - Carousel and Pie Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_TBSDPC_BODY_SEGMENTS = "tbspc-body-segments"
export const CHART_ID_TBSDPC_MUSCLE_GROUPS = "tbspc-muscle-groups"
export const CHART_ID_TBSDPC_UPPER_BODY_MUSCLE_GROUPS = "tbspc-upper-body-muscle-groups"
export const CHART_ID_TBSDPC_SHOULDERS = "tbspc-shoulder-mg"
export const CHART_ID_TBSDPC_CHEST = "tbspc-chest-mg"
export const CHART_ID_TBSDPC_BACK = "tbspc-back-mg"
export const CHART_ID_TBSDPC_TRICEPS = "tbspc-triceps-mg"
export const CHART_ID_TBSDPC_ABS = "tbspc-abs-mg"
export const CHART_ID_TBSDPC_LOWER_BODY_MUSCLE_GROUPS = "tbspc-lower-body-muscle-groups"
export const CHART_ID_TBSDPC_MOVEMENT_VARIANTS = "tbspc-movement-variants"
export const CHART_ID_TBSDPC_MOV_VAR_UPPER_BODY = "tbspc-mov-var-upper-body"
export const CHART_ID_TBSDPC_MOV_VAR_SHOULDERS = "tbspc-mov-var-shoulders"
export const CHART_ID_TBSDPC_MOV_VAR_CHEST = "tbspc-mov-var-chest"
export const CHART_ID_TBSDPC_MOV_VAR_BACK = "tbspc-mov-var-back"
export const CHART_ID_TBSDPC_MOV_VAR_BICEPS = "tbspc-mov-var-biceps"
export const CHART_ID_TBSDPC_MOV_VAR_TRICEPS = "tbspc-mov-var-triceps"
export const CHART_ID_TBSDPC_MOV_VAR_FOREARMS = "tbspc-mov-var-forearms"
export const CHART_ID_TBSDPC_MOV_VAR_ABS = "tbspc-mov-var-abs"
export const CHART_ID_TBSDPC_MOV_VAR_LOWER_BODY = "tbspc-mov-var-lower-body"
export const CHART_ID_TBSDPC_MOV_VAR_QUADS = "tbspc-mov-var-quads"
export const CHART_ID_TBSDPC_MOV_VAR_HAMS = "tbspc-mov-var-hams"
export const CHART_ID_TBSDPC_MOV_VAR_CALFS = "tbspc-mov-var-calfs"
export const CHART_ID_TBSDPC_MOV_VAR_GLUTES = "tbspc-mov-var-glutes"

////////////////////////////////////////////////////////////////////////////////
// Time Between Sets Distribution - Carousel and Timeline Charts
////////////////////////////////////////////////////////////////////////////////
export const CHART_ID_TBSDTC_BODY_SEGMENTS = "tbsdtc-body-segments"
export const CHART_ID_TBSDTC_MUSCLE_GROUPS = "tbsdtc-muscle-groups"
export const CHART_ID_TBSDTC_UPPER_BODY_MUSCLE_GROUPS = "tbsdtc-upper-body-muscle-groups"
export const CHART_ID_TBSDTC_SHOULDERS = "tbsdtc-shoulder-mg"
export const CHART_ID_TBSDTC_CHEST = "tbsdtc-chest-mg"
export const CHART_ID_TBSDTC_BACK = "tbsdtc-back-mg"
export const CHART_ID_TBSDTC_TRICEPS = "tbsdtc-triceps-mg"
export const CHART_ID_TBSDTC_ABS = "tbsdtc-abs-mg"
export const CHART_ID_TBSDTC_LOWER_BODY_MUSCLE_GROUPS = "tbsdtc-lower-body-muscle-groups"
export const CHART_ID_TBSDTC_MOVEMENT_VARIANTS = "tbsdtc-movement-variants"
export const CHART_ID_TBSDTC_MOV_VAR_UPPER_BODY = "tbsdtc-mov-var-upper-body"
export const CHART_ID_TBSDTC_MOV_VAR_SHOULDERS = "tbsdtc-mov-var-shoulders"
export const CHART_ID_TBSDTC_MOV_VAR_CHEST = "tbsdtc-mov-var-chest"
export const CHART_ID_TBSDTC_MOV_VAR_BACK = "tbsdtc-mov-var-back"
export const CHART_ID_TBSDTC_MOV_VAR_BICEPS = "tbsdtc-mov-var-biceps"
export const CHART_ID_TBSDTC_MOV_VAR_TRICEPS = "tbsdtc-mov-var-triceps"
export const CHART_ID_TBSDTC_MOV_VAR_FOREARMS = "tbsdtc-mov-var-forearms"
export const CHART_ID_TBSDTC_MOV_VAR_ABS = "tbsdtc-mov-var-abs"
export const CHART_ID_TBSDTC_MOV_VAR_LOWER_BODY = "tbsdtc-mov-var-lower-body"
export const CHART_ID_TBSDTC_MOV_VAR_QUADS = "tbsdtc-mov-var-quads"
export const CHART_ID_TBSDTC_MOV_VAR_HAMS = "tbsdtc-mov-var-hams"
export const CHART_ID_TBSDTC_MOV_VAR_CALFS = "tbsdtc-mov-var-calfs"
export const CHART_ID_TBSDTC_MOV_VAR_GLUTES = "tbsdtc-mov-var-glutes"

export const ALL_BODY_CHART_IDS = [
    CHART_ID_BODY_WEIGHT,
    CHART_ID_ARM_SIZE,
    CHART_ID_CHEST_SIZE,
    CHART_ID_CALF_SIZE,
    CHART_ID_THIGH_SIZE,
    CHART_ID_FOREARM_SIZE,
    CHART_ID_WAIST_SIZE,
    CHART_ID_NECK_SIZE,
    CHART_ID_GLOBAL_BODY // global body chart config
]

export const ALL_STRENGTH_CHART_IDS = [
    CHART_ID_GLOBAL_STRENGTH, // global strength chart config
    CHART_ID_WLDPC_BODY_SEGMENTS, // weight lifted pie charts
    CHART_ID_WLDPC_MUSCLE_GROUPS,
    CHART_ID_WLDPC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_WLDPC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_WLDPC_SHOULDERS,
    CHART_ID_WLDPC_CHEST,
    CHART_ID_WLDPC_BACK,
    CHART_ID_WLDPC_TRICEPS,
    CHART_ID_WLDPC_ABS,
    CHART_ID_WLDPC_MOVEMENT_VARIANTS,
    CHART_ID_WLDPC_MOV_VAR_UPPER_BODY,
    CHART_ID_WLDPC_MOV_VAR_SHOULDERS,
    CHART_ID_WLDPC_MOV_VAR_CHEST,
    CHART_ID_WLDPC_MOV_VAR_BACK,
    CHART_ID_WLDPC_MOV_VAR_BICEPS,
    CHART_ID_WLDPC_MOV_VAR_TRICEPS,
    CHART_ID_WLDPC_MOV_VAR_FOREARMS,
    CHART_ID_WLDPC_MOV_VAR_ABS,
    CHART_ID_WLDPC_MOV_VAR_LOWER_BODY,
    CHART_ID_WLDPC_MOV_VAR_QUADS,
    CHART_ID_WLDPC_MOV_VAR_HAMS,
    CHART_ID_WLDPC_MOV_VAR_CALFS,
    CHART_ID_WLDPC_MOV_VAR_GLUTES,
    CHART_ID_WLTC_ALL, // aggregate weight lifted timeline charts
    CHART_ID_WLTC_BODY_SEGMENTS,
    CHART_ID_WLTC_MUSCLE_GROUPS,
    CHART_ID_WLTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_WLTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_WLTC_SHOULDERS,
    CHART_ID_WLTC_CHEST,
    CHART_ID_WLTC_BACK,
    CHART_ID_WLTC_TRICEPS,
    CHART_ID_WLTC_BICEPS,
    CHART_ID_WLTC_FOREARMS,
    CHART_ID_WLTC_ABS,
    CHART_ID_WLTC_QUADS,
    CHART_ID_WLTC_HAMS,
    CHART_ID_WLTC_GLUTES,
    CHART_ID_WLTC_CALFS,
    CHART_ID_WLTC_MOVEMENT_VARIANTS,
    CHART_ID_WLTC_MOV_VAR_UPPER_BODY,
    CHART_ID_WLTC_MOV_VAR_SHOULDERS,
    CHART_ID_WLTC_MOV_VAR_CHEST,
    CHART_ID_WLTC_MOV_VAR_BACK,
    CHART_ID_WLTC_MOV_VAR_BICEPS,
    CHART_ID_WLTC_MOV_VAR_TRICEPS,
    CHART_ID_WLTC_MOV_VAR_FOREARMS,
    CHART_ID_WLTC_MOV_VAR_ABS,
    CHART_ID_WLTC_MOV_VAR_LOWER_BODY,
    CHART_ID_WLTC_MOV_VAR_QUADS,
    CHART_ID_WLTC_MOV_VAR_HAMS,
    CHART_ID_WLTC_MOV_VAR_CALFS,
    CHART_ID_WLTC_MOV_VAR_GLUTES,
    CHART_ID_AVG_WLTC_ALL, // average weight lifted timeline charts
    CHART_ID_AVG_WLTC_BODY_SEGMENTS,
    CHART_ID_AVG_WLTC_MUSCLE_GROUPS,
    CHART_ID_AVG_WLTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_AVG_WLTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_AVG_WLTC_SHOULDERS,
    CHART_ID_AVG_WLTC_CHEST,
    CHART_ID_AVG_WLTC_BACK,
    CHART_ID_AVG_WLTC_TRICEPS,
    CHART_ID_AVG_WLTC_BICEPS,
    CHART_ID_AVG_WLTC_FOREARMS,
    CHART_ID_AVG_WLTC_ABS,
    CHART_ID_AVG_WLTC_QUADS,
    CHART_ID_AVG_WLTC_HAMS,
    CHART_ID_AVG_WLTC_GLUTES,
    CHART_ID_AVG_WLTC_CALFS,
    CHART_ID_AVG_WLTC_MOVEMENT_VARIANTS,
    CHART_ID_AVG_WLTC_MOV_VAR_UPPER_BODY,
    CHART_ID_AVG_WLTC_MOV_VAR_SHOULDERS,
    CHART_ID_AVG_WLTC_MOV_VAR_CHEST,
    CHART_ID_AVG_WLTC_MOV_VAR_BACK,
    CHART_ID_AVG_WLTC_MOV_VAR_BICEPS,
    CHART_ID_AVG_WLTC_MOV_VAR_TRICEPS,
    CHART_ID_AVG_WLTC_MOV_VAR_FOREARMS,
    CHART_ID_AVG_WLTC_MOV_VAR_ABS,
    CHART_ID_AVG_WLTC_MOV_VAR_LOWER_BODY,
    CHART_ID_AVG_WLTC_MOV_VAR_QUADS,
    CHART_ID_AVG_WLTC_MOV_VAR_HAMS,
    CHART_ID_AVG_WLTC_MOV_VAR_CALFS,
    CHART_ID_AVG_WLTC_MOV_VAR_GLUTES,
    CHART_ID_WLDTC_BODY_SEGMENTS, // distribution weight lifted timeline charts
    CHART_ID_WLDTC_MUSCLE_GROUPS,
    CHART_ID_WLDTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_WLDTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_WLDTC_SHOULDERS,
    CHART_ID_WLDTC_CHEST,
    CHART_ID_WLDTC_BACK,
    CHART_ID_WLDTC_TRICEPS,
    CHART_ID_WLDTC_ABS,
    CHART_ID_WLDTC_MOVEMENT_VARIANTS,
    CHART_ID_WLDTC_MOV_VAR_UPPER_BODY,
    CHART_ID_WLDTC_MOV_VAR_SHOULDERS,
    CHART_ID_WLDTC_MOV_VAR_CHEST,
    CHART_ID_WLDTC_MOV_VAR_BACK,
    CHART_ID_WLDTC_MOV_VAR_BICEPS,
    CHART_ID_WLDTC_MOV_VAR_TRICEPS,
    CHART_ID_WLDTC_MOV_VAR_FOREARMS,
    CHART_ID_WLDTC_MOV_VAR_ABS,
    CHART_ID_WLDTC_MOV_VAR_LOWER_BODY,
    CHART_ID_WLDTC_MOV_VAR_QUADS,
    CHART_ID_WLDTC_MOV_VAR_HAMS,
    CHART_ID_WLDTC_MOV_VAR_CALFS,
    CHART_ID_WLDTC_MOV_VAR_GLUTES
]

export const ALL_REPS_CHART_IDS = [
    CHART_ID_GLOBAL_REPS, // global reps chart config
    CHART_ID_RDPC_BODY_SEGMENTS, // reps pie charts
    CHART_ID_RDPC_MUSCLE_GROUPS,
    CHART_ID_RDPC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_RDPC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_RDPC_SHOULDERS,
    CHART_ID_RDPC_CHEST,
    CHART_ID_RDPC_BACK,
    CHART_ID_RDPC_TRICEPS,
    CHART_ID_RDPC_ABS,
    CHART_ID_RDPC_MOVEMENT_VARIANTS,
    CHART_ID_RDPC_MOV_VAR_UPPER_BODY,
    CHART_ID_RDPC_MOV_VAR_SHOULDERS,
    CHART_ID_RDPC_MOV_VAR_CHEST,
    CHART_ID_RDPC_MOV_VAR_BACK,
    CHART_ID_RDPC_MOV_VAR_BICEPS,
    CHART_ID_RDPC_MOV_VAR_TRICEPS,
    CHART_ID_RDPC_MOV_VAR_FOREARMS,
    CHART_ID_RDPC_MOV_VAR_ABS,
    CHART_ID_RDPC_MOV_VAR_LOWER_BODY,
    CHART_ID_RDPC_MOV_VAR_QUADS,
    CHART_ID_RDPC_MOV_VAR_HAMS,
    CHART_ID_RDPC_MOV_VAR_CALFS,
    CHART_ID_RDPC_MOV_VAR_GLUTES,
    CHART_ID_RTC_ALL, // aggregate reps timeline charts
    CHART_ID_RTC_BODY_SEGMENTS,
    CHART_ID_RTC_MUSCLE_GROUPS,
    CHART_ID_RTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_RTC_SHOULDERS,
    CHART_ID_RTC_CHEST,
    CHART_ID_RTC_BACK,
    CHART_ID_RTC_BICEPS,
    CHART_ID_RTC_TRICEPS,
    CHART_ID_RTC_FOREARMS,
    CHART_ID_RTC_ABS,
    CHART_ID_RTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_RTC_QUADS,
    CHART_ID_RTC_HAMS,
    CHART_ID_RTC_CALFS,
    CHART_ID_RTC_GLUTES,
    CHART_ID_RTC_MOVEMENT_VARIANTS,
    CHART_ID_RTC_MOV_VAR_UPPER_BODY,
    CHART_ID_RTC_MOV_VAR_SHOULDERS,
    CHART_ID_RTC_MOV_VAR_CHEST,
    CHART_ID_RTC_MOV_VAR_BACK,
    CHART_ID_RTC_MOV_VAR_BICEPS,
    CHART_ID_RTC_MOV_VAR_TRICEPS,
    CHART_ID_RTC_MOV_VAR_FOREARMS,
    CHART_ID_RTC_MOV_VAR_ABS,
    CHART_ID_RTC_MOV_VAR_LOWER_BODY,
    CHART_ID_RTC_MOV_VAR_QUADS,
    CHART_ID_RTC_MOV_VAR_HAMS,
    CHART_ID_RTC_MOV_VAR_CALFS,
    CHART_ID_RTC_MOV_VAR_GLUTES,
    CHART_ID_AVG_RTC_ALL, // average reps timeline charts
    CHART_ID_AVG_RTC_BODY_SEGMENTS,
    CHART_ID_AVG_RTC_MUSCLE_GROUPS,
    CHART_ID_AVG_RTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_AVG_RTC_SHOULDERS,
    CHART_ID_AVG_RTC_CHEST,
    CHART_ID_AVG_RTC_BACK,
    CHART_ID_AVG_RTC_BICEPS,
    CHART_ID_AVG_RTC_TRICEPS,
    CHART_ID_AVG_RTC_FOREARMS,
    CHART_ID_AVG_RTC_ABS,
    CHART_ID_AVG_RTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_AVG_RTC_QUADS,
    CHART_ID_AVG_RTC_HAMS,
    CHART_ID_AVG_RTC_CALFS,
    CHART_ID_AVG_RTC_GLUTES,
    CHART_ID_AVG_RTC_MOVEMENT_VARIANTS,
    CHART_ID_AVG_RTC_MOV_VAR_UPPER_BODY,
    CHART_ID_AVG_RTC_MOV_VAR_SHOULDERS,
    CHART_ID_AVG_RTC_MOV_VAR_CHEST,
    CHART_ID_AVG_RTC_MOV_VAR_BACK,
    CHART_ID_AVG_RTC_MOV_VAR_BICEPS,
    CHART_ID_AVG_RTC_MOV_VAR_TRICEPS,
    CHART_ID_AVG_RTC_MOV_VAR_FOREARMS,
    CHART_ID_AVG_RTC_MOV_VAR_ABS,
    CHART_ID_AVG_RTC_MOV_VAR_LOWER_BODY,
    CHART_ID_AVG_RTC_MOV_VAR_QUADS,
    CHART_ID_AVG_RTC_MOV_VAR_HAMS,
    CHART_ID_AVG_RTC_MOV_VAR_CALFS,
    CHART_ID_AVG_RTC_MOV_VAR_GLUTES,
    CHART_ID_RDTC_BODY_SEGMENTS, // distribution reps timeline charts
    CHART_ID_RDTC_MUSCLE_GROUPS,
    CHART_ID_RDTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_RDTC_SHOULDERS,
    CHART_ID_RDTC_CHEST,
    CHART_ID_RDTC_BACK,
    CHART_ID_RDTC_TRICEPS,
    CHART_ID_RDTC_ABS,
    CHART_ID_RDTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_RDTC_MOVEMENT_VARIANTS,
    CHART_ID_RDTC_MOV_VAR_UPPER_BODY,
    CHART_ID_RDTC_MOV_VAR_SHOULDERS,
    CHART_ID_RDTC_MOV_VAR_CHEST,
    CHART_ID_RDTC_MOV_VAR_BACK,
    CHART_ID_RDTC_MOV_VAR_BICEPS,
    CHART_ID_RDTC_MOV_VAR_TRICEPS,
    CHART_ID_RDTC_MOV_VAR_FOREARMS,
    CHART_ID_RDTC_MOV_VAR_ABS,
    CHART_ID_RDTC_MOV_VAR_LOWER_BODY,
    CHART_ID_RDTC_MOV_VAR_QUADS,
    CHART_ID_RDTC_MOV_VAR_HAMS,
    CHART_ID_RDTC_MOV_VAR_CALFS,
    CHART_ID_RDTC_MOV_VAR_GLUTES
]

export const ALL_REST_TIME_CHART_IDS = [
    CHART_ID_GLOBAL_REST_TIME, // global rest time chart config
    CHART_ID_TBSDPC_BODY_SEGMENTS, // time between sets pie charts
    CHART_ID_TBSDPC_MUSCLE_GROUPS,
    CHART_ID_TBSDPC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_TBSDPC_SHOULDERS,
    CHART_ID_TBSDPC_CHEST,
    CHART_ID_TBSDPC_BACK,
    CHART_ID_TBSDPC_TRICEPS,
    CHART_ID_TBSDPC_ABS,
    CHART_ID_TBSDPC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_TBSDPC_MOVEMENT_VARIANTS,
    CHART_ID_TBSDPC_MOV_VAR_UPPER_BODY,
    CHART_ID_TBSDPC_MOV_VAR_SHOULDERS,
    CHART_ID_TBSDPC_MOV_VAR_CHEST,
    CHART_ID_TBSDPC_MOV_VAR_BACK,
    CHART_ID_TBSDPC_MOV_VAR_BICEPS,
    CHART_ID_TBSDPC_MOV_VAR_TRICEPS,
    CHART_ID_TBSDPC_MOV_VAR_FOREARMS,
    CHART_ID_TBSDPC_MOV_VAR_ABS,
    CHART_ID_TBSDPC_MOV_VAR_LOWER_BODY,
    CHART_ID_TBSDPC_MOV_VAR_QUADS,
    CHART_ID_TBSDPC_MOV_VAR_HAMS,
    CHART_ID_TBSDPC_MOV_VAR_CALFS,
    CHART_ID_TBSDPC_MOV_VAR_GLUTES,
    CHART_ID_TBSTC_ALL, // aggregate time between sets timeline charts
    CHART_ID_TBSTC_BODY_SEGMENTS,
    CHART_ID_TBSTC_MUSCLE_GROUPS,
    CHART_ID_TBSTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_TBSTC_SHOULDERS,
    CHART_ID_TBSTC_CHEST,
    CHART_ID_TBSTC_BACK,
    CHART_ID_TBSTC_BICEPS,
    CHART_ID_TBSTC_TRICEPS,
    CHART_ID_TBSTC_FOREARMS,
    CHART_ID_TBSTC_ABS,
    CHART_ID_TBSTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_TBSTC_QUADS,
    CHART_ID_TBSTC_HAMS,
    CHART_ID_TBSTC_CALFS,
    CHART_ID_TBSTC_GLUTES,
    CHART_ID_TBSTC_MOVEMENT_VARIANTS,
    CHART_ID_TBSTC_MOV_VAR_UPPER_BODY,
    CHART_ID_TBSTC_MOV_VAR_SHOULDERS,
    CHART_ID_TBSTC_MOV_VAR_CHEST,
    CHART_ID_TBSTC_MOV_VAR_BACK,
    CHART_ID_TBSTC_MOV_VAR_BICEPS,
    CHART_ID_TBSTC_MOV_VAR_TRICEPS,
    CHART_ID_TBSTC_MOV_VAR_FOREARMS,
    CHART_ID_TBSTC_MOV_VAR_ABS,
    CHART_ID_TBSTC_MOV_VAR_LOWER_BODY,
    CHART_ID_TBSTC_MOV_VAR_QUADS,
    CHART_ID_TBSTC_MOV_VAR_HAMS,
    CHART_ID_TBSTC_MOV_VAR_CALFS,
    CHART_ID_TBSTC_MOV_VAR_GLUTES,
    CHART_ID_AVG_TBSTC_ALL, // average time between sets timeline charts
    CHART_ID_AVG_TBSTC_BODY_SEGMENTS,
    CHART_ID_AVG_TBSTC_MUSCLE_GROUPS,
    CHART_ID_AVG_TBSTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_AVG_TBSTC_SHOULDERS,
    CHART_ID_AVG_TBSTC_CHEST,
    CHART_ID_AVG_TBSTC_BACK,
    CHART_ID_AVG_TBSTC_BICEPS,
    CHART_ID_AVG_TBSTC_TRICEPS,
    CHART_ID_AVG_TBSTC_FOREARMS,
    CHART_ID_AVG_TBSTC_ABS,
    CHART_ID_AVG_TBSTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_AVG_TBSTC_QUADS,
    CHART_ID_AVG_TBSTC_HAMS,
    CHART_ID_AVG_TBSTC_CALFS,
    CHART_ID_AVG_TBSTC_GLUTES,
    CHART_ID_AVG_TBSTC_MOVEMENT_VARIANTS,
    CHART_ID_AVG_TBSTC_MOV_VAR_UPPER_BODY,
    CHART_ID_AVG_TBSTC_MOV_VAR_SHOULDERS,
    CHART_ID_AVG_TBSTC_MOV_VAR_CHEST,
    CHART_ID_AVG_TBSTC_MOV_VAR_BACK,
    CHART_ID_AVG_TBSTC_MOV_VAR_BICEPS,
    CHART_ID_AVG_TBSTC_MOV_VAR_TRICEPS,
    CHART_ID_AVG_TBSTC_MOV_VAR_FOREARMS,
    CHART_ID_AVG_TBSTC_MOV_VAR_ABS,
    CHART_ID_AVG_TBSTC_MOV_VAR_LOWER_BODY,
    CHART_ID_AVG_TBSTC_MOV_VAR_QUADS,
    CHART_ID_AVG_TBSTC_MOV_VAR_HAMS,
    CHART_ID_AVG_TBSTC_MOV_VAR_CALFS,
    CHART_ID_AVG_TBSTC_MOV_VAR_GLUTES,
    CHART_ID_TBSDTC_BODY_SEGMENTS, // distribution time between sets timeline charts
    CHART_ID_TBSDTC_MUSCLE_GROUPS,
    CHART_ID_TBSDTC_UPPER_BODY_MUSCLE_GROUPS,
    CHART_ID_TBSDTC_SHOULDERS,
    CHART_ID_TBSDTC_CHEST,
    CHART_ID_TBSDTC_BACK,
    CHART_ID_TBSDTC_TRICEPS,
    CHART_ID_TBSDTC_ABS,
    CHART_ID_TBSDTC_LOWER_BODY_MUSCLE_GROUPS,
    CHART_ID_TBSDTC_MOVEMENT_VARIANTS,
    CHART_ID_TBSDTC_MOV_VAR_UPPER_BODY,
    CHART_ID_TBSDTC_MOV_VAR_SHOULDERS,
    CHART_ID_TBSDTC_MOV_VAR_CHEST,
    CHART_ID_TBSDTC_MOV_VAR_BACK,
    CHART_ID_TBSDTC_MOV_VAR_BICEPS,
    CHART_ID_TBSDTC_MOV_VAR_TRICEPS,
    CHART_ID_TBSDTC_MOV_VAR_FOREARMS,
    CHART_ID_TBSDTC_MOV_VAR_ABS,
    CHART_ID_TBSDTC_MOV_VAR_LOWER_BODY,
    CHART_ID_TBSDTC_MOV_VAR_QUADS,
    CHART_ID_TBSDTC_MOV_VAR_HAMS,
    CHART_ID_TBSDTC_MOV_VAR_CALFS,
    CHART_ID_TBSDTC_MOV_VAR_GLUTES
]

export const AGGREGATE_BY_OPTIONS = [
    { value: 1, name: "by day" },
    { value: 7, name: "by week" },
    { value: 30, name: "by month" },
    { value: 90, name: "by quarter" },
    { value: 180, name: "by half-year" },
    { value: 365, name: "by year" }
]

export const makeTimelineChartConfigState = (id, name = null, subName = null, stroke = null, isPercentage = false, isUom = false) => ({
    id: id,
    isTimelineChart: true,
    name: name,
    subName: subName,
    stroke: stroke,
    isUom: isUom,
    isPercentage: isPercentage,
    startDate: null,
    endDate: null,
    boundedEndDate: false,
    aggregateBy: null,
    animate: false,
    manuallyConfigured: false
})

export const makePieChartConfigState = (id, name, subName) => ({
    id: id,
    isTimelineChart: false,
    name: name,
    subName,
    suppressPieSliceLabels: false,
    startDate: null,
    endDate: null,
    boundedEndDate: false,
    animate: false,
    manuallyConfigured: false
})

export const defaultAggregateBy = daysFrom => {
    if (daysFrom >= 4380) { // 12 years worth of days
        return 365
    }
    if (daysFrom >= 2190) { // 6 years worth of days
        return 180
    }
    if (daysFrom >= 1095) { // 3 years worth of days
        return 90
    }
    if (daysFrom >= 540) {  // 1.5 years...
        return 30
    }
    if (daysFrom >= 93) {  // 3 months...
        return 7
    }
    return 1
}

export const ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER = 0

const makeAddToFn = () => (dataSource, entityKey, value, loggedAt) => {
    if (value) { // short-circuit if nil (this would only occur for BMLs; not Sets)
        const dataSourceData = dataSource[entityKey]
        if (dataSourceData) {
            if (loggedAt) { // if loggedAt is provided, then valsDict is assumed to be a time series dictionary
                const timeSeries = dataSourceData.timeSeries
                // Each entry in the timeSeries array will be a 4-tuple.  The first slot
                // being the aggregate-summed value.  And the 2nd slot will be a percentage value and
                // the 3rd slot being a count.  The 4th slot will be an average value.
                // At the time of this block being invoked, the percentage and avg values are not
                // knowable yet, so we can't set it here.  A second pass through the sets/bmls
                // will be needed in order to set the percentage/avg value slots.
                let valuePercentTuple = timeSeries[loggedAt]
                if (valuePercentTuple) {
                    valuePercentTuple.aggregateValue = valuePercentTuple.aggregateValue + value
                    valuePercentTuple.count = valuePercentTuple.count + 1
                } else {
                    valuePercentTuple = { aggregateValue: value, percentage: 0, count: 1 }
                    timeSeries[loggedAt] = valuePercentTuple
                }
            } else { // assumed to be pie-chart style aggregate data
                dataSourceData.aggregateValue = dataSourceData.aggregateValue + value
            }
        }
    }
}

const makeAggregateDataPercentageCalculator = () => dataSource => {
    const dataSourcesArray = _.values(dataSource)
    let totalVal = 0
    // calculate total val
    for (let i = 0; i < dataSourcesArray.length; i++) {
        totalVal += dataSourcesArray[i].aggregateValue
    }
    // 2nd pass to fill percentages
    for (let i = 0; i < dataSourcesArray.length; i++) {
        dataSourcesArray[i].percentage = dataSourcesArray[i].aggregateValue / totalVal
    }
}

const makeTimeSeriesHolePluggerAndPercentageCalculator = () => (dataSource, loggedAt) => {
    const dataSourcesArray = _.values(dataSource)
    // fill empty holes with "zeros" and calculate total val
    let totalVal = 0
    for (let i = 0; i < dataSourcesArray.length; i++) {
        const timeSeries = dataSourcesArray[i].timeSeries
        let valuePercentTuple = timeSeries[loggedAt]
        if (valuePercentTuple) {
            totalVal += valuePercentTuple.aggregateValue
        } else {
            valuePercentTuple = { aggregateValue: 0, percentage: 0, count: 0, value: 0 }
            timeSeries[loggedAt] = valuePercentTuple
        }
    }
    // 2nd pass to fill percentages and average values
    if (totalVal > 0) {
        for (let i = 0; i < dataSourcesArray.length; i++) {
            const timeSeries = dataSourcesArray[i].timeSeries
            let valuePercentTuple = timeSeries[loggedAt]
            valuePercentTuple.percentage = (valuePercentTuple.aggregateValue / totalVal)
            if (valuePercentTuple.count > 0) {
                valuePercentTuple.value = (valuePercentTuple.aggregateValue / valuePercentTuple.count)
            }
        }
    }
}

const initialSingleEntityTimeSeriesDataSourceMaker = () => name => {
    const dataSource = {}
    dataSource[ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER] = { timeSeries: {}, name: name, entityKey: ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER }
    return dataSource
}

const keyForMovementAndVariantIds = (movementId, variantId) => movementId + "-" + variantId

const strengthDataCacheKey = (onOrAfterLoggedAt, onOrBeforeLoggedAt, fetchMode, userSettings) => "chart_strength_data_" + onOrAfterLoggedAt + "_" + onOrBeforeLoggedAt + "_" + fetchMode + "_" + userSettings.payload["usersettings/weight-uom"]

export const cachingMakeChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants, fetchMode, onOrAfterLoggedAt, onOrBeforeLoggedAt, chartCache, localCache, logging) => {
    const cacheKey = strengthDataCacheKey(onOrAfterLoggedAt, onOrBeforeLoggedAt, fetchMode, userSettings)
    let strengthData = chartCache[cacheKey]
    if (!strengthData) {
        strengthData = localCache[cacheKey]
        if (strengthData) {
            if (logging) { console.log("local cache hit for key: [" + cacheKey + "]") }
        } else {
            if (logging) { console.log("local cache miss for key: [" + cacheKey + "]") }
            strengthData = makeChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants, fetchMode)
            localCache[cacheKey] = strengthData
        }
        if (logging) { console.log("cache miss for key: [" + cacheKey + "]") }
        strengthData.cacheMeta = { cacheMiss: true, cacheKey: cacheKey }
    } else {
        if (logging) { console.log("cache hit for key: [" + cacheKey + "]") }
    }
    return strengthData
}

const bodyDataCacheKey = (onOrAfterLoggedAt, onOrBeforeLoggedAt, userSettings) => "chart_body_data_" + onOrAfterLoggedAt + "_" + onOrBeforeLoggedAt + "_" + userSettings.payload["usersettings/weight-uom"] + "_" + userSettings.payload["usersettings/size-uom"]

export const cachingChartBodyData = (bmlsArrayAscending, userSettings, onOrAfterLoggedAt, onOrBeforeLoggedAt, chartCache, localCache, logging) => {
    const cacheKey = bodyDataCacheKey(onOrAfterLoggedAt, onOrBeforeLoggedAt, userSettings)
    let bodyData = chartCache[cacheKey]
    if (!bodyData) {
        if (logging) { console.log("cache miss for key: [" + cacheKey + "]") }
        bodyData = localCache[cacheKey]
        if (bodyData) {
            if (logging) { console.log("local cache hit for key: [" + cacheKey + "]") }
        } else {
            if (logging) { console.log("local cache miss for key: [" + cacheKey + "]") }
            bodyData = chartBodyData(bmlsArrayAscending, userSettings)
            localCache[cacheKey] = bodyData
        }
        bodyData.cacheMeta = { cacheMiss: true, cacheKey: cacheKey }
    } else {
        if (logging) { console.log("cache hit for key: [" + cacheKey + "]") }
    }
    return bodyData
}

export const FETCH_MODE_WEIGHT_LIFTED_LINE = 1
export const FETCH_MODE_WEIGHT_LIFTED_DIST = 2
export const FETCH_MODE_REPS_LINE = 3
export const FETCH_MODE_REPS_DIST = 4
export const FETCH_MODE_TIME_BETWEEN_SETS_LINE = 5
export const FETCH_MODE_TIME_BETWEEN_SETS_DIST = 6
export const FETCH_MODE_WEIGHT_LIFTED_CROSS_SECTION = 7
export const FETCH_MODE_REPS_CROSS_SECTION = 8
export const FETCH_MODE_TIME_BETWEEN_SETS_CROSS_SECTION = 9

export const makeChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants, fetchMode) => {
    switch (fetchMode) {
    case FETCH_MODE_WEIGHT_LIFTED_CROSS_SECTION:
        return makeWeightLiftedCrossSectionChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    case FETCH_MODE_REPS_CROSS_SECTION:
        return makeRepsCrossSectionChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    case FETCH_MODE_TIME_BETWEEN_SETS_CROSS_SECTION:
        return makeTimeBetweenSetsCrossSectionChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    case FETCH_MODE_WEIGHT_LIFTED_LINE:
        return makeWeightLiftedLineChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    case FETCH_MODE_WEIGHT_LIFTED_DIST:
        return makeWeightLiftedDistChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    case FETCH_MODE_REPS_LINE:
        return makeRepsLineChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    case FETCH_MODE_REPS_DIST:
        return makeRepsDistChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    case FETCH_MODE_TIME_BETWEEN_SETS_LINE:
        return makeTimeBetweenSetsLineChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    case FETCH_MODE_TIME_BETWEEN_SETS_DIST:
        return makeTimeBetweenSetsDistChartStrengthData(setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants)
    }
    return null
}

const makeMakeInitBsPieChartDataSourceFn = () => (dataSource, bodySegment) => {
    const id = bodySegment.payload["bodysegment/id"]
    dataSource[id] = { aggregateValue: 0, percentage: 0, name: bodySegment.payload["bodysegment/name"], entityKey: id }
}

const makeAbbrevMgFn = () => muscleGroup => {
    const abbrevName = muscleGroup.payload["musclegroup/abbrev-name"]
    return abbrevName ? abbrevName : muscleGroup.payload["musclegroup/name"]
}

const makeInitMgPieChartDataSourceFn = abbrevMg => (dataSource, mg) => {
    const id = mg.payload["musclegroup/id"]
    dataSource[id] = { aggregateValue: 0, percentage: 0, name: abbrevMg(mg), entityKey: id }
}

const makeAbbrevMuscleFn = () => muscle => {
    const abbrevName = muscle.payload["muscle/abbrev-canonical-name"]
    return abbrevName ? abbrevName : muscle.payload["muscle/canonical-name"]
}

const makeInitMuscleTimeSeriesDataSourceFn = abbrevMuscle => (dataSource, muscle) => {
    const id = muscle.payload["muscle/id"]
    dataSource[id] = { timeSeries: {}, name: abbrevMuscle(muscle), entityKey: id }
}

const makeInitMusclePieChartDataSourceFn = abbrevMuscle => (dataSource, muscle) => {
    const id = muscle.payload["muscle/id"]
    dataSource[id] = { aggregateValue: 0, percentage: 0, name: abbrevMuscle(muscle), entityKey: id }
}

const makeInitBsTimeSeriesDataSourceFn = () => (dataSource, bodySegment) => {
    const id = bodySegment.payload["bodysegment/id"]
    dataSource[id] = { timeSeries: {}, name: bodySegment.payload["bodysegment/name"], entityKey: id }
}

const makeInitMgTimeSeriesDataSourceFn = abbrevMg => (dataSource, mg) => {
    const id = mg.payload["musclegroup/id"]
    dataSource[id] = { timeSeries: {}, name: abbrevMg(mg), entityKey: id }
}

const makeAbbrevMvFn= () => mv => {
    const abbrevName = mv.payload["movementvariant/abbrev-name"]
    return abbrevName ? abbrevName : mv.payload["movementvariant/name"]
}

const makeInitMvPieChartDataSourceFn = abbrevMv => (dataSource, mv) => {
    const id = mv.payload["movementvariant/id"]
    dataSource[id] = { aggregateValue: 0, percentage: 0, name: abbrevMv(mv), entityKey: id }
}

const makeInitMvTimeSeriesDataSourceFn = abbrevMv => (dataSource, mv) => {
    const id = mv.payload["movementvariant/id"]
    dataSource[id] = { timeSeries: {}, name: abbrevMv(mv), entityKey: id }
}

export const makeTimeBetweenSetsDistChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const doStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsPieChartDataSource = makeMakeInitBsPieChartDataSourceFn()
    csd.totalTimeBetweenSetsSameMovByBodySegment = {}
    for (let i = 0; i < bodySegmentsArray.length; i++) {
        initBsPieChartDataSource(csd.totalTimeBetweenSetsSameMovByBodySegment, bodySegmentsArray[i])
    }
    const abbrevMg = makeAbbrevMgFn()
    const initMgPieChartDataSource = makeInitMgPieChartDataSourceFn(abbrevMg)
    csd.totalTimeBetweenSetsSameMovByMuscleGroup = {}
    csd.totalTimeBetweenSetsSameMovByUpperBodySegment = {}
    csd.totalTimeBetweenSetsSameMovByLowerBodySegment = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgPieChartDataSource(csd.totalTimeBetweenSetsSameMovByMuscleGroup, mg)
        switch (bodySegmentId) {
        case utils.UPPER_BODY_SEGMENT_ID:
            initMgPieChartDataSource(csd.totalTimeBetweenSetsSameMovByUpperBodySegment, mg)
            break;
        case utils.LOWER_BODY_SEGMENT_ID:
            initMgPieChartDataSource(csd.totalTimeBetweenSetsSameMovByLowerBodySegment, mg)
            break;
        }
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMusclePieChartDataSource = makeInitMusclePieChartDataSourceFn(abbrevMuscle)
    csd.totalTimeBetweenSetsSameMovByShoulderMg = {}
    csd.totalTimeBetweenSetsSameMovByBackMg = {}
    csd.totalTimeBetweenSetsSameMovByTricepsMg = {}
    csd.totalTimeBetweenSetsSameMovByAbsMg = {}
    csd.totalTimeBetweenSetsSameMovByChestMg = {}
    for (let i = 0; i < musclesArray.length; i++) {
        const muscle = musclesArray[i]
        const mgId = muscle.payload["muscle/muscle-group-id"]
        switch (mgId) {
        case utils.SHOULDER_MG_ID:
            initMusclePieChartDataSource(csd.totalTimeBetweenSetsSameMovByShoulderMg, muscle);
            break;
        case utils.BACK_MG_ID:
            initMusclePieChartDataSource(csd.totalTimeBetweenSetsSameMovByBackMg, muscle);
            break;
        case utils.TRICEP_MG_ID:
            initMusclePieChartDataSource(csd.totalTimeBetweenSetsSameMovByTricepsMg, muscle);
            break;
        case utils.ABS_MG_ID:
            initMusclePieChartDataSource(csd.totalTimeBetweenSetsSameMovByAbsMg, muscle);
            break;
        case utils.CHEST_MG_ID:
            initMusclePieChartDataSource(csd.totalTimeBetweenSetsSameMovByChestMg, muscle);
            break;
        }
    }
    const abbrevMv = makeAbbrevMvFn()
    const initMvPieChartDataSource = makeInitMvPieChartDataSourceFn(abbrevMv)
    csd.totalTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalUpperBodyTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalShoulderTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalBackTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalBicepsTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalTricepsTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalForearmsTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalAbsTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalChestTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalLowerBodyTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalQuadsTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalHamsTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalCalfsTimeBetweenSetsSameMovByMovementVariant = {}
    csd.totalGlutesTimeBetweenSetsSameMovByMovementVariant = {}
    for (let i = 0; i < movementVariantsArray.length; i++) {
        const variant = movementVariantsArray[i]
        // initialize time-between-sets pie chart data
        initMvPieChartDataSource(csd.totalTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalUpperBodyTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalShoulderTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalBackTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalBicepsTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalTricepsTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalForearmsTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalAbsTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalChestTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalLowerBodyTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalQuadsTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalHamsTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalCalfsTimeBetweenSetsSameMovByMovementVariant, variant)
        initMvPieChartDataSource(csd.totalGlutesTimeBetweenSetsSameMovByMovementVariant, variant)
    }
    csd.timeBetweenSetsCount = 0
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        let timeBetweenSetsSameMov = null
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        let nextSet = null
        let nextSetMovementId = null
        let nextSetVariantId = null
        if (i + 1 < numSets) {
            nextSet = setsArrayAscending[i + 1]
            nextSetMovementId = nextSet.payload["set/movement-id"]
            nextSetVariantId = nextSet.payload["set/movement-variant-id"]
        }
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        if (nextSet) {
            const nextLoggedAtMoment = moment(nextSet.payload["set/logged-at"])
            const secondsDiff = nextLoggedAtMoment.diff(loggedAtMoment, 'seconds')
            if (secondsDiff < utils.SECONDS_IN_HOUR && // don't count contiguous sets from different workouts
                secondsDiff > 0 && // if the diff is zero, then, well, something is fishy/wrong
                !set.payload["set/ignore-time"] && // obviously, right?
                !nextSet.payload["set/ignore-time"]) {
                if (setMovementId == nextSetMovementId) { // we're in the same movement
                    if (setVariantId == nextSetVariantId) { // and the same variant
                        timeBetweenSetsSameMov = secondsDiff
                    } else { // we'll consider this a mov-transition too
                        // do nothing for now...maybe add functionality in future release
                    }
                } else { // we'll consider this a mov-transition
                    // do nothing for now...maybe add functionality in future release
                }
            }
        }
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        let primaryMusclesTimeBetweenSets = null
        let secondaryMusclesTimeBetweenSets = null
        if (timeBetweenSetsSameMov) {
            if (secondaryMuscleIdsCount > 0) {
                primaryMusclesTimeBetweenSets = timeBetweenSetsSameMov * utils.PRIMARY_MUSCLE_PERCENTAGE
            } else {
                primaryMusclesTimeBetweenSets = timeBetweenSetsSameMov
            }
            secondaryMusclesTimeBetweenSets = timeBetweenSetsSameMov - primaryMusclesTimeBetweenSets
            addTo(csd.totalTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeBetweenSetsSameMov, null)
        }
        const primaryMusclesCount = primaryMuscleIds.length
        let perPrimaryMuscleTimeBetweenSets = null
        if (primaryMusclesTimeBetweenSets) {
            perPrimaryMuscleTimeBetweenSets = primaryMusclesTimeBetweenSets / primaryMusclesCount
        }
        let perSecondaryMuscleTimeBetweenSets = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            if (secondaryMusclesTimeBetweenSets) {
                perSecondaryMuscleTimeBetweenSets = secondaryMusclesTimeBetweenSets / secondaryMusclesCount
            }
        }
        const tallyTimeBetweenSets = (muscleId, timeToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.totalTimeBetweenSetsSameMovByChestMg,          muscleId,      timeToAdd, null)
            addTo(csd.totalTimeBetweenSetsSameMovByTricepsMg,        muscleId,      timeToAdd, null)
            addTo(csd.totalTimeBetweenSetsSameMovByAbsMg,            muscleId,      timeToAdd, null)
            addTo(csd.totalTimeBetweenSetsSameMovByBackMg,           muscleId,      timeToAdd, null)
            addTo(csd.totalTimeBetweenSetsSameMovByShoulderMg,       muscleId,      timeToAdd, null)
            addTo(csd.totalTimeBetweenSetsSameMovByMuscleGroup,      muscleGroupId, timeToAdd, null)
            addTo(csd.totalTimeBetweenSetsSameMovByBodySegment,      bodySegmentId, timeToAdd, null)
            addTo(csd.totalTimeBetweenSetsSameMovByUpperBodySegment, muscleGroupId, timeToAdd, null)
            addTo(csd.totalTimeBetweenSetsSameMovByLowerBodySegment, muscleGroupId, timeToAdd, null)
            switch (bodySegmentId) {
            case utils.UPPER_BODY_SEGMENT_ID:
                addTo(csd.totalUpperBodyTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break;
            case utils.LOWER_BODY_SEGMENT_ID:
                addTo(csd.totalLowerBodyTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break;
            }
            switch (muscleGroupId) {
            case utils.SHOULDER_MG_ID:
                addTo(csd.totalShoulderTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.BACK_MG_ID:
                addTo(csd.totalBackTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.TRICEP_MG_ID:
                addTo(csd.totalTricepsTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.BICEPS_MG_ID:
                addTo(csd.totalBicepsTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.FOREARMS_MG_ID:
                addTo(csd.totalForearmsTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.ABS_MG_ID:
                addTo(csd.totalAbsTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.CHEST_MG_ID:
                addTo(csd.totalChestTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.QUADRICEPS_MG_ID:
                addTo(csd.totalQuadsTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.HAMSTRINGS_MG_ID:
                addTo(csd.totalHamsTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.CALVES_MG_ID:
                addTo(csd.totalCalfsTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            case utils.GLUTES_MG_ID:
                addTo(csd.totalGlutesTimeBetweenSetsSameMovByMovementVariant, movementVariantId, timeToAdd, null)
                break
            }
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            if (perPrimaryMuscleTimeBetweenSets) {
                tallyTimeBetweenSets(primaryMuscleId, perPrimaryMuscleTimeBetweenSets)
            }
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            if (perSecondaryMuscleTimeBetweenSets) {
                tallyTimeBetweenSets(secondaryMuscleId, perSecondaryMuscleTimeBetweenSets)
            }
        }
    }
    const doEnd = performance.now()
    console.log("chart-utils, time between sets dist chart data took: " + (doEnd - doStart) + " ms.")
    return csd
}

export const makeTimeBetweenSetsLineChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const doStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const makeInitialSingleEntityTimeSeriesDataSource = initialSingleEntityTimeSeriesDataSourceMaker()
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsTimeSeriesDataSource = makeInitBsTimeSeriesDataSourceFn()
    csd.timeBetweenSetsSameMovTimeSeries = makeInitialSingleEntityTimeSeriesDataSource("Total Time Spent Between Sets")
    csd.timeBetweenSetsSameMovByBodySegmentTimeSeries = {}
    for (let i = 0; i < bodySegmentsArray.length; i++) {
        initBsTimeSeriesDataSource(csd.timeBetweenSetsSameMovByBodySegmentTimeSeries, bodySegmentsArray[i])
    }
    const abbrevMg = makeAbbrevMgFn()
    const initMgTimeSeriesDataSource = makeInitMgTimeSeriesDataSourceFn(abbrevMg)
    csd.timeBetweenSetsSameMovByMuscleGroupTimeSeries = {}
    csd.timeBetweenSetsSameMovByUpperBodySegmentTimeSeries = {}
    csd.timeBetweenSetsSameMovByLowerBodySegmentTimeSeries = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgTimeSeriesDataSource(csd.timeBetweenSetsSameMovByMuscleGroupTimeSeries, mg)
        switch (bodySegmentId) {
        case utils.UPPER_BODY_SEGMENT_ID:
            initMgTimeSeriesDataSource(csd.timeBetweenSetsSameMovByUpperBodySegmentTimeSeries, mg)
            break;
        case utils.LOWER_BODY_SEGMENT_ID:
            initMgTimeSeriesDataSource(csd.timeBetweenSetsSameMovByLowerBodySegmentTimeSeries, mg)
            break;
        }
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMuscleTimeSeriesDataSource = makeInitMuscleTimeSeriesDataSourceFn(abbrevMuscle)
    csd.timeBetweenSetsSameMovByShoulderMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByBackMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByTricepsMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByBicepsMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByForearmsMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByAbsMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByQuadsMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByHamsMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByCalfsMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByGlutesMgTimeSeries = {}
    csd.timeBetweenSetsSameMovByChestMgTimeSeries = {}
    for (let i = 0; i < musclesArray.length; i++) {
        const muscle = musclesArray[i]
        const mgId = muscle.payload["muscle/muscle-group-id"]
        switch (mgId) {
        case utils.SHOULDER_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByShoulderMgTimeSeries, muscle);
            break;
        case utils.BACK_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByBackMgTimeSeries, muscle);
            break;
        case utils.BICEPS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByBicepsMgTimeSeries, muscle);
            break;
        case utils.TRICEP_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByTricepsMgTimeSeries, muscle);
            break;
        case utils.FOREARMS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByForearmsMgTimeSeries, muscle);
            break;
        case utils.ABS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByAbsMgTimeSeries, muscle);
            break;
        case utils.QUADRICEPS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByQuadsMgTimeSeries, muscle);
            break;
        case utils.HAMSTRINGS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByHamsMgTimeSeries, muscle);
            break;
        case utils.CALVES_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByCalfsMgTimeSeries, muscle);
            break;
        case utils.GLUTES_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByGlutesMgTimeSeries, muscle);
            break;
        case utils.CHEST_MG_ID:
            initMuscleTimeSeriesDataSource(csd.timeBetweenSetsSameMovByChestMgTimeSeries, muscle);
            break;
        }
    }
    const abbrevMv = makeAbbrevMvFn()
    const initMvTimeSeriesDataSource = makeInitMvTimeSeriesDataSourceFn(abbrevMv)
    csd.timeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.upperBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.shoulderTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.backTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.bicepsTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.tricepsTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.forearmsTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.absTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.chestTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.lowerBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.quadsTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.hamsTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.calfsTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    csd.glutesTimeBetweenSetsSameMovByMovementVariantTimeSeries = {}
    for (let i = 0; i < movementVariantsArray.length; i++) {
        const variant = movementVariantsArray[i]
        // initialize time-between-sets timeline data
        initMvTimeSeriesDataSource(csd.timeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.upperBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.shoulderTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.backTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.bicepsTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.tricepsTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.forearmsTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.absTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.chestTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.lowerBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.quadsTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.hamsTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.calfsTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.glutesTimeBetweenSetsSameMovByMovementVariantTimeSeries, variant);
    }
    csd.timeBetweenSetsCount = 0
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        let timeBetweenSetsSameMov = null
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        let nextSet = null
        let nextSetMovementId = null
        let nextSetVariantId = null
        if (i + 1 < numSets) {
            nextSet = setsArrayAscending[i + 1]
            nextSetMovementId = nextSet.payload["set/movement-id"]
            nextSetVariantId = nextSet.payload["set/movement-variant-id"]
        }
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        if (nextSet) {
            const nextLoggedAtMoment = moment(nextSet.payload["set/logged-at"])
            const secondsDiff = nextLoggedAtMoment.diff(loggedAtMoment, 'seconds')
            if (secondsDiff < utils.SECONDS_IN_HOUR && // don't count contiguous sets from different workouts
                secondsDiff > 0 && // if the diff is zero, then, well, something is fishy/wrong
                !set.payload["set/ignore-time"] && // obviously, right?
                !nextSet.payload["set/ignore-time"]) {
                if (setMovementId == nextSetMovementId) { // we're in the same movement
                    if (setVariantId == nextSetVariantId) { // and the same variant
                        timeBetweenSetsSameMov = secondsDiff
                    } else { // we'll consider this a mov-transition too
                        // do nothing for now...maybe add functionality in future release
                    }
                } else { // we'll consider this a mov-transition
                    // do nothing for now...maybe add functionality in future release
                }
            }
        }
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        let primaryMusclesTimeBetweenSets = null
        let secondaryMusclesTimeBetweenSets = null
        if (timeBetweenSetsSameMov) {
            if (secondaryMuscleIdsCount > 0) {
                primaryMusclesTimeBetweenSets = timeBetweenSetsSameMov * utils.PRIMARY_MUSCLE_PERCENTAGE
            } else {
                primaryMusclesTimeBetweenSets = timeBetweenSetsSameMov
            }
            secondaryMusclesTimeBetweenSets = timeBetweenSetsSameMov - primaryMusclesTimeBetweenSets
            addTo(csd.timeBetweenSetsSameMovTimeSeries, ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER, timeBetweenSetsSameMov, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByMovementVariantTimeSeries,  movementVariantId, timeBetweenSetsSameMov, loggedAt)
        }
        const primaryMusclesCount = primaryMuscleIds.length
        let perPrimaryMuscleTimeBetweenSets = null
        if (primaryMusclesTimeBetweenSets) {
            perPrimaryMuscleTimeBetweenSets = primaryMusclesTimeBetweenSets / primaryMusclesCount
        }
        let perSecondaryMuscleTimeBetweenSets = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            if (secondaryMusclesTimeBetweenSets) {
                perSecondaryMuscleTimeBetweenSets = secondaryMusclesTimeBetweenSets / secondaryMusclesCount
            }
        }
        const tallyTimeBetweenSets = (muscleId, timeToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.timeBetweenSetsSameMovByChestMgTimeSeries,          muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByTricepsMgTimeSeries,        muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByBicepsMgTimeSeries,         muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByForearmsMgTimeSeries,       muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByAbsMgTimeSeries,            muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByQuadsMgTimeSeries,          muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByHamsMgTimeSeries,           muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByCalfsMgTimeSeries,          muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByGlutesMgTimeSeries,         muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByBackMgTimeSeries,           muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByShoulderMgTimeSeries,       muscleId,      timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByMuscleGroupTimeSeries,      muscleGroupId, timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByBodySegmentTimeSeries,      bodySegmentId, timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByUpperBodySegmentTimeSeries, muscleGroupId, timeToAdd, loggedAt)
            addTo(csd.timeBetweenSetsSameMovByLowerBodySegmentTimeSeries, muscleGroupId, timeToAdd, loggedAt)
            switch (bodySegmentId) {
            case utils.UPPER_BODY_SEGMENT_ID:
                addTo(csd.upperBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.LOWER_BODY_SEGMENT_ID:
                addTo(csd.lowerBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            }
            switch (muscleGroupId) {
            case utils.SHOULDER_MG_ID:
                addTo(csd.shoulderTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.BACK_MG_ID:
                addTo(csd.backTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.BICEPS_MG_ID:
                addTo(csd.bicepsTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.TRICEP_MG_ID:
                addTo(csd.tricepsTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.FOREARMS_MG_ID:
                addTo(csd.forearmsTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.ABS_MG_ID:
                addTo(csd.absTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.CHEST_MG_ID:
                addTo(csd.chestTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.QUADRICEPS_MG_ID:
                addTo(csd.quadsTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.HAMSTRINGS_MG_ID:
                addTo(csd.hamsTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.CALVES_MG_ID:
                addTo(csd.calfsTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            case utils.GLUTES_MG_ID:
                addTo(csd.glutesTimeBetweenSetsSameMovByMovementVariantTimeSeries, movementVariantId, timeToAdd, loggedAt)
                break
            }
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            if (perPrimaryMuscleTimeBetweenSets) {
                tallyTimeBetweenSets(primaryMuscleId, perPrimaryMuscleTimeBetweenSets)
            }
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            if (perSecondaryMuscleTimeBetweenSets) {
                tallyTimeBetweenSets(secondaryMuscleId, perSecondaryMuscleTimeBetweenSets)
            }
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    // Hole plugger for time series data
    ////////////////////////////////////////////////////////////////////////////
    const plugHolesAndCalcPercentages = makeTimeSeriesHolePluggerAndPercentageCalculator()
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const loggedAt = set.payload["set/logged-at"]
        // plug holes in 'time between sets' entity-dict containers
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByMuscleGroupTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByUpperBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByLowerBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByShoulderMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByBackMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByAbsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByQuadsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByHamsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByCalfsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByGlutesMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByChestMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByBicepsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByTricepsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByForearmsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.upperBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.shoulderTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.backTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.bicepsTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.tricepsTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.forearmsTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.absTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.chestTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.lowerBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.quadsTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.hamsTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.calfsTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.glutesTimeBetweenSetsSameMovByMovementVariantTimeSeries, loggedAt)
    }
    const doEnd = performance.now()
    console.log("chart-utils, time between sets line chart data took: " + (doEnd - doStart) + " ms.")
    return csd
}

export const makeRepsDistChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const doStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsPieChartDataSource = makeMakeInitBsPieChartDataSourceFn()
    csd.totalRepsByBodySegment = {}
    for (let i = 0; i < bodySegmentsArray.length; i++) {
        initBsPieChartDataSource(csd.totalRepsByBodySegment, bodySegmentsArray[i])
    }
    const abbrevMg = makeAbbrevMgFn()
    const initMgPieChartDataSource = makeInitMgPieChartDataSourceFn(abbrevMg)
    csd.totalRepsByMuscleGroup = {}
    csd.totalRepsByUpperBodySegment = {}
    csd.totalRepsByLowerBodySegment = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgPieChartDataSource(csd.totalRepsByMuscleGroup, mg)
        switch (bodySegmentId) {
        case utils.UPPER_BODY_SEGMENT_ID:
            initMgPieChartDataSource(csd.totalRepsByUpperBodySegment, mg)
            break;
        case utils.LOWER_BODY_SEGMENT_ID:
            initMgPieChartDataSource(csd.totalRepsByLowerBodySegment, mg)
            break;
        }
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMusclePieChartDataSource = makeInitMusclePieChartDataSourceFn(abbrevMuscle)
    csd.totalRepsByShoulderMg = {}
    csd.totalRepsByBackMg = {}
    csd.totalRepsByTricepsMg = {}
    csd.totalRepsByAbsMg = {}
    csd.totalRepsByChestMg = {}
    for (let i = 0; i < musclesArray.length; i++) {
        const muscle = musclesArray[i]
        const mgId = muscle.payload["muscle/muscle-group-id"]
        switch (mgId) {
        case utils.SHOULDER_MG_ID:
            initMusclePieChartDataSource(csd.totalRepsByShoulderMg, muscle);
            break;
        case utils.BACK_MG_ID:
            initMusclePieChartDataSource(csd.totalRepsByBackMg, muscle);
            break;
        case utils.TRICEP_MG_ID:
            initMusclePieChartDataSource(csd.totalRepsByTricepsMg, muscle);
            break;
        case utils.ABS_MG_ID:
            initMusclePieChartDataSource(csd.totalRepsByAbsMg, muscle);
            break;
        case utils.CHEST_MG_ID:
            initMusclePieChartDataSource(csd.totalRepsByChestMg, muscle);
            break;
        }
    }
    const abbrevMv = makeAbbrevMvFn()
    const initMvPieChartDataSource = makeInitMvPieChartDataSourceFn(abbrevMv)
    csd.totalRepsByMovementVariant = {}
    csd.totalUpperBodyRepsByMovementVariant = {}
    csd.totalShoulderRepsByMovementVariant = {}
    csd.totalBackRepsByMovementVariant = {}
    csd.totalBicepsRepsByMovementVariant = {}
    csd.totalTricepsRepsByMovementVariant = {}
    csd.totalForearmsRepsByMovementVariant = {}
    csd.totalAbsRepsByMovementVariant = {}
    csd.totalChestRepsByMovementVariant = {}
    csd.totalLowerBodyRepsByMovementVariant = {}
    csd.totalQuadsRepsByMovementVariant = {}
    csd.totalHamsRepsByMovementVariant = {}
    csd.totalCalfsRepsByMovementVariant = {}
    csd.totalGlutesRepsByMovementVariant = {}
    for (let i = 0; i < movementVariantsArray.length; i++) {
        const variant = movementVariantsArray[i]
        // initialize reps pie chart data
        initMvPieChartDataSource(csd.totalRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalUpperBodyRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalShoulderRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalBackRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalTricepsRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalBicepsRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalForearmsRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalAbsRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalChestRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalLowerBodyRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalQuadsRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalHamsRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalCalfsRepsByMovementVariant, variant);
        initMvPieChartDataSource(csd.totalGlutesRepsByMovementVariant, variant);
    }
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        const numReps = set.payload["set/num-reps"]
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        const primaryMusclesTotalReps = numReps * utils.PRIMARY_MUSCLE_PERCENTAGE
        const secondaryMusclesTotalReps = numReps - primaryMusclesTotalReps
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        addTo(csd.totalRepsByMovementVariant, movementVariantId, numReps, null);
        const primaryMusclesCount = primaryMuscleIds.length
        const perPrimaryMuscleReps = primaryMusclesTotalReps / primaryMusclesCount
        let perSecondaryMuscleReps = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            perSecondaryMuscleReps = secondaryMusclesTotalReps / secondaryMusclesCount
        }
        const tallyReps = (muscleId, repsToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.totalRepsByChestMg,          muscleId,      repsToAdd, null)
            addTo(csd.totalRepsByTricepsMg,        muscleId,      repsToAdd, null)
            addTo(csd.totalRepsByAbsMg,            muscleId,      repsToAdd, null)
            addTo(csd.totalRepsByBackMg,           muscleId,      repsToAdd, null)
            addTo(csd.totalRepsByShoulderMg,       muscleId,      repsToAdd, null)
            addTo(csd.totalRepsByMuscleGroup,      muscleGroupId, repsToAdd, null)
            addTo(csd.totalRepsByBodySegment,      bodySegmentId, repsToAdd, null)
            addTo(csd.totalRepsByUpperBodySegment, muscleGroupId, repsToAdd, null)
            addTo(csd.totalRepsByLowerBodySegment, muscleGroupId, repsToAdd, null)
            switch (bodySegmentId) {
            case utils.UPPER_BODY_SEGMENT_ID:
                addTo(csd.totalUpperBodyRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break;
            case utils.LOWER_BODY_SEGMENT_ID:
                addTo(csd.totalLowerBodyRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break;
            }
            switch (muscleGroupId) {
            case utils.SHOULDER_MG_ID:
                addTo(csd.totalShoulderRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.BACK_MG_ID:
                addTo(csd.totalBackRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.TRICEP_MG_ID:
                addTo(csd.totalTricepsRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.BICEPS_MG_ID:
                addTo(csd.totalBicepsRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.FOREARMS_MG_ID:
                addTo(csd.totalForearmsRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.ABS_MG_ID:
                addTo(csd.totalAbsRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.CHEST_MG_ID:
                addTo(csd.totalChestRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.QUADRICEPS_MG_ID:
                addTo(csd.totalQuadsRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.HAMSTRINGS_MG_ID:
                addTo(csd.totalHamsRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.CALVES_MG_ID:
                addTo(csd.totalCalfsRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            case utils.GLUTES_MG_ID:
                addTo(csd.totalGlutesRepsByMovementVariant, movementVariantId, repsToAdd, null)
                break
            }
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            tallyReps(primaryMuscleId, perPrimaryMuscleReps)
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            tallyReps(secondaryMuscleId, perSecondaryMuscleReps)
        }
    }
    const doEnd = performance.now()
    console.log("chart-utils, rep dist chart data took: " + (doEnd - doStart) + " ms.")
    return csd
}

export const makeRepsLineChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const doStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const makeInitialSingleEntityTimeSeriesDataSource = initialSingleEntityTimeSeriesDataSourceMaker()
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsTimeSeriesDataSource = makeInitBsTimeSeriesDataSourceFn()
    csd.repsTimeSeries = makeInitialSingleEntityTimeSeriesDataSource("Total Reps")
    csd.repsByBodySegmentTimeSeries = {}
    for (let i = 0; i < bodySegmentsArray.length; i++) {
        initBsTimeSeriesDataSource(csd.repsByBodySegmentTimeSeries, bodySegmentsArray[i])
    }
    const abbrevMg = makeAbbrevMgFn()
    const initMgTimeSeriesDataSource = makeInitMgTimeSeriesDataSourceFn(abbrevMg)
    csd.repsByMuscleGroupTimeSeries = {}
    csd.repsByUpperBodySegmentTimeSeries = {}
    csd.repsByLowerBodySegmentTimeSeries = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgTimeSeriesDataSource(csd.repsByMuscleGroupTimeSeries, mg)
        switch (bodySegmentId) {
        case utils.UPPER_BODY_SEGMENT_ID:
            initMgTimeSeriesDataSource(csd.repsByUpperBodySegmentTimeSeries, mg)
            break;
        case utils.LOWER_BODY_SEGMENT_ID:
            initMgTimeSeriesDataSource(csd.repsByLowerBodySegmentTimeSeries, mg)
            break;
        }
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMuscleTimeSeriesDataSource = makeInitMuscleTimeSeriesDataSourceFn(abbrevMuscle)
    csd.repsByShoulderMgTimeSeries = {}
    csd.repsByBackMgTimeSeries = {}
    csd.repsByTricepsMgTimeSeries = {}
    csd.repsByBicepsMgTimeSeries = {}
    csd.repsByForearmsMgTimeSeries = {}
    csd.repsByAbsMgTimeSeries = {}
    csd.repsByChestMgTimeSeries = {}
    csd.repsByQuadsMgTimeSeries = {}
    csd.repsByHamsMgTimeSeries = {}
    csd.repsByCalfsMgTimeSeries = {}
    csd.repsByGlutesMgTimeSeries = {}
    for (let i = 0; i < musclesArray.length; i++) {
        const muscle = musclesArray[i]
        const mgId = muscle.payload["muscle/muscle-group-id"]
        switch (mgId) {
        case utils.SHOULDER_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByShoulderMgTimeSeries, muscle);
            break;
        case utils.BACK_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByBackMgTimeSeries, muscle);
            break;
        case utils.BICEPS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByBicepsMgTimeSeries, muscle);
            break;
        case utils.TRICEP_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByTricepsMgTimeSeries, muscle);
            break;
        case utils.FOREARMS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByForearmsMgTimeSeries, muscle);
            break;
        case utils.ABS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByAbsMgTimeSeries, muscle);
            break;
        case utils.QUADRICEPS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByQuadsMgTimeSeries, muscle);
            break;
        case utils.HAMSTRINGS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByHamsMgTimeSeries, muscle);
            break;
        case utils.CALVES_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByCalfsMgTimeSeries, muscle);
            break;
        case utils.GLUTES_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByGlutesMgTimeSeries, muscle);
            break;
        case utils.CHEST_MG_ID:
            initMuscleTimeSeriesDataSource(csd.repsByChestMgTimeSeries, muscle);
            break;
        }
    }
    const abbrevMv = makeAbbrevMvFn()
    const initMvTimeSeriesDataSource = makeInitMvTimeSeriesDataSourceFn(abbrevMv)
    csd.repsByMovementVariantTimeSeries = {}
    csd.upperBodyRepsByMovementVariantTimeSeries = {}
    csd.shoulderRepsByMovementVariantTimeSeries = {}
    csd.backRepsByMovementVariantTimeSeries = {}
    csd.bicepsRepsByMovementVariantTimeSeries = {}
    csd.tricepsRepsByMovementVariantTimeSeries = {}
    csd.forearmsRepsByMovementVariantTimeSeries = {}
    csd.absRepsByMovementVariantTimeSeries = {}
    csd.chestRepsByMovementVariantTimeSeries = {}
    csd.lowerBodyRepsByMovementVariantTimeSeries = {}
    csd.quadsRepsByMovementVariantTimeSeries = {}
    csd.hamsRepsByMovementVariantTimeSeries = {}
    csd.calfsRepsByMovementVariantTimeSeries = {}
    csd.glutesRepsByMovementVariantTimeSeries = {}
    for (let i = 0; i < movementVariantsArray.length; i++) {
        const variant = movementVariantsArray[i]
        // initialize reps timeline data
        initMvTimeSeriesDataSource(csd.repsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.upperBodyRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.shoulderRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.backRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.bicepsRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.tricepsRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.forearmsRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.absRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.chestRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.lowerBodyRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.quadsRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.hamsRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.calfsRepsByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.glutesRepsByMovementVariantTimeSeries, variant);
    }
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        const numReps = set.payload["set/num-reps"]
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        const primaryMusclesTotalReps = numReps * utils.PRIMARY_MUSCLE_PERCENTAGE
        const secondaryMusclesTotalReps = numReps - primaryMusclesTotalReps
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        addTo(csd.repsTimeSeries, ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER, numReps, loggedAt);
        addTo(csd.repsByMovementVariantTimeSeries, movementVariantId, numReps, loggedAt);
        const primaryMusclesCount = primaryMuscleIds.length
        const perPrimaryMuscleReps = primaryMusclesTotalReps / primaryMusclesCount
        let perSecondaryMuscleReps = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            perSecondaryMuscleReps = secondaryMusclesTotalReps / secondaryMusclesCount
        }
        const tallyReps = (muscleId, repsToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.repsByChestMgTimeSeries,          muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByTricepsMgTimeSeries,        muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByBicepsMgTimeSeries,         muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByForearmsMgTimeSeries,       muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByAbsMgTimeSeries,            muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByQuadsMgTimeSeries,          muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByHamsMgTimeSeries,           muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByCalfsMgTimeSeries,          muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByGlutesMgTimeSeries,         muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByBackMgTimeSeries,           muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByShoulderMgTimeSeries,       muscleId,      repsToAdd, loggedAt)
            addTo(csd.repsByMuscleGroupTimeSeries,      muscleGroupId, repsToAdd, loggedAt)
            addTo(csd.repsByBodySegmentTimeSeries,      bodySegmentId, repsToAdd, loggedAt)
            addTo(csd.repsByUpperBodySegmentTimeSeries, muscleGroupId, repsToAdd, loggedAt)
            addTo(csd.repsByLowerBodySegmentTimeSeries, muscleGroupId, repsToAdd, loggedAt)
            switch (bodySegmentId) {
            case utils.UPPER_BODY_SEGMENT_ID:
                addTo(csd.upperBodyRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.LOWER_BODY_SEGMENT_ID:
                addTo(csd.lowerBodyRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            }
            switch (muscleGroupId) {
            case utils.SHOULDER_MG_ID:
                addTo(csd.shoulderRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.BACK_MG_ID:
                addTo(csd.backRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.BICEPS_MG_ID:
                addTo(csd.bicepsRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.TRICEP_MG_ID:
                addTo(csd.tricepsRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.FOREARMS_MG_ID:
                addTo(csd.forearmsRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.ABS_MG_ID:
                addTo(csd.absRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.CHEST_MG_ID:
                addTo(csd.chestRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.QUADRICEPS_MG_ID:
                addTo(csd.quadsRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.HAMSTRINGS_MG_ID:
                addTo(csd.hamsRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.CALVES_MG_ID:
                addTo(csd.calfsRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            case utils.GLUTES_MG_ID:
                addTo(csd.glutesRepsByMovementVariantTimeSeries, movementVariantId, repsToAdd, loggedAt)
                break
            }
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            tallyReps(primaryMuscleId, perPrimaryMuscleReps)
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            tallyReps(secondaryMuscleId, perSecondaryMuscleReps)
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    // Hole plugger for time series data
    ////////////////////////////////////////////////////////////////////////////
    const plugHolesAndCalcPercentages = makeTimeSeriesHolePluggerAndPercentageCalculator()
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const loggedAt = set.payload["set/logged-at"]
        // plug holes in 'reps' entity-dict containers
        plugHolesAndCalcPercentages(csd.repsTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByMuscleGroupTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByUpperBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByLowerBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByShoulderMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByBackMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByAbsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByQuadsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByHamsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByCalfsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByGlutesMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByChestMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByBicepsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByTricepsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.repsByForearmsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.upperBodyRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.shoulderRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.backRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.bicepsRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.tricepsRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.forearmsRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.absRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.chestRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.lowerBodyRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.quadsRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.hamsRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.calfsRepsByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.glutesRepsByMovementVariantTimeSeries, loggedAt)
    }
    const doEnd = performance.now()
    //console.log("chart-utils, reps line chart data took: " + (doEnd - doStart) + " ms.")
    return csd
}

export const makeWeightLiftedDistChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const doStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsPieChartDataSource = makeMakeInitBsPieChartDataSourceFn()
    csd.weightLiftedByBodySegment = {}
    for (let i = 0; i < bodySegmentsArray.length; i++) {
        initBsPieChartDataSource(csd.weightLiftedByBodySegment, bodySegmentsArray[i])
    }
    const abbrevMg = makeAbbrevMgFn()
    const initMgPieChartDataSource = makeInitMgPieChartDataSourceFn(abbrevMg)
    csd.weightLiftedByMuscleGroup = {}
    csd.weightLiftedByUpperBodySegment = {}
    csd.weightLiftedByLowerBodySegment = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgPieChartDataSource(csd.weightLiftedByMuscleGroup, mg)
        switch (bodySegmentId) {
        case utils.UPPER_BODY_SEGMENT_ID:
            initMgPieChartDataSource(csd.weightLiftedByUpperBodySegment, mg)
            break;
        case utils.LOWER_BODY_SEGMENT_ID:
            initMgPieChartDataSource(csd.weightLiftedByLowerBodySegment, mg)
            break;
        }
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMusclePieChartDataSource = makeInitMusclePieChartDataSourceFn(abbrevMuscle)
    csd.weightLiftedByShoulderMg = {}
    csd.weightLiftedByBackMg = {}
    csd.weightLiftedByTricepsMg = {}
    csd.weightLiftedByAbsMg = {}
    csd.weightLiftedByChestMg = {}
    for (let i = 0; i < musclesArray.length; i++) {
        const muscle = musclesArray[i]
        const mgId = muscle.payload["muscle/muscle-group-id"]
        switch (mgId) {
        case utils.SHOULDER_MG_ID:
            initMusclePieChartDataSource(csd.weightLiftedByShoulderMg, muscle);
            break;
        case utils.BACK_MG_ID:
            initMusclePieChartDataSource(csd.weightLiftedByBackMg, muscle);
            break;
        case utils.TRICEP_MG_ID:
            initMusclePieChartDataSource(csd.weightLiftedByTricepsMg, muscle);
            break;
        case utils.ABS_MG_ID:
            initMusclePieChartDataSource(csd.weightLiftedByAbsMg, muscle);
            break;
        case utils.CHEST_MG_ID:
            initMusclePieChartDataSource(csd.weightLiftedByChestMg, muscle);
            break;
        }
    }
    const abbrevMv = makeAbbrevMvFn()
    const initMvPieChartDataSource = makeInitMvPieChartDataSourceFn(abbrevMv)
    csd.weightLiftedByMovementVariant = {}
    csd.upperBodyWeightLiftedByMovementVariant = {}
    csd.shoulderWeightLiftedByMovementVariant = {}
    csd.backWeightLiftedByMovementVariant = {}
    csd.bicepsWeightLiftedByMovementVariant = {}
    csd.tricepsWeightLiftedByMovementVariant = {}
    csd.forearmsWeightLiftedByMovementVariant = {}
    csd.absWeightLiftedByMovementVariant = {}
    csd.chestWeightLiftedByMovementVariant = {}
    csd.lowerBodyWeightLiftedByMovementVariant = {}
    csd.quadsWeightLiftedByMovementVariant = {}
    csd.hamsWeightLiftedByMovementVariant = {}
    csd.calfsWeightLiftedByMovementVariant = {}
    csd.glutesWeightLiftedByMovementVariant = {}
    for (let i = 0; i < movementVariantsArray.length; i++) {
        const variant = movementVariantsArray[i]
        // initialize weight pie chart data
        initMvPieChartDataSource(csd.weightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.upperBodyWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.shoulderWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.backWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.tricepsWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.bicepsWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.forearmsWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.absWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.chestWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.lowerBodyWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.quadsWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.hamsWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.calfsWeightLiftedByMovementVariant, variant);
        initMvPieChartDataSource(csd.glutesWeightLiftedByMovementVariant, variant);
    }
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        const weight = utils.weightValue(set.payload["set/weight"], set.payload["set/weight-uom"], userSettings.payload["usersettings/weight-uom"])
        const numReps = set.payload["set/num-reps"]
        const totalWeight = weight * numReps
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        let primaryMusclesTotalWeight
        if (secondaryMuscleIdsCount > 0) {
            primaryMusclesTotalWeight = totalWeight * utils.PRIMARY_MUSCLE_PERCENTAGE
        } else {
            primaryMusclesTotalWeight = totalWeight
        }
        const secondaryMusclesTotalWeight = totalWeight - primaryMusclesTotalWeight
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        addTo(csd.weightLiftedByMovementVariant, movementVariantId, totalWeight, null);
        const primaryMusclesCount = primaryMuscleIds.length
        const perPrimaryMuscleWeight = primaryMusclesTotalWeight / primaryMusclesCount
        let perSecondaryMuscleWeight = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            perSecondaryMuscleWeight = secondaryMusclesTotalWeight / secondaryMusclesCount
        }
        const tallyWeight = (muscleId, weightToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.weightLiftedByChestMg,          muscleId,      weightToAdd, null)
            addTo(csd.weightLiftedByTricepsMg,        muscleId,      weightToAdd, null)
            addTo(csd.weightLiftedByAbsMg,            muscleId,      weightToAdd, null)
            addTo(csd.weightLiftedByBackMg,           muscleId,      weightToAdd, null)
            addTo(csd.weightLiftedByShoulderMg,       muscleId,      weightToAdd, null)
            addTo(csd.weightLiftedByMuscleGroup,      muscleGroupId, weightToAdd, null)
            addTo(csd.weightLiftedByBodySegment,      bodySegmentId, weightToAdd, null)
            addTo(csd.weightLiftedByUpperBodySegment, muscleGroupId, weightToAdd, null)
            addTo(csd.weightLiftedByLowerBodySegment, muscleGroupId, weightToAdd, null)
            switch (bodySegmentId) {
            case utils.UPPER_BODY_SEGMENT_ID:
                addTo(csd.upperBodyWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break;
            case utils.LOWER_BODY_SEGMENT_ID:
                addTo(csd.lowerBodyWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break;
            }
            switch (muscleGroupId) {
            case utils.SHOULDER_MG_ID:
                addTo(csd.shoulderWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.BACK_MG_ID:
                addTo(csd.backWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.TRICEP_MG_ID:
                addTo(csd.tricepsWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.BICEPS_MG_ID:
                addTo(csd.bicepsWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.FOREARMS_MG_ID:
                addTo(csd.forearmsWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.ABS_MG_ID:
                addTo(csd.absWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.CHEST_MG_ID:
                addTo(csd.chestWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.QUADRICEPS_MG_ID:
                addTo(csd.quadsWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.HAMSTRINGS_MG_ID:
                addTo(csd.hamsWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.CALVES_MG_ID:
                addTo(csd.calfsWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            case utils.GLUTES_MG_ID:
                addTo(csd.glutesWeightLiftedByMovementVariant, movementVariantId, weightToAdd, null)
                break
            }
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            tallyWeight(primaryMuscleId, perPrimaryMuscleWeight)
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            tallyWeight(secondaryMuscleId, perSecondaryMuscleWeight)
        }
    }
    const doEnd = performance.now()
    //console.log("chart-utils, weight lifted dist chart data took: " + (doEnd - doStart) + " ms.")
    return csd
}

export const makeWeightLiftedLineChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const doStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const makeInitialSingleEntityTimeSeriesDataSource = initialSingleEntityTimeSeriesDataSourceMaker()
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsTimeSeriesDataSource = makeInitBsTimeSeriesDataSourceFn()
    csd.weightTimeSeries = makeInitialSingleEntityTimeSeriesDataSource("Total Weight")
    csd.weightByBodySegmentTimeSeries = {}
    for (let i = 0; i < bodySegmentsArray.length; i++) {
        initBsTimeSeriesDataSource(csd.weightByBodySegmentTimeSeries, bodySegmentsArray[i])
    }
    const abbrevMg = makeAbbrevMgFn()
    const initMgTimeSeriesDataSource = makeInitMgTimeSeriesDataSourceFn(abbrevMg)
    csd.weightByMuscleGroupTimeSeries = {}
    csd.weightByUpperBodySegmentTimeSeries = {}
    csd.weightByLowerBodySegmentTimeSeries = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgTimeSeriesDataSource(csd.weightByMuscleGroupTimeSeries, mg)
        switch (bodySegmentId) {
        case utils.UPPER_BODY_SEGMENT_ID:
            initMgTimeSeriesDataSource(csd.weightByUpperBodySegmentTimeSeries, mg)
            break;
        case utils.LOWER_BODY_SEGMENT_ID:
            initMgTimeSeriesDataSource(csd.weightByLowerBodySegmentTimeSeries, mg)
            break;
        }
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMuscleTimeSeriesDataSource = makeInitMuscleTimeSeriesDataSourceFn(abbrevMuscle)
    csd.weightByShoulderMgTimeSeries = {}
    csd.weightByBackMgTimeSeries = {}
    csd.weightByTricepsMgTimeSeries = {}
    csd.weightByBicepsMgTimeSeries = {}
    csd.weightByForearmsMgTimeSeries = {}
    csd.weightByAbsMgTimeSeries = {}
    csd.weightByQuadsMgTimeSeries = {}
    csd.weightByHamsMgTimeSeries = {}
    csd.weightByCalfsMgTimeSeries = {}
    csd.weightByGlutesMgTimeSeries = {}
    csd.weightByChestMgTimeSeries = {}
    for (let i = 0; i < musclesArray.length; i++) {
        const muscle = musclesArray[i]
        const mgId = muscle.payload["muscle/muscle-group-id"]
        switch (mgId) {
        case utils.SHOULDER_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByShoulderMgTimeSeries, muscle);
            break;
        case utils.BACK_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByBackMgTimeSeries, muscle);
            break;
        case utils.BICEPS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByBicepsMgTimeSeries, muscle);
            break;
        case utils.TRICEP_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByTricepsMgTimeSeries, muscle);
            break;
        case utils.FOREARMS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByForearmsMgTimeSeries, muscle);
            break;
        case utils.ABS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByAbsMgTimeSeries, muscle);
            break;
        case utils.QUADRICEPS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByQuadsMgTimeSeries, muscle);
            break;
        case utils.HAMSTRINGS_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByHamsMgTimeSeries, muscle);
            break;
        case utils.CALVES_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByCalfsMgTimeSeries, muscle);
            break;
        case utils.GLUTES_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByGlutesMgTimeSeries, muscle);
            break;
        case utils.CHEST_MG_ID:
            initMuscleTimeSeriesDataSource(csd.weightByChestMgTimeSeries, muscle);
            break;
        }
    }
    const abbrevMv = makeAbbrevMvFn()
    const initMvTimeSeriesDataSource = makeInitMvTimeSeriesDataSourceFn(abbrevMv)
    csd.weightByMovementVariantTimeSeries = {}
    csd.upperBodyWeightByMovementVariantTimeSeries = {}
    csd.shoulderWeightByMovementVariantTimeSeries = {}
    csd.backWeightByMovementVariantTimeSeries = {}
    csd.bicepsWeightByMovementVariantTimeSeries = {}
    csd.tricepsWeightByMovementVariantTimeSeries = {}
    csd.forearmsWeightByMovementVariantTimeSeries = {}
    csd.absWeightByMovementVariantTimeSeries = {}
    csd.chestWeightByMovementVariantTimeSeries = {}
    csd.lowerBodyWeightByMovementVariantTimeSeries = {}
    csd.quadsWeightByMovementVariantTimeSeries = {}
    csd.hamsWeightByMovementVariantTimeSeries = {}
    csd.calfsWeightByMovementVariantTimeSeries = {}
    csd.glutesWeightByMovementVariantTimeSeries = {}
    for (let i = 0; i < movementVariantsArray.length; i++) {
        const variant = movementVariantsArray[i]
        // initialize weight timeline data
        initMvTimeSeriesDataSource(csd.weightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.upperBodyWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.shoulderWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.backWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.bicepsWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.tricepsWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.forearmsWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.absWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.chestWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.lowerBodyWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.quadsWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.hamsWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.calfsWeightByMovementVariantTimeSeries, variant);
        initMvTimeSeriesDataSource(csd.glutesWeightByMovementVariantTimeSeries, variant);
    }
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        const weight = utils.weightValue(set.payload["set/weight"], set.payload["set/weight-uom"], userSettings.payload["usersettings/weight-uom"])
        const numReps = set.payload["set/num-reps"]
        const totalWeight = weight * numReps
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        let primaryMusclesTotalWeight
        if (secondaryMuscleIdsCount > 0) {
            primaryMusclesTotalWeight = totalWeight * utils.PRIMARY_MUSCLE_PERCENTAGE
        } else {
            primaryMusclesTotalWeight = totalWeight
        }
        const secondaryMusclesTotalWeight = totalWeight - primaryMusclesTotalWeight
        const primaryMusclesTotalReps = numReps * utils.PRIMARY_MUSCLE_PERCENTAGE
        const secondaryMusclesTotalReps = numReps - primaryMusclesTotalReps
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        addTo(csd.weightTimeSeries, ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER, totalWeight, loggedAt);
        addTo(csd.weightByMovementVariantTimeSeries, movementVariantId, totalWeight, loggedAt);
        const primaryMusclesCount = primaryMuscleIds.length
        const perPrimaryMuscleWeight = primaryMusclesTotalWeight / primaryMusclesCount
        const perPrimaryMuscleReps = primaryMusclesTotalReps / primaryMusclesCount
        let perSecondaryMuscleWeight = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            perSecondaryMuscleWeight = secondaryMusclesTotalWeight / secondaryMusclesCount
        }
        const tallyWeight = (muscleId, weightToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.weightByChestMgTimeSeries,          muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByTricepsMgTimeSeries,        muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByBicepsMgTimeSeries,         muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByForearmsMgTimeSeries,       muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByAbsMgTimeSeries,            muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByQuadsMgTimeSeries,          muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByHamsMgTimeSeries,           muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByCalfsMgTimeSeries,          muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByGlutesMgTimeSeries,         muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByBackMgTimeSeries,           muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByShoulderMgTimeSeries,       muscleId,      weightToAdd, loggedAt)
            addTo(csd.weightByMuscleGroupTimeSeries,      muscleGroupId, weightToAdd, loggedAt)
            addTo(csd.weightByBodySegmentTimeSeries,      bodySegmentId, weightToAdd, loggedAt)
            addTo(csd.weightByUpperBodySegmentTimeSeries, muscleGroupId, weightToAdd, loggedAt)
            addTo(csd.weightByLowerBodySegmentTimeSeries, muscleGroupId, weightToAdd, loggedAt)
            switch (bodySegmentId) {
            case utils.UPPER_BODY_SEGMENT_ID:
                addTo(csd.upperBodyWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.LOWER_BODY_SEGMENT_ID:
                addTo(csd.lowerBodyWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            }
            switch (muscleGroupId) {
            case utils.SHOULDER_MG_ID:
                addTo(csd.shoulderWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.BACK_MG_ID:
                addTo(csd.backWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.BICEPS_MG_ID:
                addTo(csd.bicepsWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.TRICEP_MG_ID:
                addTo(csd.tricepsWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.FOREARMS_MG_ID:
                addTo(csd.forearmsWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.ABS_MG_ID:
                addTo(csd.absWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.CHEST_MG_ID:
                addTo(csd.chestWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.QUADRICEPS_MG_ID:
                addTo(csd.quadsWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.HAMSTRINGS_MG_ID:
                addTo(csd.hamsWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.CALVES_MG_ID:
                addTo(csd.calfsWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            case utils.GLUTES_MG_ID:
                addTo(csd.glutesWeightByMovementVariantTimeSeries, movementVariantId, weightToAdd, loggedAt)
                break
            }
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            tallyWeight(primaryMuscleId, perPrimaryMuscleWeight)
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            tallyWeight(secondaryMuscleId, perSecondaryMuscleWeight)
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    // Hole plugger for time series data
    ////////////////////////////////////////////////////////////////////////////
    const plugHolesAndCalcPercentages = makeTimeSeriesHolePluggerAndPercentageCalculator()
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const loggedAt = set.payload["set/logged-at"]
        // plug holes in 'weight' entity-dict containers
        plugHolesAndCalcPercentages(csd.weightTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByMuscleGroupTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByUpperBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByLowerBodySegmentTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByShoulderMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByBackMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByAbsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByQuadsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByHamsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByCalfsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByGlutesMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByChestMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByBicepsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByTricepsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.weightByForearmsMgTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.upperBodyWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.shoulderWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.backWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.bicepsWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.tricepsWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.forearmsWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.absWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.chestWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.lowerBodyWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.quadsWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.hamsWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.calfsWeightByMovementVariantTimeSeries, loggedAt)
        plugHolesAndCalcPercentages(csd.glutesWeightByMovementVariantTimeSeries, loggedAt)
    }
    const doEnd = performance.now()
    console.log("chart-utils, weight lifted line chart data took: " + (doEnd - doStart) + " ms.")
    return csd
}

export const makeTimeBetweenSetsCrossSectionChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const cscsdStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsPieChartDataSource = makeMakeInitBsPieChartDataSourceFn()
    const initBsTimeSeriesDataSource = makeInitBsTimeSeriesDataSourceFn()
    const abbrevMg = makeAbbrevMgFn()
    const initMgPieChartDataSource = makeInitMgPieChartDataSourceFn(abbrevMg)
    const initMgTimeSeriesDataSource = makeInitMgTimeSeriesDataSourceFn(abbrevMg)
    csd.totalTimeBetweenSetsSameMovByMuscleGroup = {}
    csd.timeBetweenSetsSameMovByMuscleGroupTimeSeries = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgPieChartDataSource(csd.totalTimeBetweenSetsSameMovByMuscleGroup, mg)
        initMgTimeSeriesDataSource(csd.timeBetweenSetsSameMovByMuscleGroupTimeSeries, mg)
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMusclePieChartDataSource = makeInitMusclePieChartDataSourceFn(abbrevMuscle)
    const initMuscleTimeSeriesDataSource = makeInitMuscleTimeSeriesDataSourceFn(abbrevMuscle)
    const abbrevMv = makeAbbrevMvFn()
    const initMvPieChartDataSource = makeInitMvPieChartDataSourceFn(abbrevMv)
    const initMvTimeSeriesDataSource = makeInitMvTimeSeriesDataSourceFn(abbrevMv)
    csd.timeBetweenSetsCount = 0
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        let timeBetweenSetsSameMov = null
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        let nextSet = null
        let nextSetMovementId = null
        let nextSetVariantId = null
        if (i + 1 < numSets) {
            nextSet = setsArrayAscending[i + 1]
            nextSetMovementId = nextSet.payload["set/movement-id"]
            nextSetVariantId = nextSet.payload["set/movement-variant-id"]
        }
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        if (nextSet) {
            const nextLoggedAtMoment = moment(nextSet.payload["set/logged-at"])
            const secondsDiff = nextLoggedAtMoment.diff(loggedAtMoment, 'seconds')
            if (secondsDiff < utils.SECONDS_IN_HOUR && // don't count contiguous sets from different workouts
                secondsDiff > 0 && // if the diff is zero, then, well, something is fishy/wrong
                !set.payload["set/ignore-time"] && // obviously, right?
                !nextSet.payload["set/ignore-time"]) {
                if (setMovementId == nextSetMovementId) { // we're in the same movement
                    if (setVariantId == nextSetVariantId) { // and the same variant
                        timeBetweenSetsSameMov = secondsDiff
                    } else { // we'll consider this a mov-transition too
                        // do nothing for now...maybe add functionality in future release
                    }
                } else { // we'll consider this a mov-transition
                    // do nothing for now...maybe add functionality in future release
                }
            }
        }
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        let primaryMusclesTimeBetweenSets = null
        let secondaryMusclesTimeBetweenSets = null
        if (timeBetweenSetsSameMov) {
            if (secondaryMuscleIdsCount > 0) {
                primaryMusclesTimeBetweenSets = timeBetweenSetsSameMov * utils.PRIMARY_MUSCLE_PERCENTAGE
            } else {
                primaryMusclesTimeBetweenSets = timeBetweenSetsSameMov
            }
            secondaryMusclesTimeBetweenSets = timeBetweenSetsSameMov - primaryMusclesTimeBetweenSets
        }
        const primaryMusclesCount = primaryMuscleIds.length
        let perPrimaryMuscleTimeBetweenSets = null
        if (primaryMusclesTimeBetweenSets) {
            perPrimaryMuscleTimeBetweenSets = primaryMusclesTimeBetweenSets / primaryMusclesCount
        }
        let perSecondaryMuscleTimeBetweenSets = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            if (secondaryMusclesTimeBetweenSets) {
                perSecondaryMuscleTimeBetweenSets = secondaryMusclesTimeBetweenSets / secondaryMusclesCount
            }
        }
        const tallyTimeBetweenSets = (muscleId, timeToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.totalTimeBetweenSetsSameMovByMuscleGroup,      muscleGroupId, timeToAdd, null)
            addTo(csd.timeBetweenSetsSameMovByMuscleGroupTimeSeries,      muscleGroupId, timeToAdd, loggedAt)
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            if (perPrimaryMuscleTimeBetweenSets) {
                tallyTimeBetweenSets(primaryMuscleId, perPrimaryMuscleTimeBetweenSets)
            }
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            if (perSecondaryMuscleTimeBetweenSets) {
                tallyTimeBetweenSets(secondaryMuscleId, perSecondaryMuscleTimeBetweenSets)
            }
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    // Hole plugger for time series data
    ////////////////////////////////////////////////////////////////////////////
    const plugHolesAndCalcPercentages = makeTimeSeriesHolePluggerAndPercentageCalculator()
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const loggedAt = set.payload["set/logged-at"]
        // plug holes in 'time between sets' entity-dict containers
        plugHolesAndCalcPercentages(csd.timeBetweenSetsSameMovByMuscleGroupTimeSeries, loggedAt)
    }
    const cscsdEnd = performance.now()
    console.log("chart-utils, cross section Time Between Sets chart data took: " + (cscsdEnd - cscsdStart) + " ms.")
    return csd
}

export const makeRepsCrossSectionChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const cscsdStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsPieChartDataSource = makeMakeInitBsPieChartDataSourceFn()
    const initBsTimeSeriesDataSource = makeInitBsTimeSeriesDataSourceFn()
    const abbrevMg = makeAbbrevMgFn()
    const initMgPieChartDataSource = makeInitMgPieChartDataSourceFn(abbrevMg)
    const initMgTimeSeriesDataSource = makeInitMgTimeSeriesDataSourceFn(abbrevMg)
    csd.totalRepsByMuscleGroup = {}
    csd.repsByMuscleGroupTimeSeries = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgPieChartDataSource(csd.totalRepsByMuscleGroup, mg)
        initMgTimeSeriesDataSource(csd.repsByMuscleGroupTimeSeries, mg)
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMusclePieChartDataSource = makeInitMusclePieChartDataSourceFn(abbrevMuscle)
    const initMuscleTimeSeriesDataSource = makeInitMuscleTimeSeriesDataSourceFn(abbrevMuscle)
    const abbrevMv = makeAbbrevMvFn()
    const initMvPieChartDataSource = makeInitMvPieChartDataSourceFn(abbrevMv)
    const initMvTimeSeriesDataSource = makeInitMvTimeSeriesDataSourceFn(abbrevMv)
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        const numReps = set.payload["set/num-reps"]
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        const primaryMusclesTotalReps = numReps * utils.PRIMARY_MUSCLE_PERCENTAGE
        const secondaryMusclesTotalReps = numReps - primaryMusclesTotalReps
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        const primaryMusclesCount = primaryMuscleIds.length
        const perPrimaryMuscleReps = primaryMusclesTotalReps / primaryMusclesCount
        let perSecondaryMuscleReps = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            perSecondaryMuscleReps = secondaryMusclesTotalReps / secondaryMusclesCount
        }
        const tallyReps = (muscleId, repsToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.totalRepsByMuscleGroup,      muscleGroupId, repsToAdd, null)
            addTo(csd.repsByMuscleGroupTimeSeries,      muscleGroupId, repsToAdd, loggedAt)
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            tallyReps(primaryMuscleId, perPrimaryMuscleReps)
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            tallyReps(secondaryMuscleId, perSecondaryMuscleReps)
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    // Hole plugger for time series data
    ////////////////////////////////////////////////////////////////////////////
    const plugHolesAndCalcPercentages = makeTimeSeriesHolePluggerAndPercentageCalculator()
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const loggedAt = set.payload["set/logged-at"]
        // plug holes in 'reps' entity-dict containers
        plugHolesAndCalcPercentages(csd.repsByMuscleGroupTimeSeries, loggedAt)
    }
    const cscsdEnd = performance.now()
    console.log("chart-utils, cross section Reps chart data took: " + (cscsdEnd - cscsdStart) + " ms.")
    return csd
}

export const makeWeightLiftedCrossSectionChartStrengthData = (setsArrayAscending, userSettings, bodySegmentsArray, bodySegments, muscleGroupsArray, muscleGroups, musclesArray, muscles, movementsArray, movements, movementVariantsArray, movementVariants) => {
    const cscsdStart = performance.now()
    if (setsArrayAscending.length == 0) {
        return null
    }
    const csd = {}
    const firstSet = setsArrayAscending[0]
    const lastSet = _.last(setsArrayAscending)
    const initBsPieChartDataSource = makeMakeInitBsPieChartDataSourceFn()
    const initBsTimeSeriesDataSource = makeInitBsTimeSeriesDataSourceFn()
    const abbrevMg = makeAbbrevMgFn()
    const initMgPieChartDataSource = makeInitMgPieChartDataSourceFn(abbrevMg)
    const initMgTimeSeriesDataSource = makeInitMgTimeSeriesDataSourceFn(abbrevMg)
    csd.weightLiftedByMuscleGroup = {}
    csd.weightByMuscleGroupTimeSeries = {}
    for (let i = 0; i < muscleGroupsArray.length; i++) {
        const mg = muscleGroupsArray[i]
        const bodySegmentId = mg.payload["musclegroup/body-segment-id"]
        initMgPieChartDataSource(csd.weightLiftedByMuscleGroup, mg)
        initMgTimeSeriesDataSource(csd.weightByMuscleGroupTimeSeries, mg)
    }
    const abbrevMuscle = makeAbbrevMuscleFn()
    const initMusclePieChartDataSource = makeInitMusclePieChartDataSourceFn(abbrevMuscle)
    const initMuscleTimeSeriesDataSource = makeInitMuscleTimeSeriesDataSourceFn(abbrevMuscle)
    const abbrevMv = makeAbbrevMvFn()
    const initMvPieChartDataSource = makeInitMvPieChartDataSourceFn(abbrevMv)
    const initMvTimeSeriesDataSource = makeInitMvTimeSeriesDataSourceFn(abbrevMv)
    const addTo = makeAddToFn()
    const numSets = setsArrayAscending.length
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const setMovementId = set.payload["set/movement-id"]
        const setVariantId = set.payload["set/movement-variant-id"]
        const loggedAt = set.payload["set/logged-at"]
        const loggedAtMoment = moment(loggedAt)
        const weight = utils.weightValue(set.payload["set/weight"], set.payload["set/weight-uom"], userSettings.payload["usersettings/weight-uom"])
        const numReps = set.payload["set/num-reps"]
        const totalWeight = weight * numReps
        const movement = movements[setMovementId]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        let secondaryMuscleIdsCount = 0
        if (secondaryMuscleIds) {
            secondaryMuscleIdsCount = secondaryMuscleIds.length
        }
        let primaryMusclesTotalWeight
        if (secondaryMuscleIdsCount > 0) {
            primaryMusclesTotalWeight = totalWeight * utils.PRIMARY_MUSCLE_PERCENTAGE
        } else {
            primaryMusclesTotalWeight = totalWeight
        }
        const secondaryMusclesTotalWeight = totalWeight - primaryMusclesTotalWeight
        let movementVariant = movementVariants[setVariantId]
        if (movementVariant == null && movement.payload["movement/is-body-lift"]) {
            movementVariant = movementVariants[utils.BODY_MOVEMENT_VARIANT_ID]
        }
        const movementVariantId = movementVariant.payload["movementvariant/id"]
        const primaryMusclesCount = primaryMuscleIds.length
        const perPrimaryMuscleWeight = primaryMusclesTotalWeight / primaryMusclesCount
        let perSecondaryMuscleWeight = null
        if (secondaryMuscleIds.length > 0) {
            const secondaryMusclesCount = secondaryMuscleIds.length
            perSecondaryMuscleWeight = secondaryMusclesTotalWeight / secondaryMusclesCount
        }
        const tallyWeight = (muscleId, weightToAdd) => {
            const muscle = muscles[muscleId]
            const muscleGroup = muscleGroups[muscle.payload["muscle/muscle-group-id"]]
            const muscleGroupId = muscleGroup.payload["musclegroup/id"]
            const bodySegment = bodySegments[muscleGroup.payload["musclegroup/body-segment-id"]]
            const bodySegmentId = bodySegment.payload["bodysegment/id"]
            addTo(csd.weightLiftedByMuscleGroup,      muscleGroupId, weightToAdd, null)
            addTo(csd.weightByMuscleGroupTimeSeries,      muscleGroupId, weightToAdd, loggedAt)
        }
        for (let i = 0; i < primaryMuscleIds.length; i++) {
            const primaryMuscleId = primaryMuscleIds[i]
            tallyWeight(primaryMuscleId, perPrimaryMuscleWeight)
        }
        for (let i = 0; i < secondaryMuscleIds.length; i++) {
            const secondaryMuscleId = secondaryMuscleIds[i]
            tallyWeight(secondaryMuscleId, perSecondaryMuscleWeight)
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    // Hole plugger for time series data
    ////////////////////////////////////////////////////////////////////////////
    const plugHolesAndCalcPercentages = makeTimeSeriesHolePluggerAndPercentageCalculator()
    for (let i = 0; i < numSets; i++) {
        const set = setsArrayAscending[i]
        const loggedAt = set.payload["set/logged-at"]
        // plug holes in 'weight' entity-dict containers
        plugHolesAndCalcPercentages(csd.weightByMuscleGroupTimeSeries, loggedAt)
    }
    const cscsdEnd = performance.now()
    console.log("chart-utils, cross section Weight Lifted chart data took: " + (cscsdEnd - cscsdStart) + " ms.")
    return csd
}

export const chartBodyData = (bmlsArrayAscending, userSettings) => {
    if (bmlsArrayAscending.length == 0) {
        return null
    }
    const chartBodyData = {}
    const makeInitialSingleEntityTimeSeriesDataSource = initialSingleEntityTimeSeriesDataSourceMaker()
    chartBodyData.bodyWeightDataSource  = makeInitialSingleEntityTimeSeriesDataSource("Body Weight")
    chartBodyData.armSizeDataSource     = makeInitialSingleEntityTimeSeriesDataSource("Arm Size")
    chartBodyData.chestSizeDataSource   = makeInitialSingleEntityTimeSeriesDataSource("Chest Size")
    chartBodyData.calfSizeDataSource    = makeInitialSingleEntityTimeSeriesDataSource("Calf Size")
    chartBodyData.thighSizeDataSource   = makeInitialSingleEntityTimeSeriesDataSource("Thigh Size")
    chartBodyData.forearmSizeDataSource = makeInitialSingleEntityTimeSeriesDataSource("Forearm Size")
    chartBodyData.waistSizeDataSource   = makeInitialSingleEntityTimeSeriesDataSource("Waist Size")
    chartBodyData.neckSizeDataSource    = makeInitialSingleEntityTimeSeriesDataSource("Neck Size")

    const firstBml = bmlsArrayAscending[0]
    const lastBml = _.last(bmlsArrayAscending)
    chartBodyData.startDate = firstBml.payload["bodyjournallog/logged-at"]
    chartBodyData.endDate = lastBml.payload["bodyjournallog/logged-at"]

    const addTo = makeAddToFn()
    for (let i = 0; i < bmlsArrayAscending.length; i++) {
        const bml = bmlsArrayAscending[i]
        const loggedAt = bml.payload["bodyjournallog/logged-at"]
        const bmlSizeUom = bml.payload["bodyjournallog/size-uom"]
        const userSettingsSizeUom = userSettings.payload["usersettings/size-uom"]
        addTo(chartBodyData.bodyWeightDataSource,
              ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER,
              utils.weightValue(bml.payload["bodyjournallog/body-weight"],
                                bml.payload["bodyjournallog/body-weight-uom"],
                                userSettings.payload["usersettings/weight-uom"]),
              loggedAt)
        addTo(chartBodyData.armSizeDataSource,
              ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER,
              utils.lengthValue(bml.payload["bodyjournallog/arm-size"], bmlSizeUom, userSettingsSizeUom),
              loggedAt)
        addTo(chartBodyData.chestSizeDataSource,
              ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER,
              utils.lengthValue(bml.payload["bodyjournallog/chest-size"], bmlSizeUom, userSettingsSizeUom),
              loggedAt)
        addTo(chartBodyData.calfSizeDataSource,
              ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER,
              utils.lengthValue(bml.payload["bodyjournallog/calf-size"], bmlSizeUom, userSettingsSizeUom),
              loggedAt)
        addTo(chartBodyData.thighSizeDataSource,
              ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER,
              utils.lengthValue(bml.payload["bodyjournallog/thigh-size"], bmlSizeUom, userSettingsSizeUom),
              loggedAt)
        addTo(chartBodyData.forearmSizeDataSource,
              ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER,
              utils.lengthValue(bml.payload["bodyjournallog/forearm-size"], bmlSizeUom, userSettingsSizeUom),
              loggedAt)
        addTo(chartBodyData.waistSizeDataSource,
              ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER,
              utils.lengthValue(bml.payload["bodyjournallog/waist-size"], bmlSizeUom, userSettingsSizeUom),
              loggedAt)
        addTo(chartBodyData.neckSizeDataSource,
              ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER,
              utils.lengthValue(bml.payload["bodyjournallog/neck-size"], bmlSizeUom, userSettingsSizeUom),
              loggedAt)
    }

    ////////////////////////////////////////////////////////////////////////////
    // Hole plugger for time series data
    ////////////////////////////////////////////////////////////////////////////
    const plugHolesAndCalcPercentages = makeTimeSeriesHolePluggerAndPercentageCalculator()
    for (let i = 0; i < bmlsArrayAscending.length; i++) {
        const bml = bmlsArrayAscending[i]
        const loggedAt = bml.payload["bodyjournallog/logged-at"]
        plugHolesAndCalcPercentages(chartBodyData.bodyWeightDataSource, loggedAt)
        plugHolesAndCalcPercentages(chartBodyData.armSizeDataSource, loggedAt)
        plugHolesAndCalcPercentages(chartBodyData.chestSizeDataSource, loggedAt)
        plugHolesAndCalcPercentages(chartBodyData.calfSizeDataSource, loggedAt)
        plugHolesAndCalcPercentages(chartBodyData.thighSizeDataSource, loggedAt)
        plugHolesAndCalcPercentages(chartBodyData.forearmSizeDataSource, loggedAt)
        plugHolesAndCalcPercentages(chartBodyData.waistSizeDataSource, loggedAt)
        plugHolesAndCalcPercentages(chartBodyData.neckSizeDataSource, loggedAt)
    }
    return chartBodyData
}

const normalizeCacheKey = (groupSizeInDays, firstDate, lastDate, chartId) => {
    return "normalize_" + groupSizeInDays + "_" + firstDate + "_" + lastDate + "_" + chartId
}

export const cachingNormalize = (groupSizeInDays, firstDate, lastDate, dataSource, chartId, chartCache, localCache, calculateAverages, calculateDistributions, logging) => {
    const cacheKey = normalizeCacheKey(groupSizeInDays, firstDate, lastDate, chartId)
    let normalizeData = chartCache[cacheKey]
    if (!normalizeData) {
        if (logging) { console.log("normalize data cache miss for key: [" + cacheKey + "]") }
        normalizeData = localCache[cacheKey]
        if (normalizeData) {
            if (logging) { console.log("normalize data local cache hit for key: [" + cacheKey + "]") }
        } else {
            if (logging) { console.log("normalize data local cache miss for key: [" + cacheKey + "]") }
            normalizeData = normalize(groupSizeInDays, firstDate, lastDate, dataSource, calculateAverages, calculateDistributions, logging)
            localCache[cacheKey] = normalizeData
        }
        normalizeData.cacheMeta = { cacheMiss: true, cacheKey: cacheKey }
    } else {
        if (logging) { console.log("normalize data cache hit for key: [" + cacheKey + "]") }
    }
    return normalizeData
}

export const normalize = (groupSizeInDays, firstDate, lastDate, dataSource, calculateAverages, calculateDistributions, logging) => {
    if (!firstDate) {
        return null
    }
    const start = performance.now()
    const dataEntries = {
        avgByPeriodContainer: {},
        maxAggregateSummedValue: 0,
        maxAvgAggregateValue: 0,
        maxDistribution: 0
    }
    const timeSeriesObjects = []
    const dataSourcesArray = _.values(dataSource)
    const avgByGroupTimeSeriesObjects = []
    for (let i = 0; i < dataSourcesArray.length; i++) {
        const timeSeries = dataSourcesArray[i].timeSeries
        timeSeriesObjects.push(timeSeries)
        const entityKey = dataSourcesArray[i].entityKey
        const name = dataSourcesArray[i].name
        const avgByGroupTimeSeries = []
        dataEntries.avgByPeriodContainer[entityKey] = { avgByGroupTimeSeries: avgByGroupTimeSeries, name: name, entityKey: entityKey }
        avgByGroupTimeSeriesObjects.push({ entityKey: entityKey, avgByGroupTimeSeries: avgByGroupTimeSeries })
    }
    const timeSeries = dataSourcesArray[0].timeSeries
    const dates = _.keys(timeSeries)
    const firstDateMoment = moment(firstDate)
    const lastDateMoment = moment(lastDate)
    const firstDateInclusiveMoment = firstDateMoment.startOf('day')
    const lastDateInclusiveMoment = lastDateMoment.startOf('day').add(1, 'seconds')
    const numDaysBetweenDateEdges = lastDateInclusiveMoment.diff(firstDateInclusiveMoment, 'days')
    const numIntervals = _.ceil(numDaysBetweenDateEdges / groupSizeInDays) + 1
    const groupIndexTotals = {}
    for (let i = 0; i < timeSeriesObjects.length; i++) {
        const timeSeriesObject = timeSeriesObjects[i]
        const entityTimeSeriesPair = avgByGroupTimeSeriesObjects[i]
        const avgByGroupTimeSeries = entityTimeSeriesPair.avgByGroupTimeSeries
        for (let j = 0; j < numIntervals; j++) {
            const daysForNextGroup = j * groupSizeInDays
            const groupMoment = moment(firstDateInclusiveMoment).add(daysForNextGroup, 'days')
            const dataEntry = {
                date: groupMoment,
                count: 0,
                aggregateSummedValue: 0,
                avgAggregateValue: 0
            }
            avgByGroupTimeSeries.push(dataEntry)
        }
        for (let j = 0; j < dates.length; j++) {
            const date = dates[j]
            const dateMoment = moment(parseInt(date))
            const daysSinceFirstDate = Math.abs(firstDateInclusiveMoment.diff(dateMoment, 'days'))
            const groupIndex = _.floor(daysSinceFirstDate / groupSizeInDays)
            const valuePercentTuple = timeSeriesObject[date]
            const aggregateValue = valuePercentTuple.aggregateValue
            const value = valuePercentTuple.value
            const percentage = valuePercentTuple.percentage
            const dataEntry = avgByGroupTimeSeries[groupIndex]
            if (value > 0) {
                dataEntry.groupIndex = groupIndex
                dataEntry.aggregateSummedValue = (dataEntry.aggregateSummedValue + aggregateValue)
                dataEntry.count = (dataEntry.count + 1)
                let groupIndexTotal = groupIndexTotals[groupIndex]
                if (!groupIndexTotal) {
                    groupIndexTotal = 0
                }
                groupIndexTotal += aggregateValue
                groupIndexTotals[groupIndex] = groupIndexTotal
                if (dataEntry.aggregateSummedValue > dataEntries.maxAggregateSummedValue) {
                    dataEntries.maxAggregateSummedValue = dataEntry.aggregateSummedValue
                }
            }
        }
    }
    // 2nd pass to calculate averages / percentages
    if (calculateAverages || calculateDistributions) {
        for (let i = 0; i < timeSeriesObjects.length; i++) {
            const entityTimeSeriesPair = avgByGroupTimeSeriesObjects[i]
            const avgByGroupTimeSeries = entityTimeSeriesPair.avgByGroupTimeSeries
            for (let j = 0; j < avgByGroupTimeSeries.length; j++) {
                const dataEntry = avgByGroupTimeSeries[j]
                if (dataEntry.count > 0) {
                    if (calculateAverages) {
                        dataEntry.avgAggregateValue = (dataEntry.aggregateSummedValue / dataEntry.count)
                        if (dataEntry.avgAggregateValue > dataEntries.maxAvgAggregateValue) {
                            dataEntries.maxAvgAggregateValue = dataEntry.avgAggregateValue
                        }
                    }
                    if (calculateDistributions) {
                        dataEntry.distribution = (dataEntry.aggregateSummedValue / groupIndexTotals[dataEntry.groupIndex])
                        if (dataEntry.distribution > dataEntries.maxDistribution) {
                            dataEntries.maxDistribution = dataEntry.distribution
                        }
                    }
                }
            }
        }
    }
    const end = performance.now()
    if (logging) {
        console.log("chart-utils, normalize took: " + (end - start) + " ms.")
    }
    return dataEntries
}

export const lineChartifyData = (dataEntries, dataKey, ignoreZeros) => {
    const avgByPeriodContainer = dataEntries.avgByPeriodContainer
    const dataRowsByDateUnixTime = {}
    const avgByPeriodContainerObjects = _.values(avgByPeriodContainer)

    for (let i = 0; i < avgByPeriodContainerObjects.length; i++) {
        const entityKey = avgByPeriodContainerObjects[i].entityKey
        const avgByGroupTimeSeries = avgByPeriodContainerObjects[i].avgByGroupTimeSeries
        for (let j = 0; j < avgByGroupTimeSeries.length; j++) {
            const dataObject = {}
            let skip = false
            const value = _.round(avgByGroupTimeSeries[j][dataKey], 3)
            if (ignoreZeros) {
                if (value == 0) {
                    skip = true
                }
            }
            if (!skip) {
                const dateUnixTime = avgByGroupTimeSeries[j].date.valueOf()
                let dataRow = dataRowsByDateUnixTime[dateUnixTime]
                let entityIds
                if (!dataRow) {
                    entityIds = []
                    dataRow = {entityIds: entityIds}
                    dataRow.dateUnixTime = dateUnixTime
                    dataRowsByDateUnixTime[dateUnixTime] = dataRow
                } else {
                    entityIds = dataRow.entityIds
                }
                dataRow[entityKey] = value
                entityIds.push(entityKey)
            }
        }
    }
    const dataRowsByDateUnixTimeArray = _.values(dataRowsByDateUnixTime)
    dataRowsByDateUnixTimeArray.sort((o1, o2) => o1.dateUnixTime - o2.dateUnixTime)
    return dataRowsByDateUnixTimeArray;
}

export const dotConfig = (numPoints, color) => {
    const makeDotConfig = (radius, strokeWidth) => ({r: radius, strokeWidth: strokeWidth, stroke: color})
    if (numPoints > 10) {
        return makeDotConfig(2, 1.5)
    }
    if (numPoints > 8) {
        return makeDotConfig(2.25, 1.75)
    }
    if (numPoints > 6) {
        return makeDotConfig(2.5, 2.0)
    }
    if (numPoints > 4) {
        return makeDotConfig(3.75, 2.25)
    }
    if (numPoints > 3) {
        return makeDotConfig(4.0, 2.25)
    }
    if (numPoints > 2) {
        return makeDotConfig(4.25, 2.25)
    }
    if (numPoints > 1) {
        return makeDotConfig(4.5, 2.25)
    }
    return makeDotConfig(5.25, 2.5)
}

const mainColors = [
            "#89C4F4", // jordy blue
            "#F58F84", // ibis wing color
            "#FFA400", // bright golden yellow
            "#87D37C", // gossip green
            "#BE90D4", // light wisteria - light purple
            "#4B77BE", // steel blue
            "#875F9A", // wisteria purple
            "#F5D76E", // cream can
            "#BDC3C7", // silver sand grey
            "#407A52", // patina dark green
            "#A17917", // rapeseed brown-ish
            "#9D2933", // cochineel red
        ]

export const singleValueColor = {}
singleValueColor[ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER] = utils.BOOTSTRAP_BLUE_HEX

export const bodySegmentColors = {}
bodySegmentColors[utils.UPPER_BODY_SEGMENT_ID] = mainColors[0]
bodySegmentColors[utils.LOWER_BODY_SEGMENT_ID] = mainColors[1]

export const muscleGroupColors = {}
muscleGroupColors[utils.SHOULDER_MG_ID] = mainColors[0]
muscleGroupColors[utils.CHEST_MG_ID] = mainColors[1]
muscleGroupColors[utils.TRICEP_MG_ID] = mainColors[2]
muscleGroupColors[utils.ABS_MG_ID] = mainColors[3]
muscleGroupColors[utils.FOREARMS_MG_ID] = mainColors[4]
muscleGroupColors[utils.BACK_MG_ID] = mainColors[5]
muscleGroupColors[utils.BICEPS_MG_ID] = mainColors[6]

muscleGroupColors[utils.GLUTES_MG_ID] = mainColors[7]
muscleGroupColors[utils.QUADRICEPS_MG_ID] = mainColors[8]
muscleGroupColors[utils.HAMSTRINGS_MG_ID] = mainColors[9]
muscleGroupColors[utils.CALVES_MG_ID] = mainColors[10]

export const lowerBodyMuscleGroupColors = {}
lowerBodyMuscleGroupColors[utils.GLUTES_MG_ID] = mainColors[7]
lowerBodyMuscleGroupColors[utils.QUADRICEPS_MG_ID] = mainColors[8]
lowerBodyMuscleGroupColors[utils.HAMSTRINGS_MG_ID] = mainColors[9]
lowerBodyMuscleGroupColors[utils.CALVES_MG_ID] = mainColors[10]

export const movementVariantColors = {}
movementVariantColors[utils.BARBELL_MOVEMENT_VARIANT_ID] = mainColors[0]
movementVariantColors[utils.DUMBBELL_MOVEMENT_VARIANT_ID] = mainColors[1]
movementVariantColors[utils.MACHINE_MOVEMENT_VARIANT_ID] = mainColors[2]
movementVariantColors[utils.SMITH_MACHINE_MOVEMENT_VARIANT_ID] = mainColors[3]
movementVariantColors[utils.CABLE_MOVEMENT_VARIANT_ID] = mainColors[4]
movementVariantColors[utils.CURL_BAR_MOVEMENT_VARIANT_ID] = mainColors[5]
movementVariantColors[utils.SLED_MOVEMENT_VARIANT_ID] = mainColors[6]
movementVariantColors[utils.BODY_MOVEMENT_VARIANT_ID] = mainColors[7]
movementVariantColors[utils.KETTLEBELL_MOVEMENT_VARIANT_ID] = mainColors[8]

export const makeMuscleColors = musclesArray => {
    const muscleColors = {}
    muscleColors[utils.SHOULDER_MG_ID] = {}
    muscleColors[utils.CHEST_MG_ID] = {}
    muscleColors[utils.TRICEP_MG_ID] = {}
    muscleColors[utils.BICEPS_MG_ID] = {}
    muscleColors[utils.FOREARMS_MG_ID] = {}
    muscleColors[utils.ABS_MG_ID] = {}
    muscleColors[utils.QUADRICEPS_MG_ID] = {}
    muscleColors[utils.HAMSTRINGS_MG_ID] = {}
    muscleColors[utils.CALVES_MG_ID] = {}
    muscleColors[utils.GLUTES_MG_ID] = {}
    muscleColors[utils.BACK_MG_ID] = {}
    const setMuscleColors = (muscleGroupId, colors) => {
        const muscleColorsForMg = muscleColors[muscleGroupId]
        let colorIndex = 0
        for (let i = 0; i < musclesArray.length; i++) {
            if (musclesArray[i].payload["muscle/muscle-group-id"] == muscleGroupId) {
                muscleColorsForMg[musclesArray[i].payload["muscle/id"]] = colors[colorIndex]
                colorIndex++
            }
        }
    }
    setMuscleColors(utils.SHOULDER_MG_ID, mainColors)
    setMuscleColors(utils.CHEST_MG_ID, mainColors)
    setMuscleColors(utils.TRICEP_MG_ID, mainColors)
    setMuscleColors(utils.BICEPS_MG_ID, [mainColors[6]])
    setMuscleColors(utils.FOREARMS_MG_ID, [mainColors[4]])
    setMuscleColors(utils.ABS_MG_ID, mainColors)
    setMuscleColors(utils.BACK_MG_ID, mainColors)
    setMuscleColors(utils.QUADRICEPS_MG_ID, [mainColors[8]])
    setMuscleColors(utils.HAMSTRINGS_MG_ID, [mainColors[9]])
    setMuscleColors(utils.CALVES_MG_ID, [mainColors[10]])
    setMuscleColors(utils.GLUTES_MG_ID, [mainColors[7]])
    return muscleColors
}

export const makeYaxisLabelMaker = type => max => {
    if (max > 999999) {
        return "in millions of " + type
    } else if (max > 99999) {
        return "in hundreds of thousands of " + type
    } else if (max > 9999) {
        return "in tens of thousands of " + type
    } else if (max > 999) {
        return "in thousands of " + type
    } else {
        return type
    }
}

export const yaxisWeightValueScalingFactor = max => {
    if (max > 999999) {
        return 0.000001
    } else if (max > 99999) {
        return 0.00001
    } else if (max > 9999) {
        return 0.0001
    } else if (max > 999) {
        return 0.001
    } else {
        return 1.0
    }
}

export const makeNavigateToChartConfigFn = (entityKeyPrefix, entityType, chartCategory, entityName, dispatch, setChartDateRange, push) => (allEntitiesArrayAscending, chartConfig, entitiesArrayAscending, isGlobalConfig) => {
        const loggedAtKey = entityKeyPrefix + "/logged-at"
        let startDate
        if (chartConfig) {
            startDate = chartConfig.startDate
        }
        const firstLoggedAt = allEntitiesArrayAscending[0].payload[loggedAtKey]
        if (!startDate) {
            startDate = firstLoggedAt
        }
        let endDate
        if (chartConfig) {
            endDate = chartConfig.endDate
        }
        if (!endDate) {
            endDate = moment(_.last(allEntitiesArrayAscending).payload[loggedAtKey]).startOf('day').add(1, 'days').valueOf()
        }
        const mostRecentLoggedAt = _.last(allEntitiesArrayAscending).payload[loggedAtKey]
        let mostRecentLoggedAtInclusiveMoment
        if (mostRecentLoggedAt) {
            mostRecentLoggedAtInclusiveMoment = moment(mostRecentLoggedAt).startOf('day').add(1, 'days')
        } else {
            mostRecentLoggedAtInclusiveMoment = moment()
        }
        dispatch(setChartDateRange(chartConfig.id, startDate, endDate))
        dispatch(push(urls.CHART_CONFIG_URI + "?chartId=" + chartConfig.id + "&firstLoggedAt=" + firstLoggedAt + "&mostRecentLoggedAt=" + mostRecentLoggedAt + "&isGlobalConfig=" + isGlobalConfig + "&entityType=" + entityType + "&chartCategory=" + chartCategory + "&entityName=" + entityName))
    }

export const strengthChartCommonProps = ({settings,
                                          sets,
                                          setsArray,
                                          setsArrayAscending,
                                          onOrAfterLoggedAt,
                                          onOrBeforeLoggedAt,
                                          chartCache,
                                          localCache,
                                          allChartConfig,
                                          navigateToStrengthChartConfigFn,
                                          disableChartAnimationFn,
                                          bodySegments,
                                          muscleGroups,
                                          muscles,
                                          movements,
                                          movementsArray,
                                          movementVariants,
                                          fetchMode,
                                          globalChartId,
                                          logging}) => {
        //const chartGlobalStrengthConfig = allChartConfig[CHART_ID_GLOBAL_STRENGTH]
        const chartGlobalStrengthConfig = allChartConfig[globalChartId]
        const weightUomDisplay = utils.toWeightUnitsDisplay(settings.payload["usersettings/weight-uom"])
        const weightUomDisplayUppercase = _.toUpper(weightUomDisplay)
        const bodySegmentsArray = _.values(bodySegments)
        const muscleGroupsArray = _.values(muscleGroups)
        const musclesArray = _.values(muscles)
        const movementVariantsArray = _.values(movementVariants)
        let chartStrengthData = null
        if (setsArrayAscending != null) {
            chartStrengthData = cachingMakeChartStrengthData(setsArrayAscending,
                                                             settings,
                                                             bodySegmentsArray,
                                                             bodySegments,
                                                             muscleGroupsArray,
                                                             muscleGroups,
                                                             musclesArray,
                                                             muscles,
                                                             movementsArray,
                                                             movements,
                                                             movementVariantsArray,
                                                             movementVariants,
                                                             fetchMode,
                                                             onOrAfterLoggedAt,
                                                             onOrBeforeLoggedAt,
                                                             chartCache,
                                                             localCache,
                                                             logging)
        }
        const muscleColors = makeMuscleColors(musclesArray)
        return {
            uomDisplay: weightUomDisplayUppercase,
            userSettings: settings,
            bodySegmentsArray: bodySegmentsArray,
            bodySegments: bodySegments,
            muscleGroupsArray: muscleGroupsArray,
            muscleGroups: muscleGroups,
            musclesArray: musclesArray,
            muscles: muscles,
            movementsArray: movementsArray,
            movements: movements,
            movementVariantsArray: movementVariantsArray,
            movementVariants: movementVariants,
            navigateToChartConfigFn: navigateToStrengthChartConfigFn,
            disableChartAnimationFn: disableChartAnimationFn,
            allSetsArrayAscending: setsArrayAscending,
            chartStrengthData: chartStrengthData,
            allChartConfig: allChartConfig,
            muscleColors: muscleColors,
            logging: logging,
            fetchMode: fetchMode,
            chartCache: chartCache,
            localCache: localCache
        }
}

export const initialChartsPreviewPageState = () => {
    return {
        numSets: -1,
        setsArrayAscending: null,
        showNoChartsToConfigureModal: false,
        showHeadingPanelHelpTextModal: false,
        showPcModal: false,
        showTcModal: false,
        showAvgTcModal: false,
        showDtcModal: false,
        movementSuggestions: [],
        movementSearchText: "",
        processing: true,
        strengthChartCommonProps: null,
        localCache: {}
    }
}

export const makeChartsPreviewPageDataLoadingPromise = (pageProps, fetchMode, localCache) => {
    return new Promise((resolve, reject) => {
        const {
            addToChartCacheFn,
            allChartConfig,
            sets,
            settings,
            bodySegments,
            muscleGroups,
            muscles,
            movements,
            movementsArray,
            movementVariants,
            disableChartAnimationFn,
            chartCache,
            globalChartId
        } = pageProps
        const setsArray = _.values(sets)
        let setsArrayAscending = null
        let firstSetLoggedAtInclusive = null
        let lastSetLoggedAtInclusive = null
        if (setsArray.length > 0) {
            setsArrayAscending = setsArray.sort(utils.makeAscendPaylaodComparator("set/logged-at", null, null))
            firstSetLoggedAtInclusive = moment(setsArrayAscending[0].payload["set/logged-at"]).startOf('day').valueOf()
            lastSetLoggedAtInclusive = moment(_.last(setsArrayAscending).payload["set/logged-at"]).startOf('day').add(1, 'days').valueOf()
        }
        const theStrengthChartCommonProps = strengthChartCommonProps({settings,
                                                                      sets,
                                                                      setsArray,
                                                                      setsArrayAscending,
                                                                      allChartConfig,
                                                                      bodySegments,
                                                                      muscleGroups,
                                                                      muscles,
                                                                      movements,
                                                                      movementsArray,
                                                                      movementVariants,
                                                                      disableChartAnimationFn,
                                                                      fetchMode,
                                                                      onOrAfterLoggedAt: firstSetLoggedAtInclusive,
                                                                      onOrBeforeLoggedAt: lastSetLoggedAtInclusive,
                                                                      logging: false,
                                                                      chartCache,
                                                                      globalChartId,
                                                                      localCache: localCache})
        if (theStrengthChartCommonProps.chartStrengthData != null &&
            theStrengthChartCommonProps.chartStrengthData.cacheMeta != null &&
            theStrengthChartCommonProps.chartStrengthData.cacheMeta.cacheMiss) {
            const cacheKey = theStrengthChartCommonProps.chartStrengthData.cacheMeta.cacheKey
            delete theStrengthChartCommonProps.chartStrengthData.cacheMeta
            addToChartCacheFn(cacheKey, theStrengthChartCommonProps.chartStrengthData)
        }
        setTimeout(() => {
            resolve({ processing: false,
                      numSets: setsArray != null ? setsArray.length : 0,
                      setsArrayAscending: setsArrayAscending,
                      strengthChartCommonProps: theStrengthChartCommonProps,
                      localCache: localCache })
        }, 50)
    })
}

export const strengthChartsPreviewPageStateToProps = (state, globalChartId) => {
    const allChartConfig = state.allChartConfig
    const settings = utils.userSettings(state)
    const sets = state.serverSnapshot._embedded["sets"]
    const bodySegments = state.serverSnapshot._embedded["body-segments"]
    const muscleGroups = state.serverSnapshot._embedded["muscle-groups"]
    const muscles = state.serverSnapshot._embedded["muscles"]
    const movements = state.serverSnapshot._embedded["movements"]
    const movementsArray = _.values(movements)
    const movementVariants = state.serverSnapshot._embedded["movement-variants"]
    const chartCache = state.chartCache
    return {
        allChartConfig: allChartConfig,
        settings: settings,
        sets: sets,
        bodySegments: bodySegments,
        muscleGroups: muscleGroups,
        muscles: muscles,
        movements: movements,
        movementsArray: movementsArray,
        movementVariants: movementVariants,
        chartCache: chartCache,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        globalChartId: globalChartId
    }
}

export const strengthChartsListPageStateToProps = state => {
    const allChartConfig = state.allChartConfig
    const settings = utils.userSettings(state)
    const sets = state.serverSnapshot._embedded["sets"]
    const bodySegments = state.serverSnapshot._embedded["body-segments"]
    const muscleGroups = state.serverSnapshot._embedded["muscle-groups"]
    const muscles = state.serverSnapshot._embedded["muscles"]
    const movements = state.serverSnapshot._embedded["movements"]
    const movementsArray = _.values(movements)
    const movementVariants = state.serverSnapshot._embedded["movement-variants"]
    const chartCache = state.chartCache
    const bmls = state.serverSnapshot._embedded["body-journal-logs"]
    return {
        api: state.api,
        allChartConfig: allChartConfig,
        settings: settings,
        sets: sets,
        bodySegments: bodySegments,
        muscleGroups: muscleGroups,
        muscles: muscles,
        movements: movements,
        movementsArray: movementsArray,
        movementVariants: movementVariants,
        chartCache: chartCache,
        bmls: bmls,
        changelogCounts: state.changelogCounts,
        becameUnauthenticated: state.becameUnauthenticated,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        logging: false
    }
}

export const strengthChartsPreviewPageDispatchToProps = (chartCategory,
                                                         dispatch,
                                                         push,
                                                         setChartDateRange,
                                                         disableChartAnimation,
                                                         bannerRemindLater,
                                                         maintenanceAck,
                                                         makeOnMovementSuggestionSelectedFn,
                                                         addToChartCache) => ({
    navigateTo: url => dispatch(push(url)),
    navigateToStrengthChartConfigFn: makeNavigateToChartConfigFn("set", "set", chartCategory, "set", dispatch, setChartDateRange, push),
    disableChartAnimationFn: chartId => dispatch(disableChartAnimation(chartId)),
    remindMeLaterFn: () => dispatch(bannerRemindLater()),
    maintenanceAckFn: () => dispatch(maintenanceAck()),
    onMovementSuggestionSelectedFn: makeOnMovementSuggestionSelectedFn(dispatch),
    addToChartCacheFn: (cacheKey, strengthData) => dispatch(addToChartCache(cacheKey, strengthData))
})

export const strengthChartsListPageDispatchToProps = (dispatch, push, setChartDateRange, bannerRemindLater, maintenanceAck, addToChartCache, disableChartAnimation, makeOnMovementSuggestionSelectedFn) => ({
    navigateTo: url => dispatch(push(url)),
    navigateToStrengthChartConfigFn: chartCategory => makeNavigateToChartConfigFn("set", "set", chartCategory, "set", dispatch, setChartDateRange, push),
    remindMeLaterFn: () => dispatch(bannerRemindLater()),
    maintenanceAckFn: () => dispatch(maintenanceAck()),
    disableChartAnimationFn: chartId => dispatch(disableChartAnimation(chartId)),
    addToChartCacheFn: (cacheKey, strengthData) => dispatch(addToChartCache(cacheKey, strengthData)),
    onMovementSuggestionSelectedFn: makeOnMovementSuggestionSelectedFn(dispatch),
})


export const bodyChartCommonProps = ({settings,
                                      bmls,
                                      bmlsArray,
                                      bmlsArrayAscending,
                                      onOrAfterLoggedAt,
                                      onOrBeforeLoggedAt,
                                      chartCache,
                                      localCache,
                                      logging,
                                      allChartConfig,
                                      disableChartAnimationFn,
                                      navigateToBodyChartConfigFn}) => {
        const sizeUomDisplay = utils.toLengthUnitsDisplay(settings.payload["usersettings/size-uom"])
        const weightUomDisplay = utils.toWeightUnitsDisplay(settings.payload["usersettings/weight-uom"])
        const sizeUomDisplayUppercase = _.toUpper(sizeUomDisplay)
        const weightUomDisplayUppercase = _.toUpper(weightUomDisplay)
        const chartGlobalStrengthConfig = allChartConfig[CHART_ID_GLOBAL_BODY]
        let chartBodyData = null
        if (bmlsArrayAscending != null) {
            chartBodyData = cachingChartBodyData(bmlsArrayAscending,
                                                 settings,
                                                 onOrAfterLoggedAt,
                                                 onOrBeforeLoggedAt,
                                                 chartCache,
                                                 localCache,
                                                 logging)
        }
        return {
            sizeUomDisplay: sizeUomDisplay,
            sizeUomDisplayUppercase: sizeUomDisplayUppercase,
            weightUomDisplay: weightUomDisplay,
            weightUomDisplayUppercase: weightUomDisplayUppercase,
            bmls: bmls,
            bmlsArray: bmlsArray,
            bmlsArrayAscending: bmlsArrayAscending,
            chartBodyData: chartBodyData,
            allChartConfig: allChartConfig,
            userSettings: settings,
            disableChartAnimationFn,
            navigateToChartConfigFn: navigateToBodyChartConfigFn,
            dataKey: "avgAggregateValue",
            chartCache: chartCache,
            localCache: localCache,
            logging: logging
        }
}

export const chartsList_renderVariables = (props, state, logPrefix) => {
    if (props.logging) {
        console.log("inside " + logPrefix + ".render, this.state.processing: " + state.processing)
    }
    const {
        navigateToStrengthChartConfigFn,
        addToChartCacheFn,
        disableChartAnimationFn,
        allChartConfig
    } = props
    let { strengthChartCommonProps, processing } = state
    if (processing) {
        strengthChartCommonProps = { parentDataProcessing: true,
                                     allChartConfig: allChartConfig,
                                     muscleColors: {} }
    } else {
        strengthChartCommonProps.navigateToChartConfigFn = navigateToStrengthChartConfigFn
        strengthChartCommonProps.disableChartAnimationFn = disableChartAnimationFn
        strengthChartCommonProps.addToChartCacheFn = addToChartCacheFn
        strengthChartCommonProps.parentDataProcessing = false
    }
    return strengthChartCommonProps
}

export const chartsList_makeInitialState = () => ({
    showNoChartsToConfigureModal: false,
    showMetricHeadingModal: false,
    showChartHeadingModal: false,
    processing: true,
    strengthChartCommonProps: null,
    localCache: {},
    numSets: -1
})

export const chartsList_makeComponentDidMountPromise = (props, state, fetchMode, logPrefix) => {
    if (props.logging) {
        console.log("inside " + logPrefix + ".componentDidMount, this.state.processing: " + state.processing)
    }
    return new Promise((resolve, reject) => {
        const {
            addToChartCacheFn,
            allChartConfig,
            sets,
            settings,
            bodySegments,
            muscleGroups,
            muscles,
            movements,
            movementsArray,
            movementVariants,
            chartCache,
            disableChartAnimationFn
        } = props
        const setsArray = _.values(sets)
        let setsArrayAscending = null
        let firstSetLoggedAtInclusive = null
        let lastSetLoggedAtInclusive = null
        if (setsArray.length > 0) {
            setsArrayAscending = setsArray.sort(utils.makeAscendPaylaodComparator("set/logged-at", null, null))
            firstSetLoggedAtInclusive = moment(setsArrayAscending[0].payload["set/logged-at"]).startOf('day').valueOf()
            lastSetLoggedAtInclusive = moment(_.last(setsArrayAscending).payload["set/logged-at"]).startOf('day').add(1, 'days').valueOf()
        }
        const commonProps = strengthChartCommonProps({settings,
                                                      sets,
                                                      setsArray,
                                                      setsArrayAscending,
                                                      allChartConfig,
                                                      bodySegments,
                                                      muscleGroups,
                                                      muscles,
                                                      movements,
                                                      movementsArray,
                                                      movementVariants,
                                                      fetchMode,
                                                      onOrAfterLoggedAt: firstSetLoggedAtInclusive,
                                                      onOrBeforeLoggedAt: lastSetLoggedAtInclusive,
                                                      logging: false,
                                                      disableChartAnimationFn,
                                                      chartCache,
                                                      localCache: state.localCache})
        if (commonProps.chartStrengthData != null &&
            commonProps.chartStrengthData.cacheMeta != null &&
            commonProps.chartStrengthData.cacheMeta.cacheMiss) {
            const cacheKey = commonProps.chartStrengthData.cacheMeta.cacheKey
            delete commonProps.chartStrengthData.cacheMeta
            addToChartCacheFn(cacheKey, commonProps.chartStrengthData)
        }
        setTimeout(() => {
            resolve({ processing: false,
                      setsArrayAscending: setsArrayAscending,
                      strengthChartCommonProps: commonProps,
                      numSets: setsArrayAscending != null ? setsArrayAscending.length : 0,
                      localCache: state.localCache })
        }, 50)
    })
}

export const chartsList_handleShouldComponentUpdate = (props, state, nextProps, nextState, logPrefix) => {
    // Annoying yes, but because of all the redux store updates that occur because
    // of cache insertions, there are a lot of instances when we want to avoid re-renders.
    const returnVal =
          (state.processing != nextState.processing) ||
          (state.showNoChartsToConfigureModal != nextState.showNoChartsToConfigureModal) ||
          (state.showMetricHeadingModal != nextState.showMetricHeadingModal) ||
          (state.showChartHeadingModal != nextState.showChartHeadingModal)
    if (props.logging) {
        console.log("inside " + logPrefix + ".shouldComponentUpdate, processing: [" + state.processing + "], nextState.processing: [" + nextState.processing + "].  Returning: [" + returnVal + "]")
    }
    return returnVal
}
