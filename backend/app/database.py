from sqlmodel import SQLModel, Session, create_engine


#Database URL
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"


#create the database engine
engine = create_engine(sqlite_url , echo = True)

#Create the database Tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    print("Database and tables created successfully.")

def get_session():
    with Session(engine) as session:
        yield session
       