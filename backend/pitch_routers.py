from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    # Request,
)
import sqlalchemy as sqla
from sqlalchemy.orm import Session
from database import get_db
from db_models import Pitch
from models import Batters


router = APIRouter(tags=["Pitches"], prefix="/api")

petco_park_bam_id = 2680
sd = "San Diego Padres"
padres_batter_team_bam_id = 135


# limited for now
@router.get("/pitches/all")
def get_all_pitches(db: Session = Depends(get_db)):
    try:
        pitches = db.query(Pitch).limit(10).all()
    except:
        raise HTTPException(
            status_code=500,
            detail=f"Could not retrieve pitches",
        )

    return {"pitches": pitches}


# just get a list of padres batters
@router.get("/batters/padres", response_model=Batters)
def get_padres_batters(db: Session = Depends(get_db)):
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
            detail=f"Could not retrieve pitches",
        )

    return {"batters": batters}


# @router.get("pitches/to-padres")
# def get_padres_batters(db: Session = Depends(get_db)):
#     try:
#         pass
#     except:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Could not retrieve pitches",
#         )
