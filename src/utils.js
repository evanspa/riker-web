import React from "react"
import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import * as errFlags from "./error-flags"
import ReactGA from "react-ga"

export function isProduction() {
    return (process.env.NODE_ENV == 'production')
}

export const THIN_MARGIN_TOP = 2.5

export const RIKERAPP_BLACK_HEX = "#3f4952"
export const RIKERAPP_LIGHTER_BLACK_HEX = "#59636C"
export const BOOTSTRAP_BLUE_HEX = "#3379B7"

export const SECONDS_IN_YEAR = 31556900
export const SECONDS_IN_WEEK = 604800
export const SECONDS_IN_DAY = 86400
export const SECONDS_IN_HOUR = 3600
export const SECONDS_IN_MINUTE = 60
export const MILLISECONDS_IN_DAY = 86400000

export const PRIMARY_MUSCLE_PERCENTAGE = 0.80

export const BARBELL_MOVEMENT_VARIANT_ID       = 1
export const DUMBBELL_MOVEMENT_VARIANT_ID      = 2
export const MACHINE_MOVEMENT_VARIANT_ID       = 4
export const SMITH_MACHINE_MOVEMENT_VARIANT_ID = 8
export const CABLE_MOVEMENT_VARIANT_ID         = 16
export const CURL_BAR_MOVEMENT_VARIANT_ID      = 32
export const SLED_MOVEMENT_VARIANT_ID          = 64
export const BODY_MOVEMENT_VARIANT_ID          = 128
export const KETTLEBELL_MOVEMENT_VARIANT_ID    = 256

export const UPPER_BODY_SEGMENT_ID = 0
export const LOWER_BODY_SEGMENT_ID = 1

export const SHOULDER_MG_ID = 0
export const CHEST_MG_ID    = 2
export const TRICEP_MG_ID   = 8
export const ABS_MG_ID      = 3
export const BACK_MG_ID     = 1
export const CALVES_MG_ID   = 7
export const BICEPS_MG_ID   = 9
export const FOREARMS_MG_ID = 10
export const GLUTES_MG_ID   = 11
export const QUADRICEPS_MG_ID = 5
export const HAMSTRINGS_MG_ID = 6

export const ORIG_DEVICE_ID_WEB = 1

export const MAX_DEVICE_WIDTH_THRESHOLD = 767

export const screenWidth = () => window.innerWidth > 0 ? window.innerWidth : screen.width

export const ELEMENT_ID_MG_SECTION = "mg_section"
export const ELEMENT_ID_MV_SECTION = "mv_section"

export const ELEMENT_ID_MG_ALL = ["mg_all", "all"]
export const ELEMENT_ID_MG_UPPER_BODY = ["mg_upper_body", "upper body"]
export const ELEMENT_ID_MG_SHOULDERS = ["mg_shoulders", "shoulders"]
export const ELEMENT_ID_MG_CHEST = ["mg_chest", "chest"]
export const ELEMENT_ID_MG_BACK = ["mg_back", "back"]
export const ELEMENT_ID_MG_BICEPS = ["mg_biceps", "biceps"]
export const ELEMENT_ID_MG_TRICEPS = ["mg_triceps", "triceps"]
export const ELEMENT_ID_MG_FOREARMS = ["mg_forearms", "forearms"]
export const ELEMENT_ID_MG_ABS = ["mg_abs", "abs"]
export const ELEMENT_ID_MG_LOWER_BODY = ["mg_lower_body", "lower body"]
export const ELEMENT_ID_MG_QUADS = ["mg_quads", "quads"]
export const ELEMENT_ID_MG_HAMS = ["mg_hams", "hamstrings"]
export const ELEMENT_ID_MG_CALFS = ["mg_calfs", "calfs"]
export const ELEMENT_ID_MG_GLUTES = ["mg_glutes", "glutes"]
export const ELEMENT_ID_MV_ALL = ["mv_all", "all"]
export const ELEMENT_ID_MV_UPPER_BODY = ["mv_upper_body", "upper body"]
export const ELEMENT_ID_MV_SHOULDERS = ["mv_shoulders", "shoulders"]
export const ELEMENT_ID_MV_CHEST = ["mv_chest", "chest"]
export const ELEMENT_ID_MV_BACK = ["mv_back", "back"]
export const ELEMENT_ID_MV_BICEPS = ["mv_biceps", "biceps"]
export const ELEMENT_ID_MV_TRICEPS = ["mv_triceps", "triceps"]
export const ELEMENT_ID_MV_FOREARMS = ["mv_forearms", "forearms"]
export const ELEMENT_ID_MV_ABS = ["mv_abs", "abs"]
export const ELEMENT_ID_MV_LOWER_BODY = ["mv_lower_body", "lower body"]
export const ELEMENT_ID_MV_QUADS = ["mv_quads", "quads"]
export const ELEMENT_ID_MV_HAMS = ["mv_hams", "hamstrings"]
export const ELEMENT_ID_MV_CALFS = ["mv_calfs", "calfs"]
export const ELEMENT_ID_MV_GLUTES = ["mv_glutes", "glutes"]

export const ELEMENT_IDS_MG_ALL = [
    ELEMENT_ID_MG_ALL,
    ELEMENT_ID_MG_UPPER_BODY,
    ELEMENT_ID_MG_SHOULDERS,
    ELEMENT_ID_MG_CHEST,
    ELEMENT_ID_MG_BACK,
    ELEMENT_ID_MG_BICEPS,
    ELEMENT_ID_MG_TRICEPS,
    ELEMENT_ID_MG_FOREARMS,
    ELEMENT_ID_MG_ABS,
    ELEMENT_ID_MG_LOWER_BODY,
    ELEMENT_ID_MG_QUADS,
    ELEMENT_ID_MG_HAMS,
    ELEMENT_ID_MG_CALFS,
    ELEMENT_ID_MG_GLUTES
]

export const ELEMENT_IDS_MG_ALL_DIST = [
    ELEMENT_ID_MG_ALL,
    ELEMENT_ID_MG_UPPER_BODY,
    ELEMENT_ID_MG_SHOULDERS,
    ELEMENT_ID_MG_CHEST,
    ELEMENT_ID_MG_BACK,
    ELEMENT_ID_MG_TRICEPS,
    ELEMENT_ID_MG_ABS,
    ELEMENT_ID_MG_LOWER_BODY
]

export const ELEMENT_IDS_MV_ALL = [
    ELEMENT_ID_MV_ALL,
    ELEMENT_ID_MV_UPPER_BODY,
    ELEMENT_ID_MV_SHOULDERS,
    ELEMENT_ID_MV_CHEST,
    ELEMENT_ID_MV_BACK,
    ELEMENT_ID_MV_BICEPS,
    ELEMENT_ID_MV_TRICEPS,
    ELEMENT_ID_MV_FOREARMS,
    ELEMENT_ID_MV_ABS,
    ELEMENT_ID_MV_LOWER_BODY,
    ELEMENT_ID_MV_QUADS,
    ELEMENT_ID_MV_HAMS,
    ELEMENT_ID_MV_CALFS,
    ELEMENT_ID_MV_GLUTES
]

