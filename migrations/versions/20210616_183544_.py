"""empty message

Revision ID: fba535de28c2
Revises: ffdc0a98111c
Create Date: 2021-06-16 18:35:44.807750

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fba535de28c2'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('markerss',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.Column('color', sa.String(length=7), nullable=True),
    sa.Column('lat', sa.Numeric(scale=13, asdecimal=False), nullable=True),
    sa.Column('lng', sa.Numeric(scale=13, asdecimal=False), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('markerss')
    # ### end Alembic commands ###