from hero_definition import Hero
from typing import Literal, List
from fastapi import APIRouter, HTTPException, status

heroes: List[Hero] = []#fake db

router = APIRouter()

@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_hero(hero: Hero):
    if found_hero(hero.name) == None:
        heroes.append(hero)
    else:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="There is another hero with the same name")


@router.get("/heroes", response_model=List[Hero],status_code=status.HTTP_200_OK)
def get_heroes():
    return heroes


@router.get("/{hero_name}", response_model=Hero, status_code=status.HTTP_200_OK)
def get_hero(hero_name:str):
    hero = found_hero(hero_name) 
    if hero == None:
        return hero
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hero not found")


def found_hero(hero_name:str):
    for hero in heroes:
        if hero_name == hero.name:
            return hero
    else:
        return None