export const chartScreenHorizontalColPadding = () => {
    const screenWidthVal = screenWidth()
    let colHorizontalPadding
    if (screenWidthVal > 1023) { // ipad pro and larger
        colHorizontalPadding = 15
    } else if (screenWidthVal > MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
        colHorizontalPadding = 15
    } else if (screenWidthVal > 411) { // iphone 6 plus
        colHorizontalPadding = 10
    } else if (screenWidthVal > 374) { // iphone 6
        colHorizontalPadding = 8
    } else { // iphone 5 and similar
        colHorizontalPadding = 6
    }
    return colHorizontalPadding
}

export const nearestBmlWithNonNilBodyWeight = (bmls, nearestTo) => {
    const loggedAtKey = "bodyjournallog/logged-at"
    let nonNilBodyWeightBmlsLeadingUpTo = []
    let nonNilBodyWeightBmlsAfter = []
    for (let i = 0; i < bmls.length; i++) {
        const bmlPayload = bmls[i].payload
        if (bmlPayload["bodyjournallog/body-weight"] != null) {
            if (bmlPayload[loggedAtKey] <= nearestTo) {
                nonNilBodyWeightBmlsLeadingUpTo.push(bmls[i])
            } else {
                nonNilBodyWeightBmlsAfter.push(bmls[i])
            }
        }
    }
    const sortAscendingFn = (bml1, bml2) => bml1.payload[loggedAtKey] - bml2.payload[loggedAtKey]
    nonNilBodyWeightBmlsLeadingUpTo.sort(sortAscendingFn)
    nonNilBodyWeightBmlsAfter.sort(sortAscendingFn)
    if (nonNilBodyWeightBmlsLeadingUpTo.length > 0) {
        const nearestLeadingUpToBml = nonNilBodyWeightBmlsLeadingUpTo[nonNilBodyWeightBmlsLeadingUpTo.length - 1]
        if (nonNilBodyWeightBmlsAfter.length > 0) {
            const nearestLeadingUpToLoggedAt = nearestLeadingUpToBml.payload[loggedAtKey]
            const nearestAfterBml = nonNilBodyWeightBmlsAfter[0]
            const nearestAfterLoggedAt = nearestAfterBml.payload[loggedAtKey]
            if ((nearestTo - nearestLeadingUpToLoggedAt) < (nearestAfterLoggedAt - nearestTo)) {
                return nearestLeadingUpToBml
            } else {
                return nearestAfterBml
            }
        } else {
            return nearestLeadingUpToBml
        }
    } else {
        return nonNilBodyWeightBmlsAfter[0];
    }
}

const caloriesBurnedForBodyWeightLbs = (bodyWeightLbs, durationSeconds, vigorous) => {
    let vigorousMultiplier
    if (vigorous) {
        vigorousMultiplier = 0.024
    } else {
        vigorousMultiplier = 0.012
    }
    // why 30?  Because the Harvard study gave samples at 30lb intervals
    // http://www.health.harvard.edu/diet-and-weight-loss/calories-burned-in-30-minutes-of-leisure-and-routine-activities
    return ((bodyWeightLbs / 30) * vigorousMultiplier) * durationSeconds
}

const workoutForDescendingSets = (descendingSets, nearestBml, userSettings, allMovements, allMuscleGroups, allMuscles) => {
    const bodyWeightLbs = weightValue(nearestBml.payload["bodyjournallog/body-weight"],
                                      nearestBml.payload["bodyjournallog/body-weight-uom"],
                                      LBS.id)
    let firstSet = null
    const lastSet = descendingSets[0]
    const numSets = descendingSets.length
    if (numSets > 1) {
        firstSet = descendingSets[numSets - 1]
    }
    let startDate
    const endDate = lastSet.payload["set/logged-at"]
    if (firstSet != null) {
        startDate = firstSet.payload["set/logged-at"] - 30000 // substract 30 seconds
    } else {
        startDate = lastSet.payload["set/logged-at"] - 30000 // substract 30 seconds
    }
    const workoutDurationInSeconds = (endDate - startDate) / 1000
    let numSetsToFailure = 0
    let primaryMusclePercentage = null
    const impactedMuscleGroups = {}
    let totalWorkoutWeightLifted = 0
    const muscleGroupTuples = []
    const computeImpactedMuscleGroupsFn = (muscleIds, totalWeight) => {
        const muscleGroupIds = []
        for (let i = 0; i < muscleIds.length; i++) {
            const muscle = allMuscles[muscleIds[i]]
            muscleGroupIds.push(muscle.payload["muscle/muscle-group-id"])
        }
        if (muscleGroupIds.length > 0) {
            let perMuscleGroupAmount = totalWeight / muscleGroupIds.length
            for (let i = 0; i < muscleGroupIds.length; i++) {
                let totalMuscleGroupWeight = impactedMuscleGroups[muscleGroupIds[i]]
                if (totalMuscleGroupWeight == null) {
                    totalMuscleGroupWeight = 0
                }
                totalMuscleGroupWeight += perMuscleGroupAmount
                impactedMuscleGroups[muscleGroupIds[i]] = totalMuscleGroupWeight
            }
        }
    }
    for (let i = 0; i < descendingSets.length; i++) {
        const set = descendingSets[i]
        if (set.payload["set/to-failure"]) {
            numSetsToFailure++
        }
        const weight = weightValue(set.payload["set/weight"], set.payload["set/weight-uom"], userSettings.payload["usersettings/weight-uom"])
        const numReps = set.payload["set/num-reps"]
        const totalWeight = weight * numReps
        totalWorkoutWeightLifted += totalWeight
        const movement = allMovements[set.payload["set/movement-id"]]
        let primaryMusclesTotalWeight
        if (movement.payload["movement/secondary-muscle-ids"].length > 0) {
            primaryMusclesTotalWeight = totalWeight * PRIMARY_MUSCLE_PERCENTAGE
        } else {
            primaryMusclesTotalWeight = totalWeight
        }
        const secondaryMusclesTotalWeight = totalWeight - primaryMusclesTotalWeight
        computeImpactedMuscleGroupsFn(movement.payload["movement/primary-muscle-ids"], primaryMusclesTotalWeight)
        computeImpactedMuscleGroupsFn(movement.payload["movement/secondary-muscle-ids"], secondaryMusclesTotalWeight)
    }
    const muscleGroupIds = _.keys(impactedMuscleGroups)
    for (let i = 0; i < muscleGroupIds.length; i++) {
        const muscleGroupId = muscleGroupIds[i]
        const muscleGroup = allMuscleGroups[muscleGroupId]
        const muscleGroupWeight = impactedMuscleGroups[muscleGroupId]
        const percentageOfTotalWorkout = muscleGroupWeight / totalWorkoutWeightLifted
        muscleGroupTuples.push([muscleGroupId, percentageOfTotalWorkout, muscleGroup.payload["musclegroup/name"]])
    }
    muscleGroupTuples.sort((t1, t2) => {
        const percentageOfTotalT1 = t1[1]
        const percentageOfTotalT2 = t2[1]
        return percentageOfTotalT2 - percentageOfTotalT1
    })
    const toFailurePercentage = numSetsToFailure / numSets
    const vigorousWorkout = toFailurePercentage >= 0.75
    // When iOS does: NSInteger workoutDurationInSeconds = [startDate secondsEarlierThan:endDate], the implementation of
    // 'secondsEarlierThan:' takes the floor of the result, so that's why we do it here.
    const caloriesBurned = caloriesBurnedForBodyWeightLbs(bodyWeightLbs, Math.floor(workoutDurationInSeconds), vigorousWorkout)
    const workout = {}
    workout.startDate = startDate
    workout.endDate = endDate
    workout.durationSeconds = workoutDurationInSeconds
    workout.caloriesBurned = caloriesBurned
    workout.impactedMuscleGroupTuples = muscleGroupTuples
    return workout
}

