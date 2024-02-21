from sqlalchemy import Column,Boolean,String,Integer
from database import Base


class Sticks(Base):
    __tablename__ = "sticks"

    id = Column(Integer,primary_key=True)
    title = Column(String(80),autoincrement=False,nullable=True)
    description = Column(String(200),autoincrement=False,nullable=False)

