from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
import sqlalchemy as sqla
from sqlalchemy.orm import Session
from database import get_db
from db_models import Pitch
from models import Batter, Batters, BatterEvents


router = APIRouter(tags=["Pitches"], prefix="/api")

sd = "San Diego Padres"


@router.get("/pitches/all")
def get_all_pitches(db: Session = Depends(get_db)):
    """
    Get all rows(pitches) in the database, with most original properties. Currently limited to 10 results for faster querying. Unused.
    """
    try:
        pitches = db.query(Pitch).limit(10).all()
    except:
        raise HTTPException(
            status_code=500,
            detail=f"Could not retrieve pitches",
        )

    return {"pitches": pitches}


# get a list of Padres batters
@router.get("/batters/padres", response_model=Batters)
def get_padres_batters(db: Session = Depends(get_db)):
    """
    Get all Padres batters.

    Returns an object containing a list of Batter objects representing Padres batters in the dataset.
    """
    try:
        batters = (
            db.query(
                Pitch.batter_bam_id, Pitch.batter_name_first, Pitch.batter_name_last
            )
            .filter(Pitch.batter_team == sd)
            .group_by(Pitch.batter_bam_id)
            .order_by(Pitch.batter_name_last)
            .all()
        )
    except:
        raise HTTPException(
            status_code=500,
            detail=f"Could not retrieve batters",
        )

    return {"batters": batters}


@router.get("/batters/{batter_bam}/events", response_model=BatterEvents)
def get_batter_events(batter_bam: int, db: Session = Depends(get_db)):
    """
    Get counts of various batter outcomes, separated by home and away games, by player.
    """
    try:
        bat_events = (
            db.query(
                Pitch.batter_bam_id,
                Pitch.batter_name_first,
                Pitch.batter_name_last,
                Pitch.event_type,
                Pitch.bottom,
                sqla.func.count(Pitch.event_type).label("event_counts"),
            )
            .filter(
                sqla.and_(Pitch.batter_bam_id == batter_bam, Pitch.terminating == True)
            )
            .group_by(Pitch.event_type, Pitch.bottom)
            .all()
        )
    except:
        raise HTTPException(
            status_code=500,
            detail=f"Could not retrieve batter events",
        )

    if not bat_events:
        raise HTTPException(
            status_code=404, detail="Player not found or no bat events found for player"
        )

    event_categories = {
        "strikeout",
        "single",
        "double",
        "triple",
        "home_run",
        "walk",
        "field_out",
    }
    home_events = {x: 0 for x in event_categories}
    away_events = {x: 0 for x in event_categories}

    for p in bat_events:
        if p.event_type in event_categories:
            if p.bottom == True:
                home_events[p.event_type] = p.event_counts
            elif p.bottom == False:
                away_events[p.event_type] = p.event_counts

    return {
        "batter": Batter(
            batter_bam_id=bat_events[0].batter_bam_id,
            batter_name_first=bat_events[0].batter_name_first,
            batter_name_last=bat_events[0].batter_name_last,
        ),
        "home_events": home_events,
        "away_events": away_events,
    }