export const workoutsTupleForDescendingSets = (descendingSets, userSettings, allMovements, allMuscleGroups, allMuscles, allBmlsArray) => {
    let nextSetLoggedAt = null
    const numSets = descendingSets.length
    const workouts = []
    let latestSetLoggedAt = null
    if (numSets > 0) {
        latestSetLoggedAt = descendingSets[0].payload["set/logged-at"]
        let setsForWorkout = []
        for (let i = 0; i < numSets; i++) {
            const set = descendingSets[i]
            const loggedAt = set.payload["set/logged-at"]
            if (nextSetLoggedAt != null) {
                const secondsLaterThan = (nextSetLoggedAt - loggedAt) / 1000
                if (secondsLaterThan < 3600) { // 3600 = seconds in an hour
                    setsForWorkout.push(set)
                    nextSetLoggedAt = loggedAt
                } else {
                    const nearestBml = nearestBmlWithNonNilBodyWeight(allBmlsArray, nextSetLoggedAt)
                    workouts.push(workoutForDescendingSets(setsForWorkout, nearestBml, userSettings, allMovements, allMuscleGroups, allMuscles))
                    setsForWorkout = []
                    setsForWorkout.push(set)
                    nextSetLoggedAt = loggedAt
                }
            } else {
                setsForWorkout.push(set)
                nextSetLoggedAt = loggedAt
            }
        }
        const loggedAt = setsForWorkout[setsForWorkout.length - 1].payload["set/logged-at"]
        const nearestBml = nearestBmlWithNonNilBodyWeight(allBmlsArray, loggedAt)
        workouts.push(workoutForDescendingSets(setsForWorkout, nearestBml, userSettings, allMovements, allMuscleGroups, allMuscles))
    }
    return [workouts, numSets > 0 ? latestSetLoggedAt : null, numSets]
}

export const descendingWorkouts = (descendingSets, userSettings, allMovements, allMuscleGroups, allMuscles) => {
    let nextSetLoggedAt = null
    const numSets = descendingSets.length
    const workouts = []
    let latestSetLoggedAt = null
    if (numSets > 0) {

    }
    return workouts
}

