from backend.db import get_db_conn
from psycopg2.extras import RealDictCursor


class NewUserDatabase:
    def load(self):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT * FROM directory.public.users;
        """
        cursor.execute(query)
        data = cursor.fetchall()
        return data

    def save(self, new_task):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        INSERT INTO directory.public.users (username,email,password1,password2) 
         VALUES (%(username)s, %(email)s, %(password1)s, %(password2)s)"""
        cursor.execute(query,
                       dict(username=new_task['name'],
                            email=new_task['email'],
                            password1=new_task['password1'],
                            password2=new_task['password2'])
                       )
        conn.commit()

