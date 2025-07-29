from pydantic import BaseModel, Field
from typing import Literal, List

class Hero(BaseModel):
    race: Literal["Osamodas", "Cra", "Iop", "Ecaflip", "Sadida", "Enutrof", "Sram", "Xelor", "Feca", "Pandawa", "Sacrier", "Steamer", "Enirispa", "Roublard", "Zobal", "Eliotrope", "Huppermago", "Kilorf", "Forjalanças"]
    name: str
    level: int = Field(default=1, ge=1, le=200, description="Level of the hero")
    hp: int = Field(default=55, ge=1, le=1000000, description="Health Points (HP) of the hero")

    power_damage: int = Field(default=0, description="Power damage of the hero")
    earth_damage: int = Field(default=0, description="Earth damage of the hero")
    fire_damage: int = Field(default=0, description="Fire damage of the hero")
    water_damage: int = Field(default=0, description="Water damage of the hero")
    wind_damage: int = Field(default=0, description="Wind damage of the hero")
    neutral_damage: int = Field(default=0, description="Neutral damage of the hero")
    
    range_damage: int = Field(default=0, description="Range damage of the hero")
    melee_damage: int = Field(default=0, description="Melee damage of the hero")
    area_damage: int = Field(default=0, description="Area damage of the hero")
    indirect_damage: int = Field(default=0, description="Indirect damage of the hero")
    pushback_damage: int = Field(default=0, description="Pushback damage of the hero")


    earth_resistance: int = Field(default=0, description="Earth resistance of the hero")
    fire_resistance: int = Field(default=0, description="Fire resistance of the hero")
    water_resistance: int = Field(default=0, description="Water resistance of the hero")
    wind_resistance: int = Field(default=0, description="Wind resistance of the hero")
    neutral_resistance: int = Field(default=0, description="Neutral resistance of the hero")
    critical_resistance: int = Field(default=0, description="Critical resistance of the hero")
    pushback_resistance: int = Field(default=0, description="Pushback resistance of the hero")
    indirect_resistance: int = Field(default=0, description="Indirect resistance of the hero")


    critical_damage: int = Field(default=0, description="Critical damage of the hero")

    strength: int = Field(default=0, description="Strength of the hero")
    intelligence: int = Field(default=0, description="Intelligence of the hero")
    agility: int = Field(default=0, description="Agility of the hero")
    chance: int = Field(default=0, description="Chance of the hero")
    wisdom: int = Field(default=0, description="Wisdom of the hero")
    vitality: int = Field(default=55, description="Vitality of the hero")

    AP: int = Field(default=6, ge=0, le=12, description="Action Points (AP) of the hero")
    MP: int = Field(default=3, ge=0, le=12, description="Action Points (AP) of the hero")

    power: int = Field(default=0, description="Power of the hero")
    crit: float = Field(default=0, description="Critical hit chance of the hero")
    initiative: int = Field(default=0, description="Initiative of the hero")
    range: int = Field(default=0, description="Range of the hero")
    invocation: int = Field(default=1, description="Invocation of the hero")
    prospecting: int = Field(default=100, description="Prospecting of the hero")
    heal: int = Field(default=0, description="Healing power of the hero")

    withdraw_ap: int = Field(default=0, description="Withdraw Action Points (AP) of the hero")
    withdraw_mp: int = Field(default=0, description="Withdraw Movement Points (MP) of the hero")
    dodge_ap: int = Field(default=0, description="Dodge Action Points (AP) of the hero")
    dodge_mp: int = Field(default=0, description="Dodge Movement Points (MP) of the hero")

    lock: int = Field(default=0, description="Lock of the hero")
    escape: int = Field(default=0, description="Escape of the hero")