// http://stackoverflow.com/a/2901298/1034895
export const numberWithCommas = x => {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export const respVal = (screenWidthVal, ipadProLargerVal, ipadVal, iphone6PlusVal, iphone6Val, iphone5SmallerVal) => {
    if (screenWidthVal > 1023) { // ipad pro and larger
        return ipadProLargerVal
    } else if (screenWidthVal > MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
        return ipadVal
    } else if (screenWidthVal > 411) { // iphone 6 plus
        return iphone6PlusVal
    } else if (screenWidthVal > 374) { // iphone 6
        return iphone6Val
    } else { // iphone 5 and similar
        return iphone5SmallerVal
    }
}


export const respImage = (imageName, screenWidthVal) => {

    if (screenWidthVal > MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
        return "/images/" + imageName + "-size_ipad.png"
    } else if (screenWidth > 411) { // iphone 6 plus
        return "/images/" + imageName + "-size_iphone_5.png"
    } else if (screenWidth > 374) { // iphone 6
        return "/images/" + imageName + "-size_iphone_5.png"
    } else { // iphone 5 and similar
        return "/images/" + imageName + "-size_iphone_5.png"
    }

    /*if (screenWidthVal > MAX_DEVICE_WIDTH_THRESHOLD) {
        return "/images/" + imageName + "-100.png"
    } else {
        return "/images/" + imageName + "-75.png"
    }*/
}

export const addWebOrigDevice = (request, keyPrefix) => {
    request[keyPrefix + "/origination-device-id"] = ORIG_DEVICE_ID_WEB
}

export const renderMovementAsSuggestion = movement => {
    return (
        <div className="suggestion-content">
          <div><strong>{movement.payload["movement/canonical-name"]}</strong></div>
            {(() => {
                const aliases = movement.payload["movement/aliases"]
                if (aliases != null && aliases.length > 0) {
                    let aliasStrings = []
                    aliasStrings.push(<span key="0">{"also known as: "}</span>)
                    for (let i = 0; i < aliases.length; i++) {
                        aliasStrings.push(<span key={"a" + i}><strong>{aliases[i]}</strong></span>)
                        if (i + 2 < aliases.length) {
                            aliasStrings.push(<span key={"c" + i}>, </span>)
                        } else if (i + 1 < aliases.length) {
                            aliasStrings.push(<span key={"and" + i}> and </span>)
                        }
                    }
                    return (
                        <div style={{fontSize: "70%", marginTop: 4}}>
                            {aliasStrings}
                        </div>
                    )
                }
             })()
            }
        </div>
    )
}

export const computeMovementSuggestions = (searchText, movementsArray) => {
    const escapeRegexCharacters = str => str.replace("/[.*+?^${}()|[\]\\]/g", '\\$&')
    const escapedSearchText = escapeRegexCharacters(searchText.trim())
    if (escapedSearchText === '') {
        return []
    }
    const regex = new RegExp('\\b' + escapedSearchText, 'i')
    const searchResults = []
    const movementMatches = movementsArray.filter(movement => {
        let isMatch = regex.test(movement.payload["movement/canonical-name"])
        if (!isMatch) {
            const aliases = movement.payload["movement/aliases"]
            for (let i = 0; i < aliases.length && !isMatch; i++) {
                isMatch = regex.test(aliases[i])
            }
        }
        return isMatch
    })
    return movementMatches
}

export const refundAmountDollarsTwoPlaces = (userLastInvoiceAmount, userLastInvoiceAt) => {
    const userLastInvoiceAtMoment = moment(userLastInvoiceAt)
    const now = moment()
    const daysSinceLastInvoice = now.diff(userLastInvoiceAtMoment, 'days')
    return _.round((userLastInvoiceAmount - ((userLastInvoiceAmount / 365) * daysSinceLastInvoice)) / 100, 2).toFixed(2)
}

export const filterByDateRange = (entities, loggedAtKey, startDateInclusive, endDateInclusive) => {
    const dates = []
    for (let i = 0; i < entities.length; i++) {
        const loggedAt = entities[i].payload[loggedAtKey]
        if (loggedAt >= startDateInclusive) {
            if (endDateInclusive == null || loggedAt <= endDateInclusive) {
                dates.push(entities[i])
            }
        }
    }
    return dates
}

export const numImported = (entities, importedAtKey) => {
    let num = 0
    const entityIds = _.keys(entities)
    for (let i = 0; i < entityIds.length; i++) {
        const entityPayload = entities[entityIds[i]].payload
        if (entityPayload[importedAtKey] != null) {
            num++;
        }
    }
    return num;
}

export const numImportedSets = sets => numImported(sets, "set/imported-at");

export const numImportedBmls = bmls => numImported(bmls, "bodyjournallog/imported-at");

export const trackModalView = (containerUrl, modalName) => {
    ReactGA.modalview(containerUrl + "/" + modalName)
}

export const makeTrackModalViewFn = (containerUrl, modalName) => {
    return () => trackModalView(containerUrl, modalName)
}

export const trackAboutSynchronizeAccountModalViewed = containerUrl => {
    trackModalView(containerUrl, "about-synchronize-account")
}

export const GA_EVENT_CATEGORY_USER = "user"

export const trackEventSynchronizedAccount = label => {
    ReactGA.event({
        category: GA_EVENT_CATEGORY_USER,
        action: "synchronized account",
        label: label
    })
}

export const CANCEL_REASONS = [
    {name: "Don't use it enough",                    id: 1 << 1},
    {name: "Too cumbersome to record sets and logs", id: 1 << 2},
    {name: "Unhelpful stats and graphs",             id: 1 << 3},
    {name: "Too buggy and unstable",                 id: 1 << 4},
    {name: "Too confusing to use",                   id: 1 << 5}
]

export const FREE_TRIAL_PERIOD_IN_DAYS = 90
export const COST_IN_USD = process.env.RIKER_SUBSCRIPTION_IN_CENTS / 100.0

export const LAST_CYCLE_SET_TOO_OLD = { val: 1, units: "hours" }

export const setCsvFields = (movements, movementVariants, originationDevices) => [
    { label: "Logged",
      valueKey: "set/logged-at",
      formatter: loggedAt => moment(loggedAt).format("YYYY-MM-DD hh:mm:ss")},
    { label: "Logged Unix Time",
      valueKey: "set/logged-at",
      formatter: time => "'" + time + "'"
    },
    { label: "Movement",
      valueKey: "set/movement-id",
      formatter: movementId => movements[movementId].payload['movement/canonical-name']},
    { label: "Movement ID", valueKey: "set/movement-id" },
    { label: "Variant",
      valueKey: "set/movement-variant-id",
      formatter: movementVariantId => movementVariantId != null ? movementVariants[movementVariantId].payload['movementvariant/name'] : ""},
    { label: "Variant ID", valueKey: "set/movement-variant-id" },
    { label: "Weight", valueKey: "set/weight" },
    { label: "Weight UOM",
      valueKey: "set/weight-uom",
      formatter: weightUom => WEIGHT_UNIT_NAMES()[weightUom] },
    { label: "Weight UOM ID", valueKey: "set/weight-uom" },
    { label: "To Failure?", valueKey: "set/to-failure" },
    { label: "Negatives?", valueKey: "set/negatives" },
    { label: "Ignore Time Component?", valueKey: "set/ignore-time" },
    { label: "Reps", valueKey: "set/num-reps" },
    { label: "Origination Device",
      valueKey: "set/origination-device-id",
      formatter: originationDeviceId => originationDevices[originationDeviceId].payload['originationdevice/name'] },
    { label: "Origination Device ID", valueKey: "set/origination-device-id" }
]

export const bodyJournalLogCsvFields = originationDevices => [
    { label: "Logged",
      valueKey: "bodyjournallog/logged-at",
      formatter: loggedAt => moment(loggedAt).format("YYYY-MM-DD")},
    { label: "Logged Unix Time",
      valueKey: "bodyjournallog/logged-at",
      formatter: time => "'" + time + "'",
    },
    { label: "Body Weight", valueKey: "bodyjournallog/body-weight" },
    { label: "Body Weight UOM",
      valueKey: "bodyjournallog/body-weight-uom",
      formatter: bodyWeightUom => WEIGHT_UNIT_NAMES()[bodyWeightUom]
    },
    { label: "Body Weight UOM ID", valueKey: "bodyjournallog/body-weight-uom" },
    { label: "Calf Size", valueKey: "bodyjournallog/calf-size" },
    { label: "Chest Size", valueKey: "bodyjournallog/chest-size" },
    { label: "Arm Size", valueKey: "bodyjournallog/arm-size" },
    { label: "Neck Size", valueKey: "bodyjournallog/neck-size" },
    { label: "Waist Size", valueKey: "bodyjournallog/waist-size" },
    { label: "Thigh Size", valueKey: "bodyjournallog/thigh-size" },
    { label: "Forearm Size", valueKey: "bodyjournallog/forearm-size" },
    { label: "Size UOM",
      valueKey: "bodyjournallog/size-uom",
      formatter: sizeUom => LENGTH_UNIT_NAMES()[sizeUom]
    },
    { label: "Size UOM ID", valueKey: "bodyjournallog/size-uom" },
    { label: "Origination Device",
      valueKey: "bodyjournallog/origination-device-id",
      formatter: originationDeviceId => originationDevices[originationDeviceId].payload['originationdevice/name'] },
    { label: "Origination Device ID", valueKey: "bodyjournallog/origination-device-id" }
]

export const accountStatuses = state => {
    const userPaidEnrollmentEstablishedAt = state.serverSnapshot["user/paid-enrollment-established-at"]
    const userPaidEnrollmentCancelledAt = state.serverSnapshot["user/paid-enrollment-cancelled-at"]
    const finalFailedPaymentAttemptOccurredAt = state.serverSnapshot["user/final-failed-payment-attempt-occurred-at"]
    const userTrialEndsAt = state.serverSnapshot["user/trial-ends-at"]
    const hasCancelledPaidAccount = userPaidEnrollmentCancelledAt != null
    const hasLapsedPaidAccount = finalFailedPaymentAttemptOccurredAt != null
    const hasPaidAccount = userPaidEnrollmentEstablishedAt != null
    const hasTrialAccount = userTrialEndsAt != null && !hasPaidAccount && !hasCancelledPaidAccount && !hasLapsedPaidAccount
    let isTrialPeriodExpired = false
    let isTrialPeriodAlmostExpired = false
    let userTrialEndsAtMoment = null
    if (hasTrialAccount) {
        userTrialEndsAtMoment = moment(userTrialEndsAt)
        const now = moment()
        isTrialPeriodExpired = userTrialEndsAtMoment.isBefore(now)
        if (!isTrialPeriodExpired) {
            isTrialPeriodAlmostExpired = moment(userTrialEndsAt).subtract(5, 'days').isBefore(now)
        }
    }
    const informedOfMaintenanceAt = state.serverSnapshot["user/informed-of-maintenance-at"]
    let informedOfMaintenanceAtMoment = null
    if (informedOfMaintenanceAt != null) {
        informedOfMaintenanceAtMoment = moment(informedOfMaintenanceAt)
    }
    const maintenanceStartsAt = state.serverSnapshot["user/maintenance-starts-at"]
    const maintenanceDuration = state.serverSnapshot["user/maintenance-duration"]
    let maintenanceEndsAtMoment = null
    let maintenanceStartsAtMoment = null
    if (maintenanceStartsAt != null) {
        maintenanceStartsAtMoment = moment(maintenanceStartsAt)
        maintenanceEndsAtMoment = moment(maintenanceStartsAtMoment)
        maintenanceEndsAtMoment.add(maintenanceDuration, 'minutes')
    }
    const maintenanceAckAt = state.maintenanceAckAt.value
    let maintenanceAckAtMoment = null
    if (maintenanceAckAt != null) {
        maintenanceAckAtMoment = moment(maintenanceAckAt)
    }
    const validateAppStoreReceiptAt = state.serverSnapshot["user/validate-app-store-receipt-at"]
    let hasPaidIapAccount = hasPaidAccount && validateAppStoreReceiptAt != null
    return [
        hasTrialAccount,
        isTrialPeriodAlmostExpired,
        isTrialPeriodExpired,
        hasPaidAccount,
        state.serverSnapshot["user/is-payment-past-due"],
        userTrialEndsAt,
        userTrialEndsAtMoment,
        userPaidEnrollmentEstablishedAt,
        userPaidEnrollmentCancelledAt,
        finalFailedPaymentAttemptOccurredAt,
        informedOfMaintenanceAtMoment,
        maintenanceStartsAtMoment,
        maintenanceDuration,
        maintenanceEndsAtMoment,
        maintenanceAckAtMoment,
        hasPaidIapAccount,
        validateAppStoreReceiptAt
    ]
}

export const NAVBAR_NO_BANNER_MARGIN_BOTTOM = 15
export const NAVBAR_BANNER_MARGIN_BOTTOM = 3

export const displayUpcomingMaintenanceBanner = (accountStatuses) => {
    const [
        hasTrialAccount,
        isTrialPeriodAlmostExpired,
        isTrialPeriodExpired,
        hasPaidAccount,
        isPaymentPastDue,
        userTrialEndsAt,
        userTrialEndsAtMoment,
        userPaidEnrollmentEstablishedAt,
        userPaidEnrollmentCancelledAt,
        finalFailedPaymentAttemptOccurredAt,
        informedOfMaintenanceAtMoment,
        maintenanceStartsAtMoment,
        maintenanceDuration,
        maintenanceEndsAtMoment,
        maintenanceAckAtMoment
    ] = accountStatuses
    const now = moment()
    return informedOfMaintenanceAtMoment != null &&
        now.isBefore(maintenanceStartsAtMoment) &&
        !now.isAfter(maintenanceEndsAtMoment) &&
        (maintenanceAckAtMoment == null ||
         maintenanceAckAtMoment.isBefore(informedOfMaintenanceAtMoment))
}

export const displayMaintenanceNowBanner = (accountStatuses) => {
    const [
        hasTrialAccount,
        isTrialPeriodAlmostExpired,
        isTrialPeriodExpired,
        hasPaidAccount,
        isPaymentPastDue,
        userTrialEndsAt,
        userTrialEndsAtMoment,
        userPaidEnrollmentEstablishedAt,
        userPaidEnrollmentCancelledAt,
        finalFailedPaymentAttemptOccurredAt,
        informedOfMaintenanceAtMoment,
        maintenanceStartsAtMoment,
        maintenanceDuration,
        maintenanceEndsAtMoment,
        maintenanceAckAtMoment
    ] = accountStatuses
    const now = moment()
    return now.isBetween(maintenanceStartsAtMoment, maintenanceEndsAtMoment)
}

export const navbarMarginBottom = (accountStatuses, redisplayBannerAfter) => {
    let displayBanner = redisplayBannerAfter == null
    if (!displayBanner) {
        displayBanner = moment(redisplayBannerAfter).isBefore(moment())
    }
    const [
        hasTrialAccount,
        isTrialPeriodAlmostExpired,
        isTrialPeriodExpired,
        hasPaidAccount,
        isPaymentPastDue,
        userTrialEndsAt,
        userTrialEndsAtMoment,
        userPaidEnrollmentEstablishedAt,
        userPaidEnrollmentCancelledAt,
        finalFailedPaymentAttemptOccurredAt,
        informedOfMaintenanceAtMoment,
        maintenanceStartsAtMoment,
        maintenanceDuration,
        maintenanceEndsAtMoment,
        maintenanceAckAtMoment
    ] = accountStatuses
    const hasLapsedPaidAccount = finalFailedPaymentAttemptOccurredAt != null
    const hasCancelledPaidAccount = userPaidEnrollmentCancelledAt != null
    if ((((!hasPaidAccount && hasTrialAccount && isTrialPeriodAlmostExpired) ||
          (!hasPaidAccount && hasTrialAccount && isTrialPeriodExpired) ||
          (hasPaidAccount && isPaymentPastDue && !hasLapsedPaidAccount && !hasCancelledPaidAccount) ||
          hasLapsedPaidAccount ||
          hasCancelledPaidAccount) &&
         displayBanner) ||
        displayUpcomingMaintenanceBanner(accountStatuses) ||
        displayMaintenanceNowBanner(accountStatuses)) {
        return NAVBAR_BANNER_MARGIN_BOTTOM
    }
    return NAVBAR_NO_BANNER_MARGIN_BOTTOM
}

export const editOperationAllowed = accountStatuses => {
    const [
        hasTrialAccount,
        isTrialPeriodAlmostExpired,
        isTrialPeriodExpired,
        hasPaidAccount,
        isPaymentPastDue,
        userTrialEndsAt,
        userTrialEndsAtMoment,
        userPaidEnrollmentEstablishedAt,
        userPaidEnrollmentCancelledAt,
        finalFailedPaymentAttemptOccurredAt,
        informedOfMaintenanceAtMoment,
        maintenanceStartsAtMoment,
        maintenanceDuration,
        maintenanceEndsAtMoment,
        maintenanceAckAtMoment
    ] = accountStatuses
    const hasLapsedPaidAccount = finalFailedPaymentAttemptOccurredAt != null
    const hasCancelledPaidAccount = userPaidEnrollmentCancelledAt != null
    let editOpAllowed = true
    if ((!hasPaidAccount && hasTrialAccount && isTrialPeriodExpired) ||
        hasLapsedPaidAccount ||
        hasCancelledPaidAccount) {
        editOpAllowed = false
    }
    return editOpAllowed
}

export const hasEdits = changelogCounts => {
    if (changelogCounts != null) {
        return changelogCounts.added > 0 || changelogCounts.updated > 0 || changelogCounts.deleted > 0
    }
    return false
}

export const hasUpdates = changelogCounts => {
    if (changelogCounts != null) {
        return changelogCounts.updated > 0
    }
    return false
}

export const hasInserts = changelogCounts => {
    if (changelogCounts != null) {
        return changelogCounts.added > 0
    }
    return false
}

export const mediaTypePartRegex = /application\/vnd\.riker\.(.*)-v[0-9]\.[0-9]\.[0-9]\+json/

export const movementVariantItems = (movement, movementVariants) => {
    let items = []
    const movementVariantMask = movement.payload["movement/variant-mask"]
    for (let i = 0; i < movementVariants.length; i++) {
        if (movementVariantMask & movementVariants[i].payload["movementvariant/id"]) {
            items.push(movementVariants[i])
        }
    }
    return items
}

export const CARDIO_TYPE_OTHER_ID = 0

export const makeAscendPaylaodComparator = (prop, forceLastProp, forceLastPropValue, transformFn = null) => {
    return (o1, o2) => {
        if (forceLastProp != null && forceLastPropValue != null) {
            if (o1.payload[forceLastProp] == forceLastPropValue) return 1
            if (o2.payload[forceLastProp] == forceLastPropValue) return -1
        }
        let o1Value = o1.payload[prop]
        let o2Value = o2.payload[prop]
        if (transformFn != null) {
            o1Value = transformFn(o1Value)
            o2Value = transformFn(o2Value)
        }
        if (o1Value < o2Value) {
            return -1
        }
        if (o1Value > o2Value) {
            return 1
        }
        return 0
    }
}

export const makeDescendPaylaodComparator = (prop, forceLastProp, forceLastPropValue) => {
    return (o1, o2) => {
        if (forceLastProp != null && forceLastPropValue != null) {
            if (o2.payload[forceLastProp] == forceLastPropValue) return 1
            if (o1.payload[forceLastProp] == forceLastPropValue) return -1
        }
        if (o2.payload[prop] < o1.payload[prop]) {
            return -1
        }
        if (o2.payload[prop] > o1.payload[prop]) {
            return 1
        }
        return 0
    }
}

export const weightValue = (value, uom, targetUom) => {
    if (value == null) {
        return null
    }
    if (uom == targetUom) {
        return value
    } else {
        if (uom == LBS.id) { // target is kg
            return value * 0.453592
        } else { // target is lb
            return value * 2.20462
        }
    }
}

export const lengthValue = (value, uom, targetUom) => {
    if (value == null) {
        return null
    }
    if (uom == targetUom) {
        return value
    } else {
        if (uom == INCHES.id) { // target is cm
            return value * 2.54
        } else { // target is inches
            return value * 0.393701
        }
    }
}

export const toCsv = (fields, entities, entitiesSortFn) => {
    const csvVal = (i, field, payload, formatter) => {
        let entityValue
        if (field.valueKey != null) {
            entityValue = payload[field.valueKey]
            if (formatter != null) {
                entityValue = formatter(entityValue)
            }
        } else {
            entityValue = formatter(payload)
        }
        return entityValue
    }

    const csvRow = (fields, payload) => {
        let csvRow = ""
        for (let i = 0; i < fields.length; i++) {
            const csvValue = csvVal(i, fields[i], payload, fields[i].formatter)
            csvRow += csvValue
            if (i + 1 < fields.length) {
                csvRow += ","
            }
        }
        return csvRow
    }

    const entitiesArray = _.values(entities)
    if (entitiesSortFn != null) {
        entitiesArray.sort(entitiesSortFn)
    }
    let csvRows = ""
    for (let i = 0; i < fields.length; i++) {
        csvRows += fields[i].label
        if (i + 1 < fields.length) {
            csvRows += ","
        }
    }
    csvRows += "\n"
    for (let i = 0; i < entitiesArray.length; i++) {
        const entity = entitiesArray[i]
        const entityPayload = entity.payload
        csvRows += csvRow(fields, entityPayload)
        if (i + 1 < entitiesArray.length) {
            csvRows += "\n"
        }
    }
    return csvRows
}

export const MALE = "Male"
export const FEMALE = "Female"
export const GENDERS = [MALE, FEMALE]

export const isMaleGender = genderVal => genderVal == MALE
export const toGenderDisplay = isMaleGender => isMaleGender ? MALE : FEMALE

export const LBS = {id: 0, display: "lbs"}
export const KG  = {id: 1, display: "kg"}
export const WEIGHT_UNITS = [LBS.display, KG.display]
export const WEIGHT_UNIT_NAMES = () => {
    const names = {}
    names[LBS.id] = LBS.display
    names[KG.id] = KG.display
    return names
}

export const INCHES = {id: 0, display: "in"}
export const CM     = {id: 1, display: "cm"}
export const LENGTH_UNITS = [INCHES.display, CM.display]
export const LENGTH_UNIT_NAMES = () => {
    const names = {}
    names[INCHES.id] = INCHES.display
    names[CM.id] = CM.display
    return names
}

export const MI = {id: 0, display: "miles"}
export const KM = {id: 1, display: "kilometers"}
export const DISTANCE_UNITS = [MI.display, KM.display]

export function toWeightUnitsDisplay(unitValue) {
    if (unitValue == LBS.id) {
        return LBS.display
    }
    return KG.display
}

export function toWeightUnitsValue(unitDisplay) {
    if (unitDisplay == LBS.display) {
        return LBS.id
    }
    return KG.id
}

export function toLengthUnitsDisplay(unitValue) {
    if (unitValue == INCHES.id) {
        return INCHES.display
    }
    return CM.display
}

export function toLengthUnitsValue(unitDisplay) {
    if (unitDisplay == INCHES.display) {
        return INCHES.id
    }
    return CM.id
}

export function toDistanceUnitsDisplay(unitValue) {
    if (unitValue == MI.id) {
        return MI.display
    }
    return KM.display
}

export function toDistanceUnitsValue(unitDisplay) {
    if (unitDisplay == MI.display) {
        return MI.id
    }
    return KM.id
}

export const toFailureModalContent = props => {
    return (<p>Did you do as many reps as possible (<strong>to failure</strong>), or did you have more in you?</p>)
}

export function userSettings(state) {
    const userSettingsAsArray = _.values(state.serverSnapshot._embedded["usersettings"])
    if (userSettingsAsArray.length > 0) {
        return userSettingsAsArray[0]
    }
    return null
}

export function childrenEntitiesByParentId(state, parentId, childrenKey, childParentKey) {
    let childrenArray = _.values(state.serverSnapshot._embedded[childrenKey])
    let relevantChildren = []
    for (let i = 0; i < childrenArray.length; i++) {
        if (childrenArray[i].payload[childParentKey] == parentId) {
            relevantChildren.push(childrenArray[i])
        }
    }
    return relevantChildren
}

export function childrenEntities(state, parentIdStateKey, childrenKey, childParentKey) {
    return childrenEntitiesByParentId(state,
                                      state.selectionContext[parentIdStateKey],
                                      childrenKey,
                                      childParentKey)
}

export function musclesForMuscleGroupId(state, muscleGroupId) {
    return childrenEntitiesByParentId(state, muscleGroupId, "muscles", "muscle/muscle-group-id")
}

export function movementsForMuscleGroup(allMovementsArray, muscleGroupId, state) {
    const muscles = musclesForMuscleGroupId(state, muscleGroupId)
    const relevantMovements = []
    for (let i = 0; i < allMovementsArray.length; i++) {
        let isRelevant = false
        const primaryMuscleIds = allMovementsArray[i].payload["movement/primary-muscle-ids"]
        for (let j = 0; j < primaryMuscleIds.length; j++) {
            if (_.find(muscles, muscle => muscle.payload["muscle/id"] == primaryMuscleIds[j]) != undefined) {
                isRelevant = true
                break
            }
        }
        if (isRelevant) {
            relevantMovements.push(allMovementsArray[i])
        }
    }
    return relevantMovements
}

export function toXY(fpEmbeddedObj,
                     srcXKeyName,
                     srcYKeyName,
                     includeFn) {
    let data = []
    const embeddedValues = _.values(fpEmbeddedObj)
    for (let i = 0; i < embeddedValues.length; i++) {
        if (includeFn(embeddedValues[i].payload)) {
            const yValue = embeddedValues[i].payload[srcYKeyName]
            if (yValue != null) {
                data.push({x: embeddedValues[i].payload[srcXKeyName],
                           y: yValue})
            }
        }
    }
    data.sort((o1, o2) => { return o2.x - o1.x })
    return data
}

String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
              'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
                          function(txt) {
                              return txt.toLowerCase();
                          });
    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
                          uppers[i].toUpperCase());
    return str;
}

export const SUPPORT_EMAIL = "support@rikerapp.com"

export const FROM_SERVER_QUERY_PARAM = "fromsrvr"

export const CURRENCY_FORMAT = "$0,0.00"

export const CHARTJS_POINT_BG_COLOR = "#71a0ec"
export const CHARTJS_FILL_BG_COLOR  = "#BEEDFF"
export const CHARTJS_POINT_RADIUS = 2

export const CHARTJS_QUARTER_DATE_DISPLAY_FORMAT = "MMM YYYY"

export const DATE_DISPLAY_FORMAT = "MM/DD/YYYY"
export const DATE_EDIT_FORMAT    = "MM/DD/YYYY"

export const DATETIME_DISPLAY_FORMAT = "MM/DD/YYYY, h:mm:ss a"
export const DATETIME_EDIT_FORMAT    = "MM/DD/YYYY, h:mm:ss a"

export const PWD_RESET_ERRORS = [
    { flag: errFlags.PWD_RESET_TOKEN_NOT_FOUND,
      message: "Invalid password reset link."},
    { flag: errFlags.PWD_RESET_TOKEN_FLAGGED,
      message: "Invalid (flagged) password reset link."},
    { flag: errFlags.PWD_RESET_TOKEN_EXPIRED,
      message: "Expired password reset link."},
    { flag: errFlags.PWD_RESET_TOKEN_ALREADY_USED,
      message: "Password reset link already used."},
    { flag: errFlags.PWD_RESET_TOKEN_NOT_PREPARED,
      message: "Invalid password reset link."}
]

export function formatDate(moment, dateAsLongSince1970) {
    return moment(dateAsLongSince1970).format(DATE_DISPLAY_FORMAT)
}

export function formatDateTime(moment, dateAsLongSince1970) {
    return moment(dateAsLongSince1970).format(DATETIME_DISPLAY_FORMAT)
}

export function toMoment(moment, dateAsString) {
    return moment(dateAsString, DATE_DISPLAY_FORMAT)
}

export function toUnixEpoch(moment, dateAsString) {
    return toMoment(moment, dateAsString).valueOf()
}

export function makeLoginHandler(location, handleSubmit) {
    var nextSuccessPathname = "/";
    if (location != null && location.state && location.state.nextPathname) {
        nextSuccessPathname = location.state.nextPathname
    }
    return function() { handleSubmit(nextSuccessPathname) }
}

export const cannotBeEmptyValidator = (values, errors, fieldName) => {
    if (values[fieldName] == null || _.isEmpty(_.trim(values[fieldName]))) {
        errors[fieldName] = "Cannot be empty."
    }
}

export const cannotBeUnselectedValidator = (values, errors, fieldName, errMessage) => {
    if ((values[fieldName] == null) || _.isEmpty(_.trim(values[fieldName]))) {
        errors[fieldName] = errMessage
        return true
    }
    return false
}

export const mustBeNumberValidator = (values, errors, fieldName) => {
    if (values[fieldName]) {
        const trimmedValue = _.trim(values[fieldName])
        if (!_.isEmpty(trimmedValue) && isNaN(Number(trimmedValue))) {
            errors[fieldName] = "Must be a number."
        }
    }
}

export const mustBePositiveNumberValidator = (values, errors, fieldName) => {
    if (values[fieldName] == 0) {
        errors[fieldName] = "Must be a positive number."
        return
    }
    if (values[fieldName]) {
        const trimmedValue = _.trim(values[fieldName])
        if (!_.isEmpty(trimmedValue) && isNaN(Number(trimmedValue))) {
            errors[fieldName] = "Must be a number."
        } else if (Number(trimmedValue) <= 0) {
            errors[fieldName] = "Must be a positive number."
        }
    }
}

export const mustBeDateValidator = (values, errors, fieldName) => {
    if (values[fieldName] != null) {
        const trimmedValue = _.trim(values[fieldName])
        if (!moment(trimmedValue, DATE_DISPLAY_FORMAT).isValid()) {
            errors[fieldName] = "Must be a valid date."
        }
    }
}

export const mustBeEmailValidator = (values, errors, fieldName) => {
    if (values[fieldName] != null) {
        const trimmedValue = _.trim(values[fieldName])
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(trimmedValue)) {
            errors[fieldName] = 'Must be a valid email address.'
        }
    }
}

export const formToModelIfNotNull = (form, formKey, target, targetKey, tailKey = null, transformer = null) => {
    if (form[formKey].value != null) {
        if (form[formKey].touched != null && form[formKey].touched) {
            let formValue = null
            if (tailKey != null) {
                // even though we have a tail key, first try just the formKey,
                // and if that has a value, use it; otherwise then try the tail key
                if (form[formKey].value != null && _.isNumber(form[formKey].value)) {
                    formValue = form[formKey].value
                } else if (form[formKey].value[tailKey] != null) {
                    formValue = form[formKey].value[tailKey]
                }
            } else {
                if (form[formKey].value != null) {
                    formValue = form[formKey].value
                }
            }
            if (formValue != null) {
                if (!_.isEmpty(_.trim(formValue))) {
                    if (transformer != null) {
                        target[targetKey] = transformer(formValue)
                    } else {
                        target[targetKey] = formValue
                    }
                } else {
                    target[targetKey] = null
                }
            }
        }
    }
}

export const modelToFormModelIfNotNull = (formModel, formKey, model, modelKey, transformer = null) => {
    const val = model[modelKey]
    if (val != null) {
        if (transformer != null) {
            formModel[formKey] = transformer(val)
        } else {
            formModel[formKey] = val
        }
    }
}

export const toDropdownValues = (entities, valueKey, displayKey, groupByKey = null) => {
    let dropdownValues = []
    let values = _.values(entities)
    for (let i = 0; i < values.length; i++) {
        const dropDownValue = toDropdownValue(values[i]["payload"], valueKey, displayKey, groupByKey)
        dropdownValues.push(dropDownValue)
    }
    return dropdownValues
}

export const toDropdownValue = (entityPayload, valueKey, displayKey, groupByKey = null) => {
    let dropdownValue = null
    if (entityPayload != null) {
        dropdownValue = {}
        dropdownValue[valueKey] = entityPayload[valueKey]
        dropdownValue[displayKey] = entityPayload[displayKey]
        dropdownValue[groupByKey] = entityPayload[groupByKey]
    }
    return dropdownValue
}

export const toUserFormModel = userPayload => {
    let formModel = {}
    const userModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, userPayload, modelKey, transformer)
    }
    userModelToFormModel("name",  "user/name")
    userModelToFormModel("email", "user/email")
    userModelToFormModel("origEmail", "user/email")
    return formModel
}

export const toSettingsFormModel = settingsPayload => {
    let formModel = {}
    const settingsModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, settingsPayload, modelKey, transformer)
    }
    settingsModelToFormModel("weightUom", "usersettings/weight-uom", uomValue => toWeightUnitsDisplay(uomValue))
    settingsModelToFormModel("sizeUom", "usersettings/size-uom", uomValue => toLengthUnitsDisplay(uomValue))
    settingsModelToFormModel("distanceUom", "usersettings/distance-uom", uomValue => toDistanceUnitsDisplay(uomValue))
    settingsModelToFormModel("weightIncDecAmount", "usersettings/weight-inc-dec-amount")
    return formModel
}

export const toBodyJournalLogFormModel = bodyJournalLogPayload => {
    momentLocalizer(moment)
    let formModel = {}
    const bodyJournalLogModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, bodyJournalLogPayload, modelKey, transformer)
    }
    bodyJournalLogModelToFormModel("originationDeviceId", "bodyjournallog/origination-device-id")
    bodyJournalLogModelToFormModel("bodyWeight", "bodyjournallog/body-weight", value => value.toFixed(1))
    bodyJournalLogModelToFormModel("bodyWeightUom", "bodyjournallog/body-weight-uom", uomValue => toWeightUnitsDisplay(uomValue))
    bodyJournalLogModelToFormModel("armSize", "bodyjournallog/arm-size", value => value.toFixed(1))
    bodyJournalLogModelToFormModel("chestSize", "bodyjournallog/chest-size", value => value.toFixed(1))
    bodyJournalLogModelToFormModel("calfSize", "bodyjournallog/calf-size", value => value.toFixed(1))
    bodyJournalLogModelToFormModel("neckSize", "bodyjournallog/neck-size", value => value.toFixed(1))
    bodyJournalLogModelToFormModel("forearmSize", "bodyjournallog/forearm-size", value => value.toFixed(1))
    bodyJournalLogModelToFormModel("waistSize", "bodyjournallog/waist-size", value => value.toFixed(1))
    bodyJournalLogModelToFormModel("thighSize", "bodyjournallog/thigh-size", value => value.toFixed(1))
    bodyJournalLogModelToFormModel("sizeUom", "bodyjournallog/size-uom", uomValue => toLengthUnitsDisplay(uomValue))
    bodyJournalLogModelToFormModel("loggedAt", "bodyjournallog/logged-at", loggedAt => formatDate(moment, loggedAt))
    return formModel
}

export const toSetFormModel = setPayload => {
    let formModel = {}
    momentLocalizer(moment)
    const setModelToFormModel = (formKey, modelKey, transformer = null) => {
        modelToFormModelIfNotNull(formModel, formKey, setPayload, modelKey, transformer)
    }
    setModelToFormModel("originationDeviceId", "set/origination-device-id")
    setModelToFormModel("movementId",        "set/movement-id")
    setModelToFormModel("movementVariantId", "set/movement-variant-id")
    setModelToFormModel("reps",              "set/num-reps")
    setModelToFormModel("weight",            "set/weight")
    setModelToFormModel("uom",               "set/weight-uom", uomValue => toWeightUnitsDisplay(uomValue))
    setModelToFormModel("loggedAt",          "set/logged-at", loggedAt => {
        if (setPayload["set/ignore-time"]) {
            return formatDate(moment, loggedAt)
        } else {
            return formatDateTime(moment, loggedAt)
        }
    })
    setModelToFormModel("toFailure",         "set/to-failure")
    setModelToFormModel("ignoreTime",        "set/ignore-time")
    setModelToFormModel("negatives",         "set/negatives")
    return formModel
}

export function countDependents(state, childrenKey, parentIdKey, parentId) {
    let children = _.values(state.serverSnapshot._embedded[childrenKey])
    let numMatch = 0
    for (let i = 0; i < children.length; i++) {
        if (children[i].payload[parentIdKey] == parentId) {
            numMatch++
        }
    }
    return numMatch
}

export function makeNeedToAddTextLinkObj(editMode, question, url, initFn = null) {
    return editMode ? { question: question,
                        url: url,
                        initFn: initFn } : null
}

export function mostRecentUpdatedAtEntity(entities, updatedAtKey) {
    const mostRecentlyUpdatedEntity = _.maxBy(entities, entity => {
        return entity.payload[updatedAtKey]
    })
    if (mostRecentlyUpdatedEntity != null) {
        return mostRecentlyUpdatedEntity.payload[updatedAtKey]
    }
    return null
}

export function mostRecentUpdatedAt(userUpdatedAt, entityCollections) {
    let dates = []
    dates.push(userUpdatedAt)
    for (let i = 0; i < entityCollections.length; i++) {
        const entities = entityCollections[i][0]
        const updatedAtKey = entityCollections[i][1]
        dates.push(mostRecentUpdatedAtEntity(entities, updatedAtKey))
    }
    return _.max(dates)